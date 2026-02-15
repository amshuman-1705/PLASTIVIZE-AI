// lib/auth.js
import { getAuth } from "firebase/auth";
import { app } from "./firebase";

// Handle case where Firebase is not initialized
export const auth = app ? getAuth(app) : null;

