import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import i18n from '../lib/i18n';
import { uploadDataURI, pathForCmsImage } from '../lib/storage';

interface BoardOpt {
  showDate: boolean;
  showViews: boolean;
}

interface SiteContent {
  text: Record<string, string>;
  images: Record<string, string>;
  videos: Record<string, string>;
  clients: string[];
  boardOpt: { news: BoardOpt; dl: BoardOpt };
  loaded: boolean;
  updateText?: (key: string, value: string) => Promise<boolean>;
  updateImage?: (key: string, urlOrDataURI: string) => Promise<boolean>;
  updateVideo?: (key: string, url: string) => Promise<boolean>;
}

const defaultContent: SiteContent = {
  text: {},
  images: {},
  videos: {},
  clients: [],
  boardOpt: { news: { showDate: true, showViews: true }, dl: { showDate: true, showViews: true } },
  loaded: false,
};

const SiteContentContext = createContext<SiteContent>(defaultContent);

export function useSiteContent() {
  return useContext(SiteContentContext);
}

export function useText(key: string, fallback: string): string {
  const { text, loaded } = useSiteContent();
  if (!loaded) return fallback;
  return text[key] ?? fallback;
}

/**
 * v20 (성능): 한국 방문자 대상 이미지 로딩 가속.
 *   - Firebase Storage 버킷이 미국 리전(REGIONAL)이라 콜드 캐시 시 태평양 왕복(~1s) 발생.
 *   - 프로덕션에서만 Vercel 서울 엣지의 이미지 최적화(/_vercel/image)로 우회:
 *     · 엣지에서 WebP/AVIF 자동 변환 + 리사이즈(원본보다 클 때만) → 용량 감소
 *     · 서울 엣지 캐시 → 첫 로드 이후 지연 제거
 *   - w=1920은 업스케일 안 함(원본이 작으면 원본 크기 유지) → 화질 손실 없음.
 *   - 로컬 개발(import.meta.env.PROD=false)에서는 원본 URL 그대로 사용.
 */
function optimizeImg(url: string, w = 1920): string {
  if (
    import.meta.env.PROD &&
    typeof url === 'string' &&
    url.includes('firebasestorage.googleapis.com')
  ) {
    return `/_vercel/image?url=${encodeURIComponent(url)}&w=${w}&q=75`;
  }
  return url;
}

export function useImage(key: string, fallback: string): string {
  const { images, loaded } = useSiteContent();
  if (!loaded) return optimizeImg(fallback);
  return optimizeImg(images[key] ?? fallback);
}

export function useVideo(key: string, fallback: string): string {
  const { videos, loaded } = useSiteContent();
  if (!loaded) return fallback;
  return videos[key] ?? fallback;
}

export function useClients(fallback: string[]): string[] {
  const { clients, loaded } = useSiteContent();
  if (!loaded || clients.length === 0) return fallback;
  return clients;
}

export function useBoardOpt(type: 'news' | 'dl') {
  const { boardOpt } = useSiteContent();
  return boardOpt[type];
}

function unflatten(flat: Record<string, string>): Record<string, any> {
  const result: Record<string, any> = {};
  for (const [path, value] of Object.entries(flat)) {
    if (typeof value !== 'string') continue;
    const parts = path.split('.');
    let cursor: any = result;
    for (let i = 0; i < parts.length - 1; i++) {
      const k = parts[i];
      if (typeof cursor[k] !== 'object' || cursor[k] === null) cursor[k] = {};
      cursor = cursor[k];
    }
    cursor[parts[parts.length - 1]] = value;
  }
  return result;
}

function mergeIntoI18n(flat: Record<string, string>) {
  if (!flat || typeof flat !== 'object') return;
  const dotted: Record<string, string> = {};
  for (const [k, v] of Object.entries(flat)) {
    if (k.includes('.')) dotted[k] = v;
  }
  if (Object.keys(dotted).length === 0) return;
  const nested = unflatten(dotted);
  try {
    const lng = i18n.language || 'ko';
    i18n.addResourceBundle(lng, 'translation', nested, true, true);
    if (lng !== 'ko') {
      i18n.addResourceBundle('ko', 'translation', nested, true, true);
    }
    i18n.emit('languageChanged', lng);
  } catch (e) {
    console.warn('i18n merge failed:', e);
  }
}

/**
 * dataURI에서 MIME 추출 → Storage 업로드용
 */
