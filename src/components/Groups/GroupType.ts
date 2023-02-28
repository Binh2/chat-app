import { getAuth } from "firebase/auth"
import { DocumentData } from "firebase/firestore"
import { MessageType } from "../Messages/MessageType"
import { getFirestoreUsersByUid } from "../Users/userHandlingFunctions"
import { UserType } from "../Users/UserType"
import { FirestoreGroupType } from "./FirestoreGroupType"

export type GroupType = {
  messages: string[] | MessageType[],
  users: UserType[],
  id: string
}

export async function firestoreGroupTypeToGroupType(firestoreGroupType: FirestoreGroupType) {
  // let user = getAuth().currentUser;
  // if (user == null) return;
  // const friendId = firestoreGroupType.users.find(userId => userId != user.uid)
  // if (friendId == undefined) return;
  // user = await getFirestoreUsersByUid(friendId);
  return firestoreGroupType;
}