import { createContext, useContext, useEffect, useState, ReactNode, useCallback } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import i18n from '../lib/i18n';

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
  /** v17: 사이트 자체에서 직접 콘텐츠 업데이트 */
  updateText?: (key: string, value: string) => Promise<boolean>;
  updateImage?: (key: string, url: string) => Promise<boolean>;
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

export function useImage(key: string, fallback: string): string {
  const { images, loaded } = useSiteContent();
  if (!loaded) return fallback;
  return images[key] ?? fallback;
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

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);

  // v17: 인라인 편집 → Firestore PATCH + React state 즉시 갱신
  const updateText = useCallback(async (key: string, value: string): Promise<boolean> => {
    try {
      const newText = { ...content.text, [key]: value };
      // Firestore PATCH (merge: true 로 다른 키 보존)
      await setDoc(doc(db, 'siteContent', 'text'), newText, { merge: true });
      // React state 갱신
      setContent(prev => ({ ...prev, text: newText }));
      // i18n 머지
      mergeIntoI18n({ [key]: value });
      console.log(`✏️ CMS 저장: ${key} = ${value.slice(0, 50)}...`);
      return true;
    } catch (e) {
      console.error('updateText 실패:', e);
      return false;
    }
  }, [content.text]);

  const updateImage = useCallback(async (key: string, url: string): Promise<boolean> => {
    try {
      const newImages = { ...content.images, [key]: url };
      await setDoc(doc(db, 'siteContent', 'media'), { images: newImages }, { merge: true });
      setContent(prev => ({ ...prev, images: newImages }));
      console.log(`🖼️ CMS 이미지 저장: ${key} = ${url.slice(0, 60)}`);
      return true;
    } catch (e) {
      console.error('updateImage 실패:', e);
      return false;
    }
  }, [content.images]);

  const updateVideo = useCallback(async (key: string, url: string): Promise<boolean> => {
    try {
      const newVideos = { ...content.videos, [key]: url };
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

  // v17: updateText/Image/Video 함수를 context value에 포함
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
