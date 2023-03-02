import { useState, useEffect } from 'react'
import { UserType, userTypeConverter } from "./UserType";
import { collection, getFirestore, limit, onSnapshot, orderBy, query, QuerySnapshot, where } from 'firebase/firestore';

const userCollectionRef = collection(getFirestore(), "users");
export function useUser(number_of_user: number = 4, searchField: string = "", searchText: string = "") {
  const [ firestoreUsers, setFirestoreUsers ] = useState<UserType[]>([]);
  const [ loading, setLoading ] = useState(true);
  function handleSnapshot(collection: QuerySnapshot<UserType>) {
    setFirestoreUsers(collection.docs.map(doc => doc.data()));
  }
  useEffect(() => {
    setLoading(true);
    let unsubscribeFunction;
    if (searchField == "id")
      unsubscribeFunction = onSnapshot(query(userCollectionRef, where("id", "==", searchText), 
        orderBy("id"),
        limit(number_of_user)).withConverter(userTypeConverter), handleSnapshot
      );
    else if (searchField == "name")  
      unsubscribeFunction = onSnapshot(query(userCollectionRef, 
        where("displayName", ">=", searchText), 
        where("displayName", "<=", searchText + '\uf8ff'),
        orderBy("displayName"),
        // startAt(searchText), 
        // endAt(searchText + '\uf8ff'),
        limit(number_of_user),
      ).withConverter(userTypeConverter), handleSnapshot);
    else unsubscribeFunction = onSnapshot(query(userCollectionRef, limit(number_of_user)).withConverter(userTypeConverter), 
      handleSnapshot
    );
    setLoading(false);
    return unsubscribeFunction;
  }, [ number_of_user, searchText, searchField ]);
  
  return {
    users: firestoreUsers,
    usersLoading: loading,
  };
}
