// lib/auth.js

import { getAuth } from "firebase/auth";
import { app } from "./firebase";

// Initialize Firebase Auth
const auth = app ? getAuth(app) : null;

export { auth };
