// Import the functions you need from the SDKs you need
import { getApps, initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD9lqf3JN01FwZdXN8-wIoTH9dZmzXlRjM",
  authDomain: "luismendezphotography-4aa71.firebaseapp.com",
  projectId: "luismendezphotography-4aa71",
  storageBucket: "luismendezphotography-4aa71.firebasestorage.app",
  messagingSenderId: "945789953360",
  appId: "1:945789953360:web:377cd59e3bc85adf483855",
  measurementId: "G-XN99Q8CT35"
};

// Initialize Firebase
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

export const db = getFirestore(app);