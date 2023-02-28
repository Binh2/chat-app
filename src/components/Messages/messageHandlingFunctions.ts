import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore, Timestamp } from "firebase/firestore";

export async function addMessageToFirestore(message: string) {
  const user = getAuth().currentUser;
  if (user == null) return;
  return addDoc(collection(getFirestore(), "messages"), { 
    message: message,
    time: Timestamp.fromDate(new Date()),
    isReceived: true,
    from: user.uid
  });
}