import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";


const firebaseConfig = {
    apiKey: "AIzaSyCbW5wVrIEoPhQgL3Ci7c8CqQPOIpllbZQ",
    authDomain: "homehub-2fbb7.firebaseapp.com",
    projectId: "homehub-2fbb7",
    storageBucket: "homehub-2fbb7.firebasestorage.app",
    messagingSenderId: "415252916265",
    appId: "1:415252916265:web:fd95d998813a6bfb23d438",
    measurementId: "G-5794E2P8DN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);
