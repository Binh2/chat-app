import { getAuth, connectAuthEmulator } from "firebase/auth";
import { firebaseApp } from "..";

const firebaseAuth = getAuth(firebaseApp)
function initAuthEmulator() {
  connectAuthEmulator(firebaseAuth, "http://localhost:9099");
}

export { firebaseAuth, initAuthEmulator };