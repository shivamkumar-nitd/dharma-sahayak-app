// src/firebase.ts
import { initializeApp } from "firebase/app";
import { getAuth, User } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyBpgNjl4jvC_vS_Q5xu9vBQALoxNVFBCdQ",
  authDomain: "nyaya-ai.firebaseapp.com",
  projectId: "nyaya-ai",
  storageBucket: "nyaya-ai.firebasestorage.app",
  messagingSenderId: "889917316845",
  appId: "1:889917316845:web:e63d3e8218de03d908b6e4"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

// Firebase user type extension
export interface FirebaseUser extends User {
  phone?: string;
  language?: string;
}