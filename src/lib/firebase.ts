import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, signInAnonymously, onAuthStateChanged } from 'firebase/auth';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyDmgOBu3kPUGzff_CyR647kIbN4F91seJE",
  authDomain: "gen-lang-client-0276589179.firebaseapp.com",
  projectId: "gen-lang-client-0276589179",
  storageBucket: "gen-lang-client-0276589179.firebasestorage.app",
  messagingSenderId: "746025368201",
  appId: "1:746025368201:web:0a89d91b9bf2aa60a36458"
};

const app = initializeApp(firebaseConfig);

// Anonymous auth for Firestore + Storage write access
// (P0-C에서 Email/Password Auth로 교체 예정)
const auth = getAuth(app);
// 로그인된 사용자가 없을 때만 익명 인증 (관리자 Email/Password 세션 보존)
onAuthStateChanged(auth, (u) => {
  if (!u) signInAnonymously(auth).catch((e) => console.warn('Anonymous auth failed:', e));
});

// Firestore (named DB)
export const db = getFirestore(app, 'ai-studio-e97c649f-c50c-4cd5-8952-6640d34f2444');

// Storage — P0-A: 큰 파일(이미지/PDF) 업로드용
// Firestore 1MB 한계 우회. base64 인코딩 대신 Storage URL을 DB에 저장.
export const storage = getStorage(app);

export { auth };
export default app;
