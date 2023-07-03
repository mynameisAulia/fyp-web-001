import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY,
  authDomain: "msa-3-c8e3a.firebaseapp.com",
  projectId: "msa-3-c8e3a",
  storageBucket: "msa-3-c8e3a.appspot.com",
  messagingSenderId: "38907559006",
  appId: "1:38907559006:web:b88c8f04f4072ec8b908cf",
  measurementId: "G-NJLCCPFQMT"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore (app);
export const auth = getAuth();
export const storage = getStorage(app);
