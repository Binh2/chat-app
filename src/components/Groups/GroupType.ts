import { collection, doc, getDoc, getDocs, getFirestore, query, QueryDocumentSnapshot, QuerySnapshot, SnapshotOptions, where } from "firebase/firestore";
import { UserType } from "../Users/UserType"
import { FirestoreGroupType } from "./FirestoreGroupType"

export type GroupType = {
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

// export const groupTypeConverter = {
//   toFirestore: (group: GroupType) => {
//     return {
//       userIds: group.users.map(user => user.id),
//     };
//   },
//   fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
//     const data = snapshot.data(options);
//     return {
//       users: await getDocs(query(collection(getFirestore(), "users"), where("id", "in", data.userIds)))
//     };
//   }
// };