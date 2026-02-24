import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyBS_7HMlQRIOWGTPVDli_Z7XL93Nk_Xp2A",
    authDomain: "bismi-arabic-institute.firebaseapp.com",
    projectId: "bismi-arabic-institute",
    storageBucket: "bismi-arabic-institute.firebasestorage.app",
    messagingSenderId: "1074189202184",
    appId: "1:1074189202184:web:664dcc483a85d26707b2bd",
    measurementId: "G-LH3MGJC4KH"
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
