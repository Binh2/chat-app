import { getAuth } from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";

export async function getGroupsByUserIds(userIds: string[]) {
  return getDocs(query(collection(getFirestore(), "groups"), where("userIds", "==", userIds)));
}

export async function addGroupToFirestore(friendUserId: string) {
  const authUser = getAuth().currentUser;
  if (authUser == null || friendUserId == authUser.uid) return;
  return addDoc(collection(getFirestore(), "groups"), {
    messages: [],
    userIds: [authUser.uid, friendUserId].sort(),
  });
}

export async function addGroupToFirestoreWithoutDup(friendUserId: string | undefined) {
  const authUser = getAuth().currentUser;
  if (!authUser || !friendUserId || friendUserId == authUser.uid) return;
  const querySnapshot = await getGroupsByUserIds([authUser.uid, friendUserId].sort());
  if (querySnapshot.docs.length > 0) return;
  return addGroupToFirestore(friendUserId)
}