// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeYO4o0M8IWh3zHpR0lofvUKldfgRKykg",
  authDomain: "questlynedata.firebaseapp.com",
  projectId: "questlynedata",
  storageBucket: "questlynedata.firebasestorage.app",
  messagingSenderId: "937137999826",
  appId: "1:937137999826:web:a07d74ebb3190831ec020b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);   