import { getAuth } from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { UserType } from "../Users/UserType";

export async function getGroupsByUserIds(userIds: string[]) {
  return getDocs(query(collection(getFirestore(), "groups"), where("userIds", "==", userIds)));
}

export async function addGroupToFirestore(friendAuthUser: UserType) {
  const authUser = getAuth().currentUser;
  if (authUser == null || friendAuthUser.id == authUser.uid) return;
  return addDoc(collection(getFirestore(), "groups"), {
    userIds: [authUser.uid, friendAuthUser.id].sort(),
    nickname: [authUser.displayName ?? authUser.uid, friendAuthUser.displayName ?? friendAuthUser.id].sort().join(", ")
  });
}

export async function addGroupToFirestoreWithoutDup(friendAuthUser: UserType | undefined) {
  const authUser = getAuth().currentUser;
  if (!authUser || !friendAuthUser || !friendAuthUser.id || friendAuthUser.id == authUser.uid) return;
  const querySnapshot = await getGroupsByUserIds([authUser.uid, friendAuthUser.id].sort());
  if (querySnapshot.docs.length > 0) return;
  return addGroupToFirestore(friendAuthUser);
}