/**
 * CmsEditOverlay
 *
 * Activated when the page URL has ?edit=1 (admin embeds the site this way).
 *
 * What it does
 *  - Builds a reverse map of every i18n value → key from the ko bundle.
 *  - Walks the DOM, finds text nodes whose value matches uniquely, and
 *    decorates the nearest element with a click handler that postMessage's
 *    `{ type: 'cms-edit', key, currentValue }` to window.parent (the admin).
 *  - Hover shows a cyan dashed outline; click triggers edit instead of
 *    following any link/button.
 *  - Re-runs on DOM mutations so dynamic content also becomes editable.
 *  - Listens for `{ type: 'cms-reload' }` from parent to reload after a save.
 *
 * No effect when ?edit=1 is absent — completely inert in normal browsing.
 */
import { useEffect } from 'react';
import i18n from '../lib/i18n';

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

export default function CmsEditOverlay() {
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('edit') !== '1') return;

    let reverse: Record<string, string> = {};
    function rebuildReverse() {
      try {
        const bundle = i18n.getResourceBundle('ko', 'translation') || {};
        const flat = flatten(bundle);
        reverse = {};
        for (const [k, v] of Object.entries(flat)) {
          if (typeof v !== 'string' || !v.trim()) continue;
          if (reverse[v]) reverse[v] = '__AMBIGUOUS__';
          else reverse[v] = k;
        }
      } catch (e) {
        console.warn('[CMS] rebuildReverse failed', e);
      }
    }
    rebuildReverse();

    function onEditClick(this: HTMLElement, e: Event) {
      e.preventDefault();
      e.stopPropagation();
      const key = this.dataset.cmsKey;
      const value = this.textContent || '';
      if (!key) return;
      window.parent.postMessage({ type: 'cms-edit', key, currentValue: value }, '*');
    }

    function decorate() {
      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node: Node | null;
      // eslint-disable-next-line no-cond-assign
      while ((node = walker.nextNode())) {
        const text = (node.nodeValue || '').trim();
        if (!text || text.length < 2) continue;
        const key = reverse[text];
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
        parent.addEventListener('click', onEditClick, true);
      }
    }

    const initialTimer = setTimeout(() => {
      rebuildReverse();
      decorate();
    }, 800);

    let pending: number | null = null;
    const obs = new MutationObserver(() => {
      if (pending) return;
      pending = window.setTimeout(() => {
        pending = null;
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
      rebuildReverse();
      decorate();
    }
    i18n.on('languageChanged', onLngChanged);

    const banner = document.createElement('div');
    banner.id = '__cms_edit_banner';
    banner.textContent = '✏️ CMS 편집 모드 — 텍스트 클릭 시 어드민에서 편집됩니다';
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
