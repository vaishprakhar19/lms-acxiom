// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD6wbIJQF7_ij-V31r6EzIWqppY91qH1ao",
  authDomain: "librarymanagementsystem-68960.firebaseapp.com",
  projectId: "librarymanagementsystem-68960",
  storageBucket: "librarymanagementsystem-68960.firebasestorage.app",
  messagingSenderId: "634598855519",
  appId: "1:634598855519:web:02f468a3ba2fb0927a5cea"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firestore
const db = getFirestore(app);

export { db };