function detectMimeFromDataURI(dataURI: string): string {
  const m = dataURI.match(/^data:([^;]+);/);
  return m ? m[1] : 'image/png';
}

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);

  const updateText = useCallback(async (key: string, value: string): Promise<boolean> => {
    try {
      const newText = { ...content.text, [key]: value };
      await setDoc(doc(db, 'siteContent', 'text'), newText, { merge: true });
      setContent(prev => ({ ...prev, text: newText }));
      mergeIntoI18n({ [key]: value });
      console.log(`✏️ CMS 저장: ${key} = ${value.slice(0, 50)}...`);
      return true;
    } catch (e) {
      console.error('updateText 실패:', e);
      return false;
    }
  }, [content.text]);

  /**
   * v19 (P0-A): 큰 base64 dataURI는 Firebase Storage에 업로드 후 URL을 Firestore에 저장.
   *   - dataURI 길이 200KB 초과 → Storage 사용 (Firestore 1MB 한계 우회)
   *   - dataURI 작거나 일반 URL → 그대로 Firestore에 저장
   *   - 결과: 어떤 크기 파일이든 안전하게 저장 가능
   */
  const updateImage = useCallback(async (key: string, urlOrDataURI: string): Promise<boolean> => {
    try {
      let finalUrl = urlOrDataURI;
      // base64 dataURI이고 200KB 넘으면 Storage로 우회
      if (urlOrDataURI.startsWith('data:') && urlOrDataURI.length > 200_000) {
        const mime = detectMimeFromDataURI(urlOrDataURI);
        const path = pathForCmsImage(key, mime);
        console.log(`📤 Storage 업로드 중: ${key} (${(urlOrDataURI.length / 1024).toFixed(0)}KB → ${path})`);
        finalUrl = await uploadDataURI(urlOrDataURI, path);
        console.log(`✅ Storage URL: ${finalUrl.slice(0, 80)}...`);
      }
      const newImages = { ...content.images, [key]: finalUrl };
      await setDoc(doc(db, 'siteContent', 'media'), { images: newImages }, { merge: true });
      setContent(prev => ({ ...prev, images: newImages }));
      console.log(`🖼️ CMS 이미지 저장: ${key} = ${finalUrl.slice(0, 60)}`);
      return true;
    } catch (e: any) {
      console.error('updateImage 실패:', e);
      return false;
    }
  }, [content.images]);

  const updateVideo = useCallback(async (key: string, url: string): Promise<boolean> => {
    try {
      let finalUrl = url;
      if (url.startsWith('data:') && url.length > 200_000) {
        const mime = detectMimeFromDataURI(url);
        const path = pathForCmsImage(key, mime);
        finalUrl = await uploadDataURI(url, path);
      }
      const newVideos = { ...content.videos, [key]: finalUrl };
      await setDoc(doc(db, 'siteContent', 'media'), { videos: newVideos }, { merge: true });
      setContent(prev => ({ ...prev, videos: newVideos }));
      return true;
    } catch (e) {
      console.error('updateVideo 실패:', e);
      return false;
    }
  }, [content.videos]);

  useEffect(() => {
    async function load() {
      const timeout = new Promise<never>((_, reject) =>
        setTimeout(() => reject(new Error('Firestore timeout')), 5000)
      );
      try {
        const [textSnap, mediaSnap, clientSnap, settSnap] = await Promise.race([
          Promise.all([
            getDoc(doc(db, 'siteContent', 'text')),
            getDoc(doc(db, 'siteContent', 'media')),
            getDoc(doc(db, 'siteContent', 'clients')),
            getDoc(doc(db, 'siteContent', 'settings')),
          ]),
          timeout,
        ]) as [any, any, any, any];

        const text = textSnap.exists() ? (textSnap.data() as Record<string, string>) : {};
        const mediaData = mediaSnap.exists() ? mediaSnap.data() : {};
        const images = (mediaData.images ?? {}) as Record<string, string>;
        const videos = (mediaData.videos ?? {}) as Record<string, string>;
        const clients = clientSnap.exists() && Array.isArray(clientSnap.data().list)
          ? (clientSnap.data().list as string[])
          : [];
        const boardOpt = defaultContent.boardOpt;
        if (settSnap.exists()) {
          const sd = settSnap.data() as { boardOpt?: { news?: BoardOpt; dl?: BoardOpt } };
          if (sd.boardOpt?.news) Object.assign(boardOpt.news, sd.boardOpt.news);
          if (sd.boardOpt?.dl) Object.assign(boardOpt.dl, sd.boardOpt.dl);
        }

        mergeIntoI18n(text);

        setContent({ text, images, videos, clients, boardOpt, loaded: true });
        console.log('✅ SiteContent loaded from Firestore');
      } catch (err) {
        console.warn('Firestore load failed, using defaults:', err);
        setContent(prev => ({ ...prev, loaded: true }));
      }
    }
    load();
  }, []);

  if (!content.loaded) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#000',
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 40,
            height: 40,
            border: '3px solid rgba(255,255,255,0.1)',
            borderTopColor: '#fff',
            borderRadius: '50%',
            animation: 'spin 0.8s linear infinite',
            margin: '0 auto 16px',
          }} />
          <style>{`@keyframes spin { to { transform: rotate(360deg) } }`}</style>
        </div>
      </div>
    );
  }

  const contextValue: SiteContent = {
    ...content,
    updateText,
    updateImage,
    updateVideo,
  };

  return (
    <SiteContentContext.Provider value={contextValue}>
      {children}
    </SiteContentContext.Provider>
  );
}
