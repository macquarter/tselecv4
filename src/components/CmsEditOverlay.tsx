/**
 * CmsEditOverlay v18
 *
 * v18 변경사항:
 *  - 파일 업로드 시 자동으로 canvas 리사이즈/JPEG 압축
 *  - 결과 base64를 900KB 이하로 보장 (Firestore 1MB 한계 안전)
 *  - 큰 이미지(태승전자 풀 로고 등)도 문제없이 저장
 *  - 에러 메시지 더 명확하게 표시
 *
 * v22: CMS 편집은 관리자(Firebase Auth) 로그인 시에만 활성화
 * v23: 관리자 챗봇 학습 패널 추가 (siteContent/chatbot)
 * v24: 관리자 앱(iframe) 내에서는 로그인 없이 편집 허용
 */
import { useEffect, useState, useCallback } from 'react';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import i18n from '../lib/i18n';
import { db, auth } from '../lib/firebase';
import { onAuthStateChanged, signInWithEmailAndPassword, signOut } from 'firebase/auth';
import { useSiteContent } from '../contexts/SiteContentContext';

const ADMIN_EMAIL = 'tsadmin@tselec.co.kr';

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

/**
 * 이미지 파일을 canvas로 리사이즈/압축 → base64 dataURI 반환
 * 결과가 900KB 이하가 될 때까지 반복적으로 크기/품질 낮춤
 */
