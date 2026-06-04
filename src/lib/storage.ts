/**
 * Firebase Storage 업로드 helper
 *
 * P0-A: Firestore 1MB 한계 우회. 모든 첨부파일/이미지는 Storage에 올리고
 * URL만 Firestore에 저장.
 *
 * 사용:
 *   const url = await uploadDataURI(dataURI, 'cms/logo-img.png');
 *   await updateDoc(..., { 'logo-img': url });
 */
import { ref, uploadBytes, getDownloadURL, deleteObject, uploadString } from 'firebase/storage';
import { storage } from './firebase';

/** base64 dataURI → Storage URL */
export async function uploadDataURI(dataURI: string, path: string): Promise<string> {
  if (!dataURI.startsWith('data:')) {
    // 이미 URL이면 그대로 반환 (Storage 미사용)
    return dataURI;
  }
  const r = ref(storage, path);
  // uploadString의 'data_url' 모드: dataURI를 그대로 받아서 자동 디코드
  const snap = await uploadString(r, dataURI, 'data_url');
  return await getDownloadURL(snap.ref);
}

/** File 객체 → Storage URL (진행률 콜백 지원) */
export async function uploadFile(
  file: File,
  path: string,
  onProgress?: (percent: number) => void
): Promise<string> {
  const r = ref(storage, path);
  // uploadBytes는 진행률 미지원이라 큰 파일은 uploadBytesResumable 권장
  // 일단 단순 업로드. 진행률 콜백은 0/100만 호출
  onProgress?.(0);
  const snap = await uploadBytes(r, file, {
    contentType: file.type,
    customMetadata: { originalName: file.name },
  });
  onProgress?.(100);
  return await getDownloadURL(snap.ref);
}

/** Storage 파일 삭제 (URL에서 path 추출) */
export async function deleteByURL(url: string): Promise<void> {
  if (!url.includes('firebasestorage')) return; // Storage URL이 아니면 무시
  try {
    const r = ref(storage, url);
    await deleteObject(r);
  } catch (e) {
    console.warn('Storage 삭제 실패:', e);
  }
}

/** key로 정해진 path 생성 (cms/{key}-{timestamp}.{ext}) */
export function pathForCmsImage(key: string, mimeType: string = 'image/png'): string {
  const ext = (mimeType.split('/')[1] || 'png').replace('+xml', '').replace('jpeg', 'jpg');
  const safeKey = key.replace(/[^a-zA-Z0-9.-]/g, '_');
  const ts = Date.now();
  return `cms/${safeKey}-${ts}.${ext}`;
}

/** key로 정해진 path 생성 — 게시판 첨부 (downloads/{id}-{filename}) */
export function pathForBoardFile(boardId: string, fileName: string): string {
  const safe = fileName.replace(/[^a-zA-Z0-9.\-가-힣]/g, '_');
  return `boards/${boardId}/${safe}`;
}
