import { useState, useEffect } from 'react'
import { documentDataToUserType, UserType } from "./UserType";
import { collection, DocumentData, getFirestore, onSnapshot, query, QuerySnapshot, where } from 'firebase/firestore';

const userCollectionRef = collection(getFirestore(), "users");
export function useFirestoreUser(searchField: string = "", searchText: string = "") {
  const [ firestoreUsers, setFirestoreUsers ] = useState<Array<UserType>>([]);
  const [ loading, setLoading ] = useState(true);
  async function handleSnapshot(collection: QuerySnapshot<DocumentData>) {
    setLoading(true);
    await setFirestoreUsers(collection.docs.map(doc => documentDataToUserType(doc.data())));
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
  
  return {
    firestoreUsers,
    firestoreUsersLoading: loading,
  };
}
