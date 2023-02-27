import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, onSnapshot, query, connectFirestoreEmulator, DocumentData, QuerySnapshot, Timestamp, DocumentReference } from "firebase/firestore";
import { useState } from "react";
import { firebaseDb } from "../../firebase/firestore";
import { FirestoreMessage } from "./MessageType";

export function useFirestoreMessages() {
  const [ messages, setMessages ] = useState<FirestoreMessage[]>([]);
  async function addMessageToFirestore(message: string) {
    return addDoc(collection(firebaseDb, "messages"), { message: message});
  }
  async function addMessage(message: string) {
    setMessages([...messages, {
      message: message,
      time: Timestamp.fromDate(new Date()),
      isReceived: false,
      from: getAuth().currentUser?.uid ?? "",
    }]);
    addMessageToFirestore(message)
    .then((docRef: DocumentReference<DocumentData>) => {
      const i = messages.length - 1;
      const clonedMessage = {...messages[i]};
      clonedMessage.isReceived = true;
    
      const clonedState = [...messages];
      clonedState[i] = clonedMessage;
    
      setMessages(clonedState);
    }).catch((error: Error) => {
      console.log("Error: " + error.message + ". Message failed to send. Later, please resend it again");
    });
  }
  return {
    messages,
    addMessage,
  }
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
function subscribeToMessages(callback: (collection: QuerySnapshot<DocumentData>) => void) {
  const unsubscribeToMessages = onSnapshot(collection(firebaseDb, "messages"), callback); 
  return unsubscribeToMessages;
}
export { addMessage, getAllMessages, subscribeToMessages };