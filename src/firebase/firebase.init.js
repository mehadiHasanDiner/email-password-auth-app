// Import the functions you need from the SDKs you need
import { getAuth } from "firebase/auth";
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAfESZWjGx21D8WeBa9GtwBYEmcc-LLQYQ",
  authDomain: "email-password-auth-app-6e0b3.firebaseapp.com",
  projectId: "email-password-auth-app-6e0b3",
  storageBucket: "email-password-auth-app-6e0b3.firebasestorage.app",
  messagingSenderId: "981687010541",
  appId: "1:981687010541:web:999b7e5c00ec85c3df78e4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
