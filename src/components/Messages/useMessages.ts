import { getAuth } from "firebase/auth";
import { getFirestore, collection, addDoc, getDocs, doc, onSnapshot, query, connectFirestoreEmulator, DocumentData, QuerySnapshot, Timestamp, DocumentReference } from "firebase/firestore";
import { useEffect, useState } from "react";
import { firebaseDb } from "../../firebase/firestore";
import { FirestoreMessageType, toFirestoreMessageType, toMessageType } from "./MessageType";

export function useMessages(props: {groupId: string, from: string}) {
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
    onSnapshot(collection(getFirestore(), "groups", props.groupId, "messages"), (querySnapshot) => {
      querySnapshot.docs.map((doc) => toFirestoreMessageType(doc))
    })
  })
  return {
    messages: firestoreMessages.map((firestoreMessage) => toMessageType(firestoreMessage)),
    addMessageToFirestore,
  }
}