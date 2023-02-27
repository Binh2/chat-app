import { useState, useEffect } from 'react'
import { documentDataToFirestoreUser, FirestoreUser } from "./FirestoreUser";
import { firebaseDb } from "../../firebase/firestore"
import { addDoc, collection, doc, DocumentData, endAt, getDoc, getDocs, onSnapshot, orderBy, query, QuerySnapshot, startAt, where } from 'firebase/firestore';

const userCollectionRef = collection(firebaseDb, "users");
export function useFirestoreUser(searchField: string = "", searchText: string = "") {
  const [ firestoreUsers, setFirestoreUsers ] = useState<Array<FirestoreUser>>([]);
  const [ loading, setLoading ] = useState(true);
  async function handleSnapshot(collection: QuerySnapshot<DocumentData>) {
    setLoading(true);
    await setFirestoreUsers(collection.docs.map(doc => documentDataToFirestoreUser(doc.data())));
    setLoading(false);
  }
  useEffect(() => {
    if (searchField == "uid")
      return onSnapshot(query(userCollectionRef, where("uid", "==", searchText)), handleSnapshot);
    else if (searchField == "name") 
      return onSnapshot(query(userCollectionRef, 
        where("displayName", ">=", searchText), 
        where("displayName", "<=", searchText + '\uf8ff'),
        // orderBy("displayName"),
        // startAt(searchText), 
        // endAt(searchText + '\uf8ff'),
      ), handleSnapshot);
    else return onSnapshot(userCollectionRef, handleSnapshot);
  }, [ searchText, searchField ]);
  async function getFirestoreUsersByUid(uid: string) {
    const querySnapshot = await getDocs(query(userCollectionRef,
      where("uid", "==", uid)));
    return querySnapshot.docs.map((doc) => documentDataToFirestoreUser(doc));
  }
  async function getFirestoreUsersByName(searchName: string) {
    const querySnapshot = await getDocs(query(userCollectionRef, 
      where('displayName', '>=', searchName),
      where('displayName', '<=', searchName + '\uf8ff')));
    return querySnapshot.docs.map((doc) => documentDataToFirestoreUser(doc));
  }
  async function addUserToFirestore(user: FirestoreUser) {
    setLoading(true);
    const docRef = await addDoc(userCollectionRef, {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL
    });
    setLoading(false);
  }
  async function addUserToFirestoreWithoutDup(user: FirestoreUser) {
    setLoading(true);
    const users = await getFirestoreUsersByUid(user.uid);
    console.log("add user without dup: ");
    console.log(users);
    if (users.length == 0)
      await addUserToFirestore(user);
    setLoading(false);
  }
  return {
    firestoreUsers,
    firestoreUsersLoading: loading,
    addUserToFirestore,
    addUserToFirestoreWithoutDup,
    getFirestoreUsersByName,
    getFirestoreUsersByUid,
  };
}
