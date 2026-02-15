// lib/firebase.js

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";

// Firebase configuration using Vite environment variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID,
};

// Check if required Firebase config is present
const hasFirebaseConfig = Object.values(firebaseConfig).every(value => value && value !== 'your_firebase_api_key_here');

if (!hasFirebaseConfig) {
  console.warn('Firebase configuration is incomplete. Some features may not work.');
}

// Initialize Firebase safely (prevents re-initialization error)
let app = null;
try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
} catch (error) {
  console.error('Firebase initialization error:', error);
}

// Initialize Analytics only in browser
let analytics = null;

if (typeof window !== "undefined" && app) {
  isSupported().then((yes) => {
    if (yes && app) {
      try {
        analytics = getAnalytics(app);
      } catch (error) {
        console.warn('Analytics initialization error:', error);
      }
    }
  });
}

export { app, analytics };
