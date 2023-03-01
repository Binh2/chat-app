import { initializeApp, getApps, getApp } from "firebase/app";

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