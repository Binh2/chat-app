import { getAuthUserName, getUserName } from "@/common";
import { getAuth } from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { authUserToUserType, UserType } from "../Users/UserType";

export async function getGroupsByUserIds(userIds: string[]) {
  return getDocs(query(collection(getFirestore(), "groups"), where("userIds", "==", userIds)));
}

export async function addGroupToFirestore(friendUser: UserType) {
  const authUser = getAuth().currentUser;
  if (authUser == null || friendUser.id == authUser.uid) return;
  return addDoc(collection(getFirestore(), "groups"), {
    userIds: [authUser.uid, friendUser.id].sort(),
    users: [authUserToUserType(authUser), friendUser],
    nickname: [getAuthUserName(authUser), getUserName(friendUser)].sort().join(", ")
  });
}

export async function addGroupToFirestoreWithoutDup(friendUser: UserType | undefined) {
  const authUser = getAuth().currentUser;
  if (!authUser || !friendUser || friendUser.id == authUser.uid) return;
  const querySnapshot = await getGroupsByUserIds([authUser.uid, friendUser.id].sort());
  if (querySnapshot.docs.length > 0) return;
  return addGroupToFirestore(friendUser);
}