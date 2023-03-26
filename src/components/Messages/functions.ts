import { getAuth } from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore, limit, orderBy, query, Timestamp } from "firebase/firestore";
import { GroupType } from "../Groups/GroupType";
import { messageTypeConverter } from "./MessageType";

export async function addMessageToFirestore(group: GroupType | null, message: string) {
  const authUser = getAuth().currentUser;
  if (!authUser || !group) return;
  return addDoc(collection(getFirestore(), "groups", group.id, "messages").withConverter(messageTypeConverter), { 
    message: message,
    time: new Date(),
    from: authUser.uid,

    // isReceived and id are not use but stay here for no Typscript error
    isReceived: true,
    id: "",
  });
}

// export async function getNewestMessages(currentGroup: FirestoreGroupType, number_of_message: number) {
//   return getDocs(query(collection(getFirestore(), "messages", "commaSeparatedUserIds",
//       currentGroup.userIds.join(",")), orderBy("time", "desc"), limit(number_of_message)
//     ).withConverter(messageTypeConverter)
//   );
// }