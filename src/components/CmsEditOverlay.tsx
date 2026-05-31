/**
 * CmsEditOverlay v17
 *
 * 변경사항:
 *  - window.prompt() 완전 제거
 *  - 사이트 안에 인라인 편집 모달 표시 (textarea + 저장 버튼)
 *  - 이미지: URL 입력 + 파일 업로드 (base64 dataURI)
 *  - SiteContentContext.updateText/Image 직접 호출 → Firestore PATCH + React state 즉시 갱신
 *  - postMessage 단계 제거 (사이트가 자체적으로 처리)
 */
import { useEffect, useState, useCallback } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import i18n from '../lib/i18n';
import { db } from '../lib/firebase';
import { useSiteContent } from '../contexts/SiteContentContext';

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

function insideImgKeyContainer(el: HTMLElement | null): boolean {
  let cur: HTMLElement | null = el;
  while (cur) {
    if (cur.hasAttribute && cur.hasAttribute('data-cms-img-key')) return true;
    cur = cur.parentElement;
  }
  return false;
}

type EditMode = null | {
  type: 'text';
  key: string;
  currentValue: string;
  candidates?: string[];
} | {
  type: 'image';
  key: string;
  currentSrc: string;
};

export default function CmsEditOverlay() {
  const siteContent = useSiteContent();
  const [editMode, setEditMode] = useState<EditMode>(null);
  const [draftValue, setDraftValue] = useState('');
  const [imageFile, setImageFile] = useState<string>('');  // base64
  const [saving, setSaving] = useState(false);

  // ===== 저장 핸들러 =====
  const handleSave = useCallback(async () => {
    if (!editMode) return;
    setSaving(true);
    try {
      if (editMode.type === 'text') {
        if (siteContent.updateText) {
          const ok = await siteContent.updateText(editMode.key, draftValue);
          if (ok) setEditMode(null);
          else alert('저장 실패. 콘솔 확인하세요.');
        }
      } else if (editMode.type === 'image') {
        const finalUrl = imageFile || draftValue;
        if (!finalUrl) { alert('URL 또는 파일을 선택하세요.'); setSaving(false); return; }
        // Google Drive 공유 URL 자동 변환
        let url = finalUrl;
        const gd = url.match(/drive\.google\.com\/file\/d\/([^/]+)\//);
        if (gd) url = `https://drive.google.com/uc?export=view&id=${gd[1]}`;
        if (siteContent.updateImage) {
          const ok = await siteContent.updateImage(editMode.key, url);
          if (ok) setEditMode(null);
          else alert('저장 실패. 콘솔 확인하세요.');
        }
      }
    } finally {
      setSaving(false);
    }
  }, [editMode, draftValue, imageFile, siteContent]);

  // ===== 파일 선택 → base64 변환 =====
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (file.size > 2 * 1024 * 1024) {
      alert('파일 크기가 2MB를 초과합니다. URL 입력을 사용하거나 더 작은 파일을 선택하세요.');
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImageFile(result);
      setDraftValue(result.slice(0, 60) + '...(파일)');
    };
    reader.readAsDataURL(file);
  };

  // ===== 텍스트 후보 선택 =====
  const handleCandidatePick = (key: string) => {
    if (!editMode || editMode.type !== 'text') return;
    setEditMode({ ...editMode, key, candidates: undefined });
  };

  // ===== Decoration logic (이전과 동일하지만 prompt 대신 setEditMode) =====
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('edit') !== '1') return;

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
        for (const [k, v] of Object.entries(nonDottedText)) {
          if (typeof v !== 'string' || !v.trim()) continue;
          addTo(textReverse, v, k);
          const loose = stripTrailingPunct(v);
          if (loose && loose !== v) addTo(textReverseLoose, loose, k);
        }
      } catch (e) { console.warn('[CMS] text reverse failed', e); }
    }

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
      } catch (e) { console.warn('[CMS] non-dotted text load failed', e); }
    }
    loadNonDottedText();

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
        decorate();
      } catch (e) { console.warn('[CMS] image registry load failed', e); }
    }
    loadImageRegistry();

    rebuildTextReverse();

    function onTextEditClick(this: HTMLElement, e: Event) {
      e.preventDefault();
      e.stopPropagation();
      const candidatesStr = this.dataset.cmsKeys;
      const value = this.textContent || '';
      if (!candidatesStr) return;
      const candidates = candidatesStr.split('||');
      if (candidates.length === 1) {
        setEditMode({ type: 'text', key: candidates[0], currentValue: value });
        setDraftValue(value);
      } else {
        setEditMode({ type: 'text', key: candidates[0], currentValue: value, candidates });
        setDraftValue(value);
      }
    }

    function onImageEditClick(this: HTMLElement, e: Event) {
      e.preventDefault();
      e.stopPropagation();
      const el = this as HTMLElement;
      const key = el.dataset.cmsImgKey || '';
      if (!key) return;
      let currentSrc = '';
      if (el.tagName === 'IMG') currentSrc = (el as HTMLImageElement).src;
      else {
        const inner = el.querySelector('img');
        currentSrc = inner ? inner.src : (imageMap[key] || '');
      }
      setEditMode({ type: 'image', key, currentSrc });
      setDraftValue('');
      setImageFile('');
    }

    function decorate() {
      document.querySelectorAll<HTMLElement>('[data-cms-img-key]').forEach((el) => {
        if ((el as any).__cmsImgDecorated) return;
        (el as any).__cmsImgDecorated = true;
        el.style.outline = '2px dashed rgba(251,191,36,.65)';
        el.style.outlineOffset = '3px';
        el.style.cursor = 'pointer';
        el.title = '🖼️ 이미지 변경: ' + el.dataset.cmsImgKey;
        el.addEventListener('click', onImageEditClick, true);
      });

      const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
      let node: Node | null;
      // eslint-disable-next-line no-cond-assign
      while ((node = walker.nextNode())) {
        const text = (node.nodeValue || '').trim();
        if (!text || text.length < 2) continue;
        const parent = node.parentElement as HTMLElement | null;
        if (!parent) continue;
        if (insideImgKeyContainer(parent)) continue;
        let keys = textReverse[text];
        if (!keys || keys.length === 0) {
          const looseKeys = textReverseLoose[stripTrailingPunct(text)];
          if (looseKeys && looseKeys.length > 0) keys = looseKeys;
        }
        if (!keys || keys.length === 0) continue;
        const tag = parent.tagName;
        if (tag === 'SCRIPT' || tag === 'STYLE' || tag === 'TEXTAREA' || tag === 'INPUT') continue;
        if (parent.dataset.cmsKeys) continue;
        parent.dataset.cmsKeys = keys.join('||');
        parent.style.outline = '1px dashed rgba(56,189,248,.45)';
        parent.style.outlineOffset = '2px';
        parent.style.cursor = 'pointer';
        parent.title = '✏️ Edit: ' + (keys.length === 1 ? keys[0] : `${keys.length}개 후보`);
        parent.addEventListener('click', onTextEditClick, true);
      }

      document.querySelectorAll('img').forEach((img) => {
        const el = img as HTMLImageElement & { dataset: any };
        if (insideImgKeyContainer(el.parentElement)) return;
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

    const initialTimer = setTimeout(() => { rebuildTextReverse(); decorate(); }, 800);

    let pending: number | null = null;
    const obs = new MutationObserver(() => {
      if (pending) return;
      pending = window.setTimeout(() => { pending = null; decorate(); }, 300);
    });
    obs.observe(document.body, { childList: true, subtree: true, characterData: true });

    function onLngChanged() { rebuildTextReverse(); decorate(); }
    i18n.on('languageChanged', onLngChanged);

    const banner = document.createElement('div');
    banner.id = '__cms_edit_banner';
    banner.textContent = '✏️ CMS 편집 모드 — 텍스트/이미지/로고 클릭 시 인라인 편집기로 즉시 수정';
    Object.assign(banner.style, {
      position: 'fixed', top: '0', left: '0', right: '0', zIndex: '99999',
      background: 'rgba(56,189,248,.92)', color: '#000', fontSize: '12px',
      fontWeight: '700', textAlign: 'center', padding: '6px 12px', pointerEvents: 'none',
    } as CSSStyleDeclaration as any);
    document.body.appendChild(banner);
    document.body.style.paddingTop = '32px';

    return () => {
      clearTimeout(initialTimer);
      obs.disconnect();
      i18n.off('languageChanged', onLngChanged);
      banner.remove();
      document.body.style.paddingTop = '';
    };
  }, []);

  // ===== 인라인 편집 모달 렌더 =====
  if (!editMode) return null;

  const overlayStyle: React.CSSProperties = {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,.7)',
    zIndex: 100000, display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: 20,
  };
  const modalStyle: React.CSSProperties = {
    background: '#0a0a0a', border: '1px solid rgba(255,255,255,.1)',
    borderRadius: 16, padding: 24, maxWidth: 600, width: '100%',
    color: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,.5)',
  };
  const btnStyle: React.CSSProperties = {
    padding: '10px 20px', borderRadius: 8, border: 'none', cursor: 'pointer',
    fontSize: 14, fontWeight: 600,
  };

  return (
    <div style={overlayStyle} onClick={() => setEditMode(null)}>
      <div style={modalStyle} onClick={(e) => e.stopPropagation()}>
        {editMode.type === 'text' && (
          <>
            <div style={{ fontSize: 11, color: '#aaa', marginBottom: 4 }}>✏️ 텍스트 편집</div>
            <div style={{ fontSize: 12, color: '#6ee7ff', marginBottom: 16, fontFamily: 'monospace' }}>
              {editMode.key}
            </div>
            {editMode.candidates && editMode.candidates.length > 1 && (
              <div style={{ marginBottom: 16, padding: 12, background: 'rgba(56,189,248,.08)', borderRadius: 8 }}>
                <div style={{ fontSize: 11, color: '#aaa', marginBottom: 8 }}>
                  같은 텍스트가 {editMode.candidates.length}개 키에 매핑됨. 편집할 키 선택:
                </div>
                {editMode.candidates.map(k => (
                  <button key={k} onClick={() => handleCandidatePick(k)}
                    style={{
                      display: 'block', width: '100%', textAlign: 'left',
                      padding: '8px 12px', marginBottom: 4,
                      background: k === editMode.key ? 'rgba(56,189,248,.2)' : 'transparent',
                      border: '1px solid rgba(255,255,255,.1)', borderRadius: 6,
                      color: '#fff', cursor: 'pointer', fontSize: 12, fontFamily: 'monospace',
                    }}>{k}</button>
                ))}
              </div>
            )}
            <textarea
              value={draftValue}
              onChange={(e) => setDraftValue(e.target.value)}
              autoFocus
              rows={Math.max(3, draftValue.split('\n').length)}
              style={{
                width: '100%', padding: 12, borderRadius: 8,
                background: '#1a1a1a', border: '1px solid rgba(255,255,255,.15)',
                color: '#fff', fontSize: 14, lineHeight: 1.5, resize: 'vertical',
              }}
            />
          </>
        )}

        {editMode.type === 'image' && (
          <>
            <div style={{ fontSize: 11, color: '#aaa', marginBottom: 4 }}>🖼️ 이미지 변경</div>
            <div style={{ fontSize: 12, color: '#fbbf24', marginBottom: 16, fontFamily: 'monospace' }}>
              {editMode.key}
            </div>
            {editMode.currentSrc && !editMode.currentSrc.startsWith('data:') && (
              <div style={{ marginBottom: 16 }}>
                <div style={{ fontSize: 11, color: '#aaa', marginBottom: 6 }}>현재 이미지</div>
                <img src={editMode.currentSrc} alt="" style={{ maxHeight: 100, borderRadius: 8, border: '1px solid rgba(255,255,255,.1)' }} />
              </div>
            )}
            <div style={{ marginBottom: 12 }}>
              <div style={{ fontSize: 11, color: '#aaa', marginBottom: 6 }}>📁 파일 업로드 (최대 2MB)</div>
              <input type="file" accept="image/*" onChange={handleFileChange}
                style={{ width: '100%', padding: 8, background: '#1a1a1a',
                  border: '1px solid rgba(255,255,255,.15)', borderRadius: 8, color: '#fff' }} />
              {imageFile && (
                <div style={{ marginTop: 8 }}>
                  <img src={imageFile} alt="" style={{ maxHeight: 100, borderRadius: 8 }} />
                </div>
              )}
            </div>
            <div style={{ textAlign: 'center', margin: '12px 0', color: '#666', fontSize: 11 }}>또는</div>
            <div>
              <div style={{ fontSize: 11, color: '#aaa', marginBottom: 6 }}>🔗 이미지 URL 직접 입력</div>
              <input type="url" value={imageFile ? '' : draftValue}
                onChange={(e) => { setDraftValue(e.target.value); setImageFile(''); }}
                placeholder="https://... 또는 /images/products/xxx.jpg"
                style={{ width: '100%', padding: 12, background: '#1a1a1a',
                  border: '1px solid rgba(255,255,255,.15)', borderRadius: 8, color: '#fff', fontSize: 13 }} />
            </div>
            <div style={{ fontSize: 10, color: '#666', marginTop: 8 }}>
              💡 Google Drive 공유 URL은 자동 변환됨. placehold.co / Unsplash / GitHub raw URL 추천.
            </div>
          </>
        )}

        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 20 }}>
          <button onClick={() => setEditMode(null)} disabled={saving}
            style={{ ...btnStyle, background: 'transparent', color: '#aaa', border: '1px solid rgba(255,255,255,.15)' }}>
            취소
          </button>
          <button onClick={handleSave} disabled={saving}
            style={{ ...btnStyle, background: saving ? '#666' : '#0ea5e9', color: '#fff' }}>
            {saving ? '저장 중...' : '💾 저장'}
          </button>
        </div>
      </div>
    </div>
  );
}
