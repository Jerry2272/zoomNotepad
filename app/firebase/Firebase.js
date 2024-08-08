import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, signInWithEmailAndPassword , createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyDLlo1I5hvY5wi7cPGVPYZlt2rPYSlZoIw",
  authDomain: "zoomnote-fe2ac.firebaseapp.com",
  projectId: "zoomnote-fe2ac",
  storageBucket: "zoomnote-fe2ac.appspot.com",
  messagingSenderId: "529707615082",
  appId: "1:529707615082:web:b8383e8a74f8c63b221b13",
  measurementId: "G-VQHNNH2LSQ"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);
const googleAuth = new GoogleAuthProvider();

export { db, auth, googleAuth, signInWithPopup, signInWithEmailAndPassword , createUserWithEmailAndPassword};
