import { initializeApp, getApps, getApp } from "firebase/app";
// import "firebase/auth";
// import "firebase/firestore";

// const firebaseConfig = {
//   apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
//   authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
//   projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
//   storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
//   messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
//   appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
//   measureId: process.env.NEXT_PUBLIC_FIREBASE_MEASURE_ID
// };
const firebaseConfig = {
  apiKey: "AIzaSyCcGbgovYMRoSFKmtjZ1J6x8yXEJVDiFmg",
  authDomain: "chat-app-97f7e.firebaseapp.com",
  projectId: "chat-app-97f7e",
  storageBucket: "chat-app-97f7e.appspot.com",
  messagingSenderId: "240397499502",
  appId: "1:240397499502:web:5cf8ea028e6c897a64fa7f",
  measurementId: "G-CDD3XXV6YB"
};
const firebaseApp = (getApps().length > 0) ? getApp() : initializeApp(firebaseConfig);
function initFirebaseApp() {
  return (getApps().length > 0) ? getApp() : initializeApp(firebaseConfig);
}

export { initFirebaseApp,  firebaseApp };