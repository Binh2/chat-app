import { addDoc, collection, getDocs, getFirestore, query, where } from "firebase/firestore";
import { UserType, userTypeConverter } from "./UserType";

export async function getUsersById(userId: string) {
  const querySnapshot = await getDocs(query(collection(getFirestore(), "users"),
    where("id", "==", userId)).withConverter(userTypeConverter));
  return querySnapshot.docs.map((doc) => doc.data());
}
export async function getUsersByName(searchName: string) {
  const querySnapshot = await getDocs(query(collection(getFirestore(), "users"), 
    where('displayName', '>=', searchName),
    where('displayName', '<=', searchName + '\uf8ff')).withConverter(userTypeConverter));
  return querySnapshot.docs.map((doc) => doc.data());
}
export async function addUserToFirestore(user: UserType | null) {
  if (!user) return;
  const docRef = await addDoc(collection(getFirestore(), "users").withConverter(userTypeConverter), user);
}
export async function addUserToFirestoreWithoutDup(user: UserType | null) {
  if (!user) return;
  const users = await getUsersById(user.id);
  console.log("add user without dup: ");
  console.log(users);
  if (users.length == 0)
    await addUserToFirestore(user);
}