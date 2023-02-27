import { getFirestore, collection, addDoc, onSnapshot, query, Timestamp, orderBy, limit } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firebaseDb } from "../../firebase/firestore";
import { FirestoreMessageType, toFirestoreMessageType, toMessageType } from "./MessageType";

export function useMessages(props: {groupId: string, from: string, number_of_message: number}) {
  const [ firestoreMessages, setFirestoreMessages ] = useState<FirestoreMessageType[]>([]);
  async function addMessageToFirestore(message: string) {
    return addDoc(collection(firebaseDb, "groups", props.groupId, "messages"), { 
      message: message,
      time: Timestamp.fromDate(new Date()),
      isReceived: true,
      from: props.from
    });
  }
  useEffect(() => {
    onSnapshot(query(collection(getFirestore(), "groups", props.groupId, "messages"), 
      orderBy("time"), limit(props.number_of_message)),
      (querySnapshot) => {
        querySnapshot.docs.map((doc) => toFirestoreMessageType(doc))
      }
    )
  })
  return {
    messages: firestoreMessages.map((firestoreMessage) => toMessageType(firestoreMessage)),
    addMessageToFirestore,
  }
}