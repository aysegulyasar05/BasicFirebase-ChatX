// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from 'firebase/auth'; 
import {getFirestore} from 'firebase/firestore'

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDtiAHFjhu2Y72yify3qGBqh6QACZCfEjA",
    authDomain: "chatroomx-b5b74.firebaseapp.com",
    projectId: "chatroomx-b5b74",
    storageBucket: "chatroomx-b5b74.appspot.com",
    messagingSenderId: "345089656914",
    appId: "1:345089656914:web:385fa8137af2a6b556778b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Yetkilendirmeyi aktif eder
export const auth = getAuth(app);

// google ile yetkilendirmenin kurulumu
export const provider = new GoogleAuthProvider();


//veritabani

export const db = getFirestore(app);