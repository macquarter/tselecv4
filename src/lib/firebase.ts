import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDmgOBu3kPUGzff_CyR647kIbN4F91seJE",
  authDomain: "gen-lang-client-0276589179.firebaseapp.com",
  projectId: "gen-lang-client-0276589179",
  storageBucket: "gen-lang-client-0276589179.firebasestorage.app",
  messagingSenderId: "746025368201",
  appId: "1:746025368201:web:0a89d91b9bf2aa60a36458"
};

const app = initializeApp(firebaseConfig);

// Use the existing Firestore database
export const db = getFirestore(app, 'ai-studio-e97c649f-c50c-4cd5-8952-6640d34f2444');

export default app;
