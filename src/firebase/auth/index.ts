import { getAuth, connectAuthEmulator } from "firebase/auth";
import { firebaseApp } from "..";

function initAuthEmulator() {
  connectAuthEmulator(getAuth(firebaseApp), "http://localhost:9099");
}

export { initAuthEmulator };