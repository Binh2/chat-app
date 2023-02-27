import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { documentDataToUserType, UserType } from "./UserType";

export async function getFirestoreUsersByUid(uid: string) {
  const querySnapshot = await getDocs(query(collection(getFirestore(), "users"),
    where("uid", "==", uid)));
  return querySnapshot.docs.map((doc) => documentDataToUserType(doc));
}
export async function getFirestoreUsersByName(searchName: string) {
  const querySnapshot = await getDocs(query(collection(getFirestore(), "users"), 
    where('displayName', '>=', searchName),
    where('displayName', '<=', searchName + '\uf8ff')));
  return querySnapshot.docs.map((doc) => documentDataToUserType(doc));
}
export async function addUserToFirestore(user: UserType) {
  const docRef = await addDoc(collection(getFirestore(), "users"), {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL
  });
}
export async function addUserToFirestoreWithoutDup(user: UserType) {
  const users = await getFirestoreUsersByUid(user.uid);
  console.log("add user without dup: ");
  console.log(users);
  if (users.length == 0)
    await addUserToFirestore(user);
}