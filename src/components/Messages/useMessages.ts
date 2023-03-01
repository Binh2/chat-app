import { getFirestore, collection, addDoc, onSnapshot, query, Timestamp, orderBy, limit } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FirestoreGroupType } from "../Groups/FirestoreGroupType";
import { FirestoreMessageType, queryDocumentSnapshotToFirestoreMessageType } from "./FirestoreMessageType";
import { firestoreMessageTypeToMessageType } from "./MessageType";

export function useMessages(currentGroup: FirestoreGroupType | null, number_of_message: number = 10) {
  const [ firestoreMessages, setFirestoreMessages ] = useState<FirestoreMessageType[]>([]);
  const [ loading, setLoading ] = useState(true);
  useEffect(() => {
    if (!currentGroup) return;
    return onSnapshot(query(collection(getFirestore(), "messages", "commaSeparatedUserIds", 
    currentGroup.userIds.join(",")), 
      orderBy("time"), limit(number_of_message)),
      (querySnapshot) => {
        setLoading(true);
        setFirestoreMessages(querySnapshot.docs.map((doc) => queryDocumentSnapshotToFirestoreMessageType(doc)));
        setLoading(false);
      }
    );
  }, [currentGroup, number_of_message]);
  
  return {
    messages: firestoreMessages.map((firestoreMessage) => 
      firestoreMessageTypeToMessageType(firestoreMessage)
    ),
    messagesLoading: loading,
  }
}