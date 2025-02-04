import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDoHsQSbGMoPjsV-5Cp_wm-9RvpmbejID8",
  authDomain: "finanzas-education.firebaseapp.com",
  projectId: "finanzas-education",
  storageBucket: "finanzas-education.firebasestorage.app",
  messagingSenderId: "824170706526",
  appId: "1:824170706526:web:399ef4cd6dbba882fea6cf"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
