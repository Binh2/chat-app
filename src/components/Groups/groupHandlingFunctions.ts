import { getAuth } from "firebase/auth";
import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";

export async function getGroupsByUserId(userId: string) {
  return getDocs(query(collection(getFirestore(), "groups"), where("users", "array-contains", userId)));
}

export async function addGroupToFirestore(friendUserId: string) {
  const user = getAuth().currentUser;
  if (user == null) return;
  return addDoc(collection(getFirestore(), "groups"), {
    messages: [],
    users: [user.uid, friendUserId],
  });
}

export async function addGroupToFirestoreWithoutDup(friendUserId: string) {
  const querySnapshot = await getGroupsByUserId(friendUserId);
  if (querySnapshot.docs.length > 0) return;
  return addGroupToFirestore(friendUserId)
}