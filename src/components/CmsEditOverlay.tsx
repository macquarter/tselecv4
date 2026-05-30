/**
 * CmsEditOverlay v11
 *
 * v11 additions:
 *  - Include non-dotted siteContent/text keys (logo-1, ft-b1, ci-ad …) in the
 *    reverse map. Logos and footer badges become clickable.
 *  - Ambiguous handling: when a value maps to multiple keys, we no longer skip.
 *    Instead we postMessage `candidates: [{key, value}]` so the admin can show
 *    a picker.
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

    // ===== TEXT REVERSE MAP =====
    // value → array of candidate keys (single or multiple)
    let textReverse: Record<string, string[]> = {};
    let textReverseLoose: Record<string, string[]> = {};

    function addTo(map: Record<string, string[]>, value: string, key: string) {
      const arr = map[value] || (map[value] = []);
      if (!arr.includes(key)) arr.push(key);
    }

    function rebuildTextReverse() {
      try {
        const bundle = i18n.getResourceBundle('ko', 'translation') || {};
        const flat = flatten(bundle);
        textReverse = {};
        textReverseLoose = {};
        for (const [k, v] of Object.entries(flat)) {
          if (typeof v !== 'string' || !v.trim()) continue;
          addTo(textReverse, v, k);
          const loose = stripTrailingPunct(v);
          if (loose && loose !== v) addTo(textReverseLoose, loose, k);
        }
        // Also include non-dotted siteContent/text (logo-1, ft-b1, ci-ad …)
        // fetched separately into nonDottedText
        for (const [k, v] of Object.entries(nonDottedText)) {
          if (typeof v !== 'string' || !v.trim()) continue;
          addTo(textReverse, v, k);
          const loose = stripTrailingPunct(v);
          if (loose && loose !== v) addTo(textReverseLoose, loose, k);
        }
      } catch (e) {
        console.warn('[CMS] text reverse failed', e);
      }
    }

    // ===== NON-DOTTED FIRESTORE TEXT =====
    let nonDottedText: Record<string, string> = {};
    async function loadNonDottedText() {
      try {
        const snap = await getDoc(doc(db, 'siteContent', 'text'));
        if (!snap.exists()) return;
        const data = snap.data() as Record<string, string>;
        nonDottedText = {};
        for (const [k, v] of Object.entries(data)) {
          if (typeof v === 'string' && !k.includes('.')) nonDottedText[k] = v;
        }
        rebuildTextReverse();
        decorate();
      } catch (e) {
        console.warn('[CMS] non-dotted text load failed', e);
      }
    }
    loadNonDottedText();

    // ===== IMAGE REGISTRY =====
    let imageMap: Record<string, string> = {};
    let imageReverse: Record<string, string> = {};
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
          el.src = imageMap[key];
        }
      });
    }

    rebuildTextReverse();

    // ===== CLICK HANDLERS =====
    function onTextEditClick(this: HTMLElement, e: Event) {
      e.preventDefault();
      e.stopPropagation();
      const candidatesStr = this.dataset.cmsKeys;
      const value = this.textContent || '';
      if (!candidatesStr) return;
      const candidates = candidatesStr.split('||');
      if (candidates.length === 1) {
        // Single candidate — direct edit
        window.parent.postMessage({ type: 'cms-edit', key: candidates[0], currentValue: value }, '*');
      } else {
        // Ambiguous — send all candidates to admin for picker
        window.parent.postMessage({
          type: 'cms-edit',
          candidates: candidates.map((k) => ({ key: k, value })),
          currentValue: value,
        }, '*');
      }
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
        let keys = textReverse[text];
        if (!keys || keys.length === 0) {
          const looseKeys = textReverseLoose[stripTrailingPunct(text)];
          if (looseKeys && looseKeys.length > 0) keys = looseKeys;
        }
        if (!keys || keys.length === 0) continue;
        const parent = node.parentElement as HTMLElement | null;
        if (!parent) continue;
        const tag = parent.tagName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEXTAREA' || tag === 'INPUT') continue;
        if (parent.dataset.cmsKeys) continue;
        parent.dataset.cmsKeys = keys.join('||');
        const label = keys.length === 1 ? keys[0] : `${keys.length}개 후보 (${keys[0]} 외)`;
        parent.style.outline = '1px dashed rgba(56,189,248,.45)';
        parent.style.outlineOffset = '2px';
        parent.style.cursor = 'pointer';
        parent.title = '✏️ Edit: ' + label;
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
