import { useState, useEffect } from 'react'
import { documentDataToFirestoreUser, FirestoreUser } from "./FirestoreUser";
import { firebaseDb } from "../../firebase/firestore"
import { addDoc, collection, doc, DocumentData, onSnapshot, query, QuerySnapshot, where } from 'firebase/firestore';
import { firebaseApp } from '@/firebase';
import { getAuth } from 'firebase/auth';

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
        // where("name", "==", searchText)
      ), handleSnapshot);
    else return onSnapshot(userCollectionRef, handleSnapshot);
  }, [ searchText, searchField ]);
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
  async function addFriendToFirestoreUser(user: FirestoreUser, friendUser: FirestoreUser) {
    return addDoc(collection(userCollectionRef, "friends"), {
      uid: friendUser.uid,
      email: friendUser.email,
      displayName: friendUser.displayName,
      photoURL: friendUser.photoURL
    });
  }
  async function addFriendToFirestoreUserBothWay(user: FirestoreUser, friendUser: FirestoreUser) {
    Promise.all([
      addFriendToFirestoreUser(user, friendUser), 
      addFriendToFirestoreUser(friendUser, user)])
    .then((docRefs) => {
      docRefs.forEach((docRef) => {
        console.log("Document written with ID: ", docRef.id);
      })
    })
    .catch((error) => console.error("Error adding document: ", error))
  }
  function getUserByUid(uid: String) {
    return query(userCollectionRef,
      where("uid", "==", uid));
  }
  async function getUserByName(searchName: String) {
    return query(userCollectionRef, 
      where('displayName', '>=', searchName),
      where('displayName', '<=', searchName + '\uf8ff'))
  }
  return {
    firestoreUsers,
    firestoreUsersLoading: loading,
    addUserToFirestore,
    addFriendToFirestoreUserBothWay,
    getUserByName,
    getUserByUid,
  };
}

useFirestoreUser.defaultProps = {
  searchField: "",
  searchText: ""
}