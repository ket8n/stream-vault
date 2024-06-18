// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCZFmQBZJjdua4YIuzYoTXY6GdJwo77DQk",
  authDomain: "streamvault-ae70e.firebaseapp.com",
  projectId: "streamvault-ae70e",
  storageBucket: "streamvault-ae70e.appspot.com",
  messagingSenderId: "1074681184993",
  appId: "1:1074681184993:web:f56ebeb1e8f25a431ceda0",
  measurementId: "G-DH391ZKDE1",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth();
