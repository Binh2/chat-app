import { initializeApp, getApps, getApp } from "firebase/app";
import { connectAuthEmulator, getAuth } from "firebase/auth";
import { connectFirestoreEmulator, getFirestore } from "firebase/firestore";

function initFirebaseApp() {
  const firebaseConfig = {
    apiKey: "AIzaSyCcGbgovYMRoSFKmtjZ1J6x8yXEJVDiFmg",
    authDomain: "chat-app-97f7e.firebaseapp.com",
    projectId: "chat-app-97f7e",
    storageBucket: "chat-app-97f7e.appspot.com",
    messagingSenderId: "240397499502",
    appId: "1:240397499502:web:5cf8ea028e6c897a64fa7f",
    measurementId: "G-CDD3XXV6YB"
  };
  const env = process.env.NODE_ENV;
  const firebaseApp = (getApps().length > 0) ? getApp() : initializeApp(firebaseConfig)
  if (env == "development" || env == "test") {
    connectFirestoreEmulator(getFirestore(firebaseApp), "localhost", 8080); 
    connectAuthEmulator(getAuth(firebaseApp), "http://localhost:9099");
  }
}

export { initFirebaseApp };