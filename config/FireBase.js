// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAModhKciTEXn6zbzxTkk8yqHuI1RsCuw0",
  authDomain: "test-b8970.firebaseapp.com",
  projectId: "test-b8970",
  storageBucket: "test-b8970.firebasestorage.app",
  messagingSenderId: "300491027250",
  appId: "1:300491027250:web:ff3518e4273a4b99595d2b",
  measurementId: "G-GKKNF5FTM6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db,auth };
