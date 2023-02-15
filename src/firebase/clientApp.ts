import { initializeApp, getApps } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getDatabase } from "firebase/database";
// import "firebase/auth";
// import "firebase/firestore";

const clientCredentials = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measureId: process.env.NEXT_PUBLIC_FIREBASE_MEASURE_ID
};

let app = null;
if (!getApps().length) {
  app = initializeApp(clientCredentials);
}
const auth = getAuth();
const database = getDatabase();

export { app, auth, database };