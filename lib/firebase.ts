import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore/lite";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyDsDxGONBKjQG1Nw3acntosHmPgJmo7-oQ",
  authDomain: "news-of-bihar.firebaseapp.com",
  projectId: "news-of-bihar",
  storageBucket: "news-of-bihar.firebasestorage.app",
  messagingSenderId: "1007390814563",
  appId: "1:1007390814563:web:2b6db0b7435fd469516356",
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const storage = getStorage(app);
export const auth = getAuth(app);

export default app;