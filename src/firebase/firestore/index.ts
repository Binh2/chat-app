import { getFirestore, connectFirestoreEmulator } from "firebase/firestore";
import { firebaseApp } from "..";

const firebaseDb = getFirestore(firebaseApp);
function initFirestoreEmulator() {
  connectFirestoreEmulator(firebaseDb, "localhost", 8080); // Comment this line when in production
}

export { firebaseDb, initFirestoreEmulator };