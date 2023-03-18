import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyBbnC8r08qFQUaRJwgIH_jG5a9LV1eNzwk",
    authDomain: "komo-3ab2b.firebaseapp.com",
    projectId: "komo-3ab2b",
    storageBucket: "komo-3ab2b.appspot.com",
    messagingSenderId: "780647522842",
    appId: "1:780647522842:web:422250ca5d5006995f27a3",
    measurementId: "G-H5Z6X960DF"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default app;