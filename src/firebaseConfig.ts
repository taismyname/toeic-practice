// src/firebaseConfig.ts
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCG34WY1EM7UWlWK-Ko87Ewrw5hMD51Ib8",
  authDomain: "toeic-app-alpha.firebaseapp.com",
  projectId: "toeic-app-alpha",
  storageBucket: "toeic-app-alpha.firebasestorage.app",
  messagingSenderId: "795144074395",
  appId: "1:795144074395:web:bca98509e3e01461b8823e"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
