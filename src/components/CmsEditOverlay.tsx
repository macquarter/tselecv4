/**
 * CmsEditOverlay v10
 *
 * Activated when the page URL has ?edit=1 (admin embeds the site this way).
 *
 * v10 additions:
 *  - Image click editing: <img> elements whose src matches the Firestore
 *    image registry (siteContent/media.images) become clickable. Posts
 *    {type:'cms-edit-image', key, currentSrc} to the admin.
 *  - Live image overrides: if Firestore image map has an override for an
 *    image's original src, swap it in automatically (works even when the
 *    React component still hardcodes src='/images/...').
 *  - Trailing-punctuation tolerant text matching: "솔루션." vs "솔루션!"
 *    will match the same i18n key.
 */
import { useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import i18n from '../lib/i18n';
import { db } from '../lib/firebase';

function flatten(obj: any, prefix = ''): Record<string, string> {
  const out: Record<string, string> = {};
  if (!obj || typeof obj !== 'object') return out;
  for (const [k, v] of Object.entries(obj)) {
    const key = prefix ? `${prefix}.${k}` : k;
    if (typeof v === 'string') out[key] = v;
    else if (typeof v === 'object' && v !== null && !Array.isArray(v)) Object.assign(out, flatten(v, key));
  }
  return out;
}

function stripTrailingPunct(s: string): string {
  return s.replace(/[.!?。！？,;:·…\s]+$/g, '').trim();
}

function basename(url: string): string {
  try {
    const u = new URL(url, window.location.origin);
    return u.pathname.split('/').pop() || '';
  } catch {
    return url.split('?')[0].split('/').pop() || '';
  }
}

export default function CmsEditOverlay() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('edit') !== '1') return;

    // ===== TEXT MATCHING =====
    let textReverse: Record<string, string> = {};
    let textReverseLoose: Record<string, string> = {};
    function rebuildTextReverse() {
      try {
        const bundle = i18n.getResourceBundle('ko', 'translation') || {};
        const flat = flatten(bundle);
        textReverse = {};
        textReverseLoose = {};
        for (const [k, v] of Object.entries(flat)) {
          if (typeof v !== 'string' || !v.trim()) continue;
          if (textReverse[v]) textReverse[v] = '__AMBIGUOUS__';
          else textReverse[v] = k;
          // Loose key — strip trailing punctuation/whitespace differences
          const loose = stripTrailingPunct(v);
          if (loose && loose !== v) {
            if (textReverseLoose[loose]) textReverseLoose[loose] = '__AMBIGUOUS__';
            else textReverseLoose[loose] = k;
          }
        }
      } catch (e) {
        console.warn('[CMS] text reverse failed', e);
      }
    }
    rebuildTextReverse();

    // ===== IMAGE REGISTRY =====
    // Reverse map: img-src/basename → key from siteContent/media.images
    let imageMap: Record<string, string> = {};       // key → url
    let imageReverse: Record<string, string> = {};   // url → key  (also basename → key)
    async function loadImageRegistry() {
      try {
        const snap = await getDoc(doc(db, 'siteContent', 'media'));
        if (!snap.exists()) return;
        const data = snap.data();
        imageMap = (data.images || {}) as Record<string, string>;
        imageReverse = {};
        for (const [key, url] of Object.entries(imageMap)) {
          if (typeof url !== 'string' || !url) continue;
          imageReverse[url] = key;
          const bn = basename(url);
          if (bn) imageReverse[bn] = key;
        }
        // Apply overrides + decorate after registry loads
        applyImageOverrides();
        decorate();
      } catch (e) {
        console.warn('[CMS] image registry load failed', e);
      }
    }
    loadImageRegistry();

    function applyImageOverrides() {
      document.querySelectorAll('img').forEach((img) => {
        const el = img as HTMLImageElement & { dataset: any };
        if (!el.dataset.cmsOrigSrc) el.dataset.cmsOrigSrc = el.getAttribute('src') || '';
        const orig = el.dataset.cmsOrigSrc;
        const bn = basename(orig);
        const key = imageReverse[orig] || imageReverse[bn];
        if (key && imageMap[key] && imageMap[key] !== orig) {
          // The registry override differs from current src — swap.
          el.src = imageMap[key];
        }
      });
    }

    // ===== CLICK HANDLERS =====
    function onTextEditClick(this: HTMLElement, e: Event) {
      e.preventDefault();
      e.stopPropagation();
      const key = this.dataset.cmsKey;
      const value = this.textContent || '';
      if (!key) return;
      window.parent.postMessage({ type: 'cms-edit', key, currentValue: value }, '*');
    }

    function onImageEditClick(this: HTMLElement, e: Event) {
      e.preventDefault();
      e.stopPropagation();
      const img = this as HTMLImageElement;
      const key = img.dataset.cmsImgKey;
      if (!key) return;
      window.parent.postMessage({
        type: 'cms-edit-image',
        key,
        currentSrc: img.src,
        alt: img.alt || '',
      }, '*');
    }

    function decorate() {
      // -- Text nodes --
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node: Node | null;
      // eslint-disable-next-line no-cond-assign
      while ((node = walker.nextNode())) {
        const text = (node.nodeValue || '').trim();
        if (!text || text.length < 2) continue;
        let key = textReverse[text];
        if (!key) {
          // Fallback: match by stripped-trailing-punctuation
          const looseKey = textReverseLoose[stripTrailingPunct(text)];
          if (looseKey && looseKey !== '__AMBIGUOUS__') key = looseKey;
        }
        if (!key || key === '__AMBIGUOUS__') continue;
        const parent = node.parentElement as HTMLElement | null;
        if (!parent) continue;
        const tag = parent.tagName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEXTAREA' || tag === 'INPUT') continue;
        if (parent.dataset.cmsKey) continue;
        parent.dataset.cmsKey = key;
        parent.style.outline = '1px dashed rgba(56,189,248,.45)';
        parent.style.outlineOffset = '2px';
        parent.style.cursor = 'pointer';
        parent.title = '✏️ Edit: ' + key;
        parent.addEventListener('click', onTextEditClick, true);
      }

      // -- Images --
      document.querySelectorAll('img').forEach((img) => {
        const el = img as HTMLImageElement & { dataset: any };
        if (el.dataset.cmsImgKey) return;
        const orig = el.dataset.cmsOrigSrc || el.getAttribute('src') || '';
        const bn = basename(orig);
        const curBn = basename(el.src);
        const key = imageReverse[orig] || imageReverse[bn] || imageReverse[el.src] || imageReverse[curBn];
        if (!key) return;
        el.dataset.cmsImgKey = key;
        el.style.outline = '2px dashed rgba(251,191,36,.55)';
        el.style.outlineOffset = '2px';
        el.style.cursor = 'pointer';
        el.title = '🖼️ 이미지 변경: ' + key;
        el.addEventListener('click', onImageEditClick, true);
      });
    }

    const initialTimer = setTimeout(() => {
      rebuildTextReverse();
      decorate();
    }, 800);

    let pending: number | null = null;
    const obs = new MutationObserver(() => {
      if (pending) return;
      pending = window.setTimeout(() => {
        pending = null;
        applyImageOverrides();
        decorate();
      }, 300);
    });
    obs.observe(document.body, { childList: true, subtree: true, characterData: true });

    function onMessage(e: MessageEvent) {
      if (e.data && e.data.type === 'cms-reload') {
        window.location.reload();
      }
    }
    window.addEventListener('message', onMessage);

    function onLngChanged() {
      rebuildTextReverse();
      decorate();
    }
    i18n.on('languageChanged', onLngChanged);

    const banner = document.createElement('div');
    banner.id = '__cms_edit_banner';
    banner.textContent = '✏️ CMS 편집 모드 — 텍스트/이미지 클릭 시 어드민에서 편집됩니다';
    Object.assign(banner.style, {
      position: 'fixed',
      top: '0',
      left: '0',
      right: '0',
      zIndex: '99999',
      background: 'rgba(56,189,248,.92)',
      color: '#000',
      fontSize: '12px',
      fontWeight: '700',
      textAlign: 'center',
      padding: '6px 12px',
      pointerEvents: 'none',
    } as CSSStyleDeclaration as any);
    document.body.appendChild(banner);
    document.body.style.paddingTop = '32px';

    return () => {
      clearTimeout(initialTimer);
      obs.disconnect();
      window.removeEventListener('message', onMessage);
      i18n.off('languageChanged', onLngChanged);
      banner.remove();
      document.body.style.paddingTop = '';
    };
  }, []);

  return null;
}
