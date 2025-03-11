// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC58Be1LeCC0fsTMv43bwGdO_DRJy27i1c",
  authDomain: "expense-tracker-maipo.firebaseapp.com",
  projectId: "expense-tracker-maipo",
  storageBucket: "expense-tracker-maipo.firebasestorage.app",
  messagingSenderId: "230992040491",
  appId: "1:230992040491:web:47e014ffb9d51fe78d906e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);