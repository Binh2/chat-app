import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore, Timestamp } from "firebase/firestore";
import { FirestoreGroupType } from "../Groups/FirestoreGroupType";
import { messageTypeConverter } from "./MessageType";

export async function addMessageToFirestore(currentGroup: FirestoreGroupType | null, message: string) {
  const authUser = getAuth().currentUser;
  if (!authUser || !currentGroup) return;
  return addDoc(collection(getFirestore(), "messages", "commaSeparatedUserIds", 
    currentGroup.userIds.join(",")
  ).withConverter(messageTypeConverter), { 
    message: message,
    time: new Date(),
    from: authUser.uid,

    // isReceived and id are not use but stay here for no Typscript error
    isReceived: true,
    id: "",
  });
}