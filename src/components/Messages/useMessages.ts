import { getFirestore, collection, onSnapshot, query, orderBy, limit } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FirestoreGroupType } from "../Groups/FirestoreGroupType";
import { MessageType, messageTypeConverter } from "./MessageType";

export function useMessages(currentGroup: FirestoreGroupType | null, number_of_message: number = 10) {
  const [ messages, setMessages ] = useState<MessageType[]>([]);
  const [ loading, setLoading ] = useState(true);
  useEffect(() => {
    if (!currentGroup) { 
      setLoading(false); 
      return; 
    }
    setLoading(true);
    const unsubscribeFunction = onSnapshot(query(collection(getFirestore(), "messages", "commaSeparatedUserIds", 
    currentGroup.userIds.join(",")).withConverter(messageTypeConverter), 
      orderBy("time"), limit(number_of_message)),
      (querySnapshot) => {
        setMessages(querySnapshot.docs.map((doc) => doc.data()));
      }
    );
    setLoading(false);
    return unsubscribeFunction;
  }, [currentGroup, number_of_message]);
  
  return {
    messages,
    messagesLoading: loading,
    setMessagesLoading: setLoading,
  }
}