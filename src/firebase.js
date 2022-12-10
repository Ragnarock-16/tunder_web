import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCgCuoJLhKXICkOZUt8kcMb6biwwKXSZ48",
    authDomain: "tunder-d085d.firebaseapp.com",
    projectId: "tunder-d085d",
    storageBucket: "tunder-d085d.appspot.com",
    messagingSenderId: "727573237318",
    appId: "1:727573237318:web:c8816ad810306840340447"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const storage = getStorage();
export const db = getFirestore();