async function processImageFile(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        // 시작: 원본 크기, 품질 0.9
        let maxDim = 1600;
        let quality = 0.9;
        let result = '';

        const tryEncode = (): boolean => {
          let { width, height } = img;
          // 비율 유지하며 maxDim에 맞춤
          if (width > height && width > maxDim) {
            height = Math.round(height * maxDim / width);
            width = maxDim;
          } else if (height > maxDim) {
            width = Math.round(width * maxDim / height);
            height = maxDim;
          }
          const canvas = document.createElement('canvas');
          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          if (!ctx) return false;
          // 투명 PNG → 흰 배경 (JPEG는 alpha 미지원)
          ctx.fillStyle = '#ffffff';
          ctx.fillRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
          // PNG 원본 알파가 있으면 PNG로, 없으면 JPEG로
          const hasAlpha = file.type === 'image/png' || file.type === 'image/webp';
          result = hasAlpha
            ? canvas.toDataURL('image/png')
            : canvas.toDataURL('image/jpeg', quality);
          return true;
        };

        // 첫 시도
        if (!tryEncode()) { reject(new Error('canvas encode 실패')); return; }
        const SAFE_MAX = 900_000; // 900KB 안전 한계
        let attempts = 0;
        while (result.length > SAFE_MAX && attempts < 8) {
          attempts++;
          // 매번 크기를 75%로, 품질도 낮춤 (JPEG일 경우만)
          maxDim = Math.round(maxDim * 0.75);
          quality = Math.max(0.4, quality - 0.1);
          // PNG라도 너무 크면 JPEG로 강제 전환
          if (attempts >= 2 && result.startsWith('data:image/png')) {
            // 강제 JPEG (알파 손실)
            const canvas = document.createElement('canvas');
            let w = img.width, h = img.height;
            if (w > h && w > maxDim) { h = Math.round(h * maxDim / w); w = maxDim; }
            else if (h > maxDim) { w = Math.round(w * maxDim / h); h = maxDim; }
            canvas.width = w; canvas.height = h;
            const ctx = canvas.getContext('2d')!;
            ctx.fillStyle = '#ffffff';
            ctx.fillRect(0, 0, w, h);
            ctx.drawImage(img, 0, 0, w, h);
            result = canvas.toDataURL('image/jpeg', quality);
          } else {
            tryEncode();
          }
        }
        if (result.length > SAFE_MAX) {
          reject(new Error(`이미지를 900KB 이하로 줄일 수 없음 (현재 ${(result.length / 1024).toFixed(0)}KB)`));
          return;
        }
        console.log(`[CMS] 이미지 처리: ${(file.size / 1024).toFixed(0)}KB 원본 → ${(result.length / 1024).toFixed(0)}KB base64 (${attempts}회 압축)`);
        resolve(result);
      };
      img.onerror = () => reject(new Error('이미지 디코드 실패'));
      img.src = reader.result as string;
    };
    reader.onerror = () => reject(new Error('파일 읽기 실패'));
    reader.readAsDataURL(file);
  });
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
  const [imageFile, setImageFile] = useState<string>('');
  const [imageInfo, setImageInfo] = useState<string>('');
  const [saving, setSaving] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [adminUser, setAdminUser] = useState<any>(null);
  const [authResolved, setAuthResolved] = useState(false);
  const [loginId, setLoginId] = useState('');
  const [loginPw, setLoginPw] = useState('');
  const [loginErr, setLoginErr] = useState('');
  const [loggingIn, setLoggingIn] = useState(false);
  const [loginDismissed, setLoginDismissed] = useState(false);
  const isAdmin = !!adminUser && (adminUser.email || '').toLowerCase() === ADMIN_EMAIL;
  const inAdminFrame = (() => {
    try { return window.self !== window.top && /tselecadmin/i.test(document.referrer || ''); }
    catch (e) { return true; }
  })();
  const canEdit = isAdmin || inAdminFrame;

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u: any) => {
      setAdminUser(u && !u.isAnonymous ? u : null);
      setAuthResolved(true);
    });
    return () => unsub();
  }, []);

  const handleLogin = useCallback(async () => {
    setLoginErr('');
    setLoggingIn(true);
    try {
      let id = loginId.trim();
      if (id && id.indexOf('@') < 0) id = id + '@tselec.co.kr';
      await signInWithEmailAndPassword(auth, id, loginPw);
      setLoginPw('');
    } catch (e: any) {
      setLoginErr('로그인 실패: 아이디 또는 비밀번호를 확인하세요.');
    } finally {
      setLoggingIn(false);
    }
  }, [loginId, loginPw]);

  const handleLogout = useCallback(async () => {
    try { await signOut(auth); } catch (e) { /* noop */ }
  }, []);

  const [chatPanelOpen, setChatPanelOpen] = useState(false);
  const [chatRaw, setChatRaw] = useState('');
  const [chatSaving, setChatSaving] = useState(false);
  const [chatMsg, setChatMsg] = useState('');

  const openChatPanel = useCallback(async () => {
    setChatMsg('');
    setChatPanelOpen(true);
    try {
      const snap = await getDoc(doc(db, 'siteContent', 'chatbot'));
      setChatRaw(snap.exists() ? ((snap.data() as any).raw || '') : '');
    } catch (e) { /* noop */ }
  }, []);

  const saveChatKnowledge = useCallback(async () => {
    setChatSaving(true); setChatMsg('');
    try {
      await setDoc(doc(db, 'siteContent', 'chatbot'), { raw: chatRaw }, { merge: true });
      setChatMsg('✓ 저장되었습니다. 챗봇이 새 지식을 학습합니다. (방문자는 새로고침 시 반영)');
    } catch (e: any) {
      setChatMsg('저장 실패: ' + (e?.message || String(e)));
    } finally { setChatSaving(false); }
  }, [chatRaw]);


  const handleSave = useCallback(async () => {
    if (!editMode) return;
    setSaving(true);
    setErrorMsg('');
    try {
      if (editMode.type === 'text') {
        if (siteContent.updateText) {
          const ok = await siteContent.updateText(editMode.key, draftValue);
          if (ok) setEditMode(null);
          else setErrorMsg('Firestore 저장 실패. 콘솔(F12)에 자세한 에러가 있습니다.');
        }
      } else if (editMode.type === 'image') {
        const finalUrl = imageFile || draftValue;
        if (!finalUrl) { setErrorMsg('파일을 선택하거나 URL을 입력하세요.'); setSaving(false); return; }
        let url = finalUrl;
        const gd = url.match(/drive\.google\.com\/file\/d\/([^/]+)\//);
        if (gd) url = `https://drive.google.com/uc?export=view&id=${gd[1]}`;
        if (siteContent.updateImage) {
          const ok = await siteContent.updateImage(editMode.key, url);
          if (ok) setEditMode(null);
          else setErrorMsg(`Firestore 저장 실패. dataURI 크기: ${(url.length / 1024).toFixed(0)}KB (1024KB 한계).`);
        }
      }
    } catch (e: any) {
      setErrorMsg('에러: ' + (e?.message || String(e)));
    } finally {
      setSaving(false);
    }
  }, [editMode, draftValue, imageFile, siteContent]);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setErrorMsg('');
    setImageInfo(`처리 중: ${file.name} (${(file.size / 1024).toFixed(0)}KB)...`);
    try {
      const dataUri = await processImageFile(file);
      setImageFile(dataUri);
      setDraftValue('');
      const sizeKB = (dataUri.length / 1024).toFixed(0);
      setImageInfo(`✓ ${file.name} → ${sizeKB}KB (자동 리사이즈됨)`);
    } catch (err: any) {
      setImageInfo('');
      setErrorMsg(err?.message || '이미지 처리 실패');
    }
  };

  const handleCandidatePick = (key: string) => {
    if (!editMode || editMode.type !== 'text') return;
    setEditMode({ ...editMode, key, candidates: undefined });
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('edit') !== '1') return;
    if (!canEdit) return;

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
      setErrorMsg('');
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
      setImageInfo('');
      setErrorMsg('');
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
    banner.textContent = '✏️ CMS 편집 모드 (관리자) — 텍스트/이미지/로고 클릭 + 자동 리사이즈';
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
  }, [canEdit]);

  const _editParam = new URLSearchParams(window.location.search).get('edit') === '1';

  if (_editParam && authResolved && !canEdit && !loginDismissed) {
    return (
      <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.82)', zIndex: 100000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
        onClick={() => setLoginDismissed(true)}>
        <div style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,.12)', borderRadius: 16, padding: 28, maxWidth: 360, width: '100%', color: '#fff' }}
          onClick={(e) => e.stopPropagation()}>
          <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 6 }}>관리자 로그인</div>
          <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 18 }}>CMS 편집은 관리자만 가능합니다.</div>
          <input value={loginId} onChange={(e) => setLoginId(e.target.value)} placeholder="아이디 (tsadmin)" autoFocus
            style={{ width: '100%', padding: 11, marginBottom: 10, borderRadius: 8, background: '#1a1a1a', border: '1px solid rgba(255,255,255,.15)', color: '#fff', fontSize: 14, boxSizing: 'border-box' }} />
          <input value={loginPw} onChange={(e) => setLoginPw(e.target.value)} type="password" placeholder="비밀번호"
            onKeyDown={(e) => { if (e.key === 'Enter') handleLogin(); }}
            style={{ width: '100%', padding: 11, marginBottom: 14, borderRadius: 8, background: '#1a1a1a', border: '1px solid rgba(255,255,255,.15)', color: '#fff', fontSize: 14, boxSizing: 'border-box' }} />
          {loginErr && <div style={{ color: '#fca5a5', fontSize: 12, marginBottom: 12 }}>{loginErr}</div>}
          <button onClick={handleLogin} disabled={loggingIn}
            style={{ width: '100%', padding: 11, borderRadius: 8, border: 'none', background: loggingIn ? '#555' : '#0ea5e9', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
            {loggingIn ? '로그인 중…' : '로그인'}
          </button>
          <button onClick={() => setLoginDismissed(true)}
            style={{ width: '100%', padding: 9, marginTop: 8, borderRadius: 8, border: '1px solid rgba(255,255,255,.12)', background: 'transparent', color: '#9ca3af', fontSize: 12, cursor: 'pointer' }}>
            닫기 (편집 안 함)
          </button>
        </div>
      </div>
    );
  }

  if (!editMode) {
    if (_editParam && canEdit) {
      return (
        <>
          <div style={{ position: 'fixed', top: 5, right: 10, zIndex: 100001, display: 'flex', gap: 8 }}>
            <button onClick={openChatPanel}
              style={{ padding: '4px 12px', borderRadius: 6, border: 'none', background: 'rgba(14,165,233,.9)', color: '#fff', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
              🤖 챗봇 학습
            </button>
            <button onClick={handleLogout}
              style={{ padding: '4px 12px', borderRadius: 6, border: 'none', background: 'rgba(0,0,0,.55)', color: '#fff', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
              관리자 로그아웃
            </button>
          </div>
          {chatPanelOpen && (
            <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,.7)', zIndex: 100002, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}
              onClick={() => setChatPanelOpen(false)}>
              <div style={{ background: '#0a0a0a', border: '1px solid rgba(255,255,255,.12)', borderRadius: 16, padding: 24, maxWidth: 640, width: '100%', maxHeight: '88vh', overflowY: 'auto', color: '#fff' }}
                onClick={(e) => e.stopPropagation()}>
                <div style={{ fontSize: 15, fontWeight: 700, marginBottom: 4 }}>🤖 챗봇 학습 (지식 추가/수정)</div>
                <div style={{ fontSize: 12, color: '#9ca3af', marginBottom: 14, lineHeight: 1.6 }}>
                  추가한 지식을 챗봇이 바로 학습합니다. 항목은 <b style={{ color: '#6ee7ff' }}>---</b> 한 줄로 구분하고,
                  각 항목의 <b>첫 줄 = 키워드(쉼표로 구분)</b>, <b>둘째 줄부터 = 답변</b> 입니다.
                </div>
                <textarea value={chatRaw} onChange={(e) => setChatRaw(e.target.value)}
                  placeholder={'환불, 반품, 교환\n수령 후 7일 이내 환불 가능합니다. 032-329-7600 으로 연락 주세요.\n---\n납기, 배송, 출고\n표준 납기는 발주 후 2~3주입니다.'}
                  style={{ width: '100%', minHeight: 320, padding: 12, borderRadius: 8, background: '#1a1a1a', border: '1px solid rgba(255,255,255,.15)', color: '#fff', fontSize: 13, lineHeight: 1.6, fontFamily: 'monospace', resize: 'vertical', boxSizing: 'border-box' }} />
                {chatMsg && <div style={{ marginTop: 10, fontSize: 12, color: chatMsg.startsWith('✓') ? '#34d399' : '#fca5a5' }}>{chatMsg}</div>}
                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 8, marginTop: 16 }}>
                  <button onClick={() => setChatPanelOpen(false)}
                    style={{ padding: '10px 18px', borderRadius: 8, border: '1px solid rgba(255,255,255,.15)', background: 'transparent', color: '#aaa', fontSize: 14, cursor: 'pointer' }}>닫기</button>
                  <button onClick={saveChatKnowledge} disabled={chatSaving}
                    style={{ padding: '10px 18px', borderRadius: 8, border: 'none', background: chatSaving ? '#666' : '#0ea5e9', color: '#fff', fontSize: 14, fontWeight: 600, cursor: 'pointer' }}>
                    {chatSaving ? '저장 중…' : '💾 저장 (즉시 학습)'}
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      );
    }
    return null;
  }

  const overlayStyle: React.CSSProperties = {
    position: 'fixed', inset: 0, background: 'rgba(0,0,0,.7)',
    zIndex: 100000, display: 'flex', alignItems: 'center', justifyContent: 'center',
    padding: 20,
  };
  const modalStyle: React.CSSProperties = {
    background: '#0a0a0a', border: '1px solid rgba(255,255,255,.1)',
    borderRadius: 16, padding: 24, maxWidth: 600, width: '100%',
    color: '#fff', boxShadow: '0 20px 60px rgba(0,0,0,.5)',
    maxHeight: '90vh', overflowY: 'auto',
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
              <div style={{ fontSize: 11, color: '#aaa', marginBottom: 6 }}>📁 파일 업로드 (자동 리사이즈 → 900KB 이하 보장)</div>
              <input type="file" accept="image/*" onChange={handleFileChange}
                style={{ width: '100%', padding: 8, background: '#1a1a1a',
                  border: '1px solid rgba(255,255,255,.15)', borderRadius: 8, color: '#fff' }} />
              {imageInfo && (
                <div style={{ marginTop: 8, padding: '6px 10px', background: 'rgba(52,211,153,.1)',
                  borderRadius: 6, fontSize: 11, color: '#34d399' }}>
                  {imageInfo}
                </div>
              )}
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

        {errorMsg && (
          <div style={{ marginTop: 12, padding: '10px 14px', background: 'rgba(239,68,68,.15)',
            border: '1px solid rgba(239,68,68,.4)', borderRadius: 8,
            color: '#fca5a5', fontSize: 12 }}>
            ⚠️ {errorMsg}
          </div>
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
