import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface SiteContent {
  text: Record<string, string>;
  images: Record<string, string>;
  videos: Record<string, string>;
  clients: string[];
  loaded: boolean;
}

const defaultContent: SiteContent = {
  text: {},
  images: {},
  videos: {},
  clients: [],
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

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    async function load() {
      try {
        const [textSnap, mediaSnap, clientSnap] = await Promise.all([
          getDoc(doc(db, 'siteContent', 'text')),
          getDoc(doc(db, 'siteContent', 'media')),
          getDoc(doc(db, 'siteContent', 'clients')),
        ]);

        const text = textSnap.exists() ? (textSnap.data() as Record<string, string>) : {};
        const mediaData = mediaSnap.exists() ? mediaSnap.data() : {};
        const images = (mediaData.images ?? {}) as Record<string, string>;
        const videos = (mediaData.videos ?? {}) as Record<string, string>;
        const clients = clientSnap.exists() && Array.isArray(clientSnap.data().list)
          ? (clientSnap.data().list as string[])
          : [];

        setContent({ text, images, videos, clients, loaded: true });
        console.log('✅ SiteContent loaded from Firestore');
      } catch (err) {
        console.warn('Firestore load failed, using defaults:', err);
        setContent(prev => ({ ...prev, loaded: true }));
      }
    }
    load();
  }, []);

  return (
    <SiteContentContext.Provider value={content}>
      {children}
    </SiteContentContext.Provider>
  );
}
