import { getFirestore, collection, addDoc, onSnapshot, query, Timestamp, orderBy, limit } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FirestoreMessageType, queryDocumentSnapshotToFirestoreMessageType } from "./FirestoreMessageType";
import { firestoreMessageTypeToMessageType } from "./MessageType";

export function useMessages(number_of_message: number) {
  const [ firestoreMessages, setFirestoreMessages ] = useState<FirestoreMessageType[]>([]);
  useEffect(() => {
    onSnapshot(query(collection(getFirestore(), "messages"), 
      orderBy("time"), limit(number_of_message)),
      (querySnapshot) => {
        querySnapshot.docs.map((doc) => queryDocumentSnapshotToFirestoreMessageType(doc))
      }
    )
  })
  return {
    messages: firestoreMessages.map((firestoreMessage) => 
      firestoreMessageTypeToMessageType(firestoreMessage)
    ),
  }
}