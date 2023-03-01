import { useState, useEffect } from 'react'
import { documentDataToUserType, UserType } from "./UserType";
import { collection, DocumentData, getFirestore, limit, onSnapshot, orderBy, query, QuerySnapshot, where } from 'firebase/firestore';

const userCollectionRef = collection(getFirestore(), "users");
export function useUser(number_of_user: number = 4, searchField: string = "", searchText: string = "") {
  const [ firestoreUsers, setFirestoreUsers ] = useState<UserType[]>([]);
  const [ loading, setLoading ] = useState(true);
  function handleSnapshot(collection: QuerySnapshot<DocumentData>) {
    setFirestoreUsers(collection.docs.map(doc => documentDataToUserType(doc.data())));
  }
  useEffect(() => {
    setLoading(true);
    let unsubscribeFunction;
    if (searchField == "id")
      unsubscribeFunction = onSnapshot(query(userCollectionRef, where("id", "==", searchText), 
        orderBy("id"),
        limit(number_of_user)), handleSnapshot
      );
    else if (searchField == "name")  
      unsubscribeFunction = onSnapshot(query(userCollectionRef, 
        where("displayName", ">=", searchText), 
        where("displayName", "<=", searchText + '\uf8ff'),
        orderBy("displayName"),
        // startAt(searchText), 
        // endAt(searchText + '\uf8ff'),
        limit(number_of_user),
      ), handleSnapshot);
    else unsubscribeFunction = onSnapshot(query(userCollectionRef, limit(number_of_user)), handleSnapshot);
    setLoading(false);
    return unsubscribeFunction;
  }, [ number_of_user, searchText, searchField ]);
  
  return {
    users: firestoreUsers,
    usersLoading: loading,
  };
}
