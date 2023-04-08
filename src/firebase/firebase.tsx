// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB-HxYqikFZiLuclL8ltm4t0Gs-yKcCM3c",
  authDomain: "kvizzhub-b3e6f.firebaseapp.com",
  projectId: "kvizzhub-b3e6f",
  storageBucket: "kvizzhub-b3e6f.appspot.com",
  messagingSenderId: "713716835298",
  appId: "1:713716835298:web:875e34dfbb29174be70fbb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);