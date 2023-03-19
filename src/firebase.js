import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBtOnxtVL6t1cEzW7S5lyzBdcyEXjxJLXo",
    authDomain: "komo-721a9.firebaseapp.com",
    projectId: "komo-721a9",
    storageBucket: "komo-721a9.appspot.com",
    messagingSenderId: "438623313380",
    appId: "1:438623313380:web:c046a2c8e0787aa3b7bbf1",
    measurementId: "G-HLXGXJ4Z65"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;