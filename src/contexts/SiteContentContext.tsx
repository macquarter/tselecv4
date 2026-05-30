import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { doc, getDoc } from 'firebase/firestore';
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

/** Helper: get text field with fallback (raw, not merged into i18n) */
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

/**
 * Convert a flat dot-keyed object ({"nav.company": "회사소개"})
 * into a nested object ({nav: {company: "회사소개"}}) so it can be
 * merged into i18next as a translation resource bundle.
 */
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

/**
 * Merge Firestore-edited text into the i18next ko bundle so every
 * existing t('...') call automatically picks up admin overrides
 * without each component needing a useText wrapper.
 *
 * Flat keys like "nav.company" are treated as i18n paths; non-dotted
 * keys (logo-1, ft-b1, etc.) remain accessible via useText only.
 */
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
    i18n.addResourceBundle(lng, 'translation', nested, true /* deep */, true /* overwrite */);
    if (lng !== 'ko') {
      i18n.addResourceBundle('ko', 'translation', nested, true, true);
    }
    // Trigger re-render of components consuming useTranslation
    i18n.emit('languageChanged', lng);
    console.log(`✅ Merged ${Object.keys(dotted).length} Firestore text overrides into i18n (${lng})`);
  } catch (e) {
    console.warn('i18n merge failed:', e);
  }
}

export function SiteContentProvider({ children }: { children: ReactNode }) {
  const [content, setContent] = useState<SiteContent>(defaultContent);

  useEffect(() => {
    async function load() {
      // Timeout: if Firestore takes over 5s, show site with defaults
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

        // ── CMS pairing: merge Firestore text into i18n so all t() calls reflect admin edits ──
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

  return (
    <SiteContentContext.Provider value={content}>
      {children}
    </SiteContentContext.Provider>
  );
}
