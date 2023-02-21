import { getFirestore, collection, addDoc, getDocs, doc, onSnapshot, query, connectFirestoreEmulator } from "firebase/firestore";
import { firebaseApp } from "..";

const firebaseDb = getFirestore(firebaseApp);
function initFirestoreEmulator() {
  connectFirestoreEmulator(firebaseDb, "localhost", 8080); // Comment this line when in production
}

async function addMessage(message: String) {
  try {
    const docRef = await addDoc(collection(firebaseDb, "messages"), { message: message});
    console.log("Document written with ID: ", docRef.id);
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
async function getAllMessages() {
  const querySnapshot = await getDocs(collection(firebaseDb, "messages"));
  return querySnapshot.docs;
}
function subscribeToMessages(callback: (collection: any) => any) {
  // const unsubscribeToMessages = onSnapshot(doc(firebaseDb, "messages"), (doc) => {
  //   console.log("Current data: ", doc.data());
  // });
  const unsubscribeToMessages = onSnapshot(collection(firebaseDb, "messages"), callback); 
  return unsubscribeToMessages;
}
export { firebaseDb, addMessage, getAllMessages, subscribeToMessages, initFirestoreEmulator };