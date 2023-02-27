import { getFirestore, collection, onSnapshot, query, DocumentData, QuerySnapshot, limit, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { MessageType, toMessageType } from "./MessageType";

export function useMessageFromGroupId(props: {groupId: string}) {
  const [ message, setMessage ] = useState<MessageType | null>(null);
  useEffect(() => {
    return onSnapshot(query(collection(getFirestore(), "groups", props.groupId, "messages"), 
      orderBy("time"), limit(1)), 
      (querySnapshot: QuerySnapshot<DocumentData>) => {
        if (querySnapshot.docs.length > 0)
          setMessage(toMessageType(querySnapshot.docs[0].data))
      }
    )
  })
  return {
    message,
  }
}