// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "mern-estate-2d472.firebaseapp.com",
    projectId: "mern-estate-2d472",
    storageBucket: "mern-estate-2d472.appspot.com",
    messagingSenderId: "448535885454",
    appId: "1:448535885454:web:425f1cc0563496ecb47bdf"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);