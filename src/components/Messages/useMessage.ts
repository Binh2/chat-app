import { getFirestore, collection, onSnapshot, query, DocumentData, QuerySnapshot, limit, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FirestoreMessageType, MessageType, toFirestoreMessageType, toMessageType } from "./MessageType";

export function useMessage(props: {groupId: string}) {
  const [ firestoreMessage, setFirestoreMessage ] = useState<FirestoreMessageType | null>(null);
  useEffect(() => {
    return onSnapshot(query(collection(getFirestore(), "groups", props.groupId, "messages"), 
      orderBy("time"), limit(1)), 
      (querySnapshot: QuerySnapshot<DocumentData>) => {
        if (querySnapshot.docs.length > 0)
          setFirestoreMessage(toFirestoreMessageType(querySnapshot.docs[0].data))
      }
    )
  })
  return {
    message: firestoreMessage != null ? toMessageType(firestoreMessage) : null
  }
}