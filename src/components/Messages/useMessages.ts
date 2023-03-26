import { getFirestore, collection, onSnapshot, query, orderBy, limit, QuerySnapshot, DocumentData } from "firebase/firestore";
import { useEffect, useState } from "react";
import { GroupType } from "../Groups/GroupType";
import { MessageType, messageTypeConverter } from "./MessageType";

export function useMessages(group: GroupType | null, number_of_message: number) {
  const [ messages, setMessages ] = useState<MessageType[]>([]);
  const [ loading, setLoading ] = useState(true);
  useEffect(() => {
    if (!group) { 
      setLoading(false); 
      return; 
    }
    setLoading(true);
    const unsubscribeFunction = onSnapshot(query(collection(getFirestore(), "groups", group.id, "messages")
    .withConverter(messageTypeConverter), 
      orderBy("time", "desc"), limit(number_of_message)),
      
      (querySnapshot) => {
        setMessages(querySnapshot.docs.map((doc) => doc.data()).reverse());
      }
    );
    setLoading(false);
    return unsubscribeFunction;
  }, [group, number_of_message]);
  
  return {
    // messages: messages.filter((message, index) => index < messages.length),
    messages,
    messagesLoading: loading,
    setMessagesLoading: setLoading,
  }
}