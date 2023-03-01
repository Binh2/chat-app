import { getAuth } from "firebase/auth";
import { addDoc, collection, getFirestore, Timestamp } from "firebase/firestore";
import { FirestoreGroupType } from "../Groups/FirestoreGroupType";

export async function addMessageToFirestore(currentGroup: FirestoreGroupType | null, message: string) {
  const user = getAuth().currentUser;
  if (!user || !currentGroup) return;
  return addDoc(collection(getFirestore(), "messages", "commaSeparatedUserIds", currentGroup.userIds.join(",")), { 
    message: message,
    time: Timestamp.fromDate(new Date()),
    isReceived: true,
    from: user.uid
  });
}