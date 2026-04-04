import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

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

/** Helper: get text field with fallback */
export function useText(key: string, fallback: string): string {
  const { text, loaded } = useSiteContent();
  if (!loaded) return fallback;
  return text[key] ?? fallback;
}

/** Helper: get image URL with fallback */
export function useImage(key: string, fallback: string): string {
  const { images, loaded } = useSiteContent();
  if (!loaded) return fallback;
  return images[key] ?? fallback;
}

/** Helper: get video URL with fallback */
export function useVideo(key: string, fallback: string): string {
  const { videos, loaded } = useSiteContent();
  if (!loaded) return fallback;
  return videos[key] ?? fallback;
}

/** Helper: get clients list with fallback */
export function useClients(fallback: string[]): string[] {
  const { clients, loaded } = useSiteContent();
  if (!loaded || clients.length === 0) return fallback;
  return clients;
}

/** Helper: get board display options */
export function useBoardOpt(type: 'news' | 'dl') {
  const { boardOpt } = useSiteContent();
  return boardOpt[type];
}

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    async function load() {
      try {
        const [textSnap, mediaSnap, clientSnap, settSnap] = await Promise.all([
          getDoc(doc(db, 'siteContent', 'text')),
          getDoc(doc(db, 'siteContent', 'media')),
          getDoc(doc(db, 'siteContent', 'clients')),
          getDoc(doc(db, 'siteContent', 'settings')),
        ]);

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

  return (
    <SiteContentContext.Provider value={content}>
      {children}
    </SiteContentContext.Provider>
  );
}
