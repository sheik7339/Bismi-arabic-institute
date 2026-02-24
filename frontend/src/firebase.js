import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "AIzaSyBS_7HMlQRIOWGTPVDli_Z7XL93Nk_Xp2A",
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "bismi-arabic-institute.firebaseapp.com",
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "bismi-arabic-institute",
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "bismi-arabic-institute.firebasestorage.app",
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "1074189202184",
    appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:1074189202184:web:664dcc483a85d26707b2bd",
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID || "G-LH3MGJC4KH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Keep analytics initialization safe incase it isn't supported in all environments
let analytics;
try {
    analytics = getAnalytics(app);
} catch (e) {
    console.warn("Analytics blocked or not supported", e);
}

// Initialize and export Firebase Auth
export const auth = getAuth(app);
