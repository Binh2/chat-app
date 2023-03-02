import { useAuthUserContext } from "@/firebase/auth/AuthUserContext";
import { collection, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FirestoreGroupType, firestoreGroupTypeConverter } from "./FirestoreGroupType";

export function useGroups() {
  const [ firestoreGroups, setFirestoreGroups ] = useState<FirestoreGroupType[]>([]);
  // const [ groups, setGroups ] = useState<GroupType[]>([]);
  const [ loading, setLoading ] = useState(true);
  const { authUser } = useAuthUserContext();

  useEffect(() => {
    setLoading(true);
    
    // const unsubscribeFunction = onSnapshot(
    //   query(collection(getFirestore(), "groups"), where("userIds", "array-contains", authUser?.uid ?? "")), 
    //   (querySnapshot) => {
    //     setFirestoreGroups(querySnapshot.docs.map((doc) => queryDocumentSnapshotToFirestoreGroupType(doc)));
    //     // setGroups(querySnapshot.docs.map((doc) => {
    //     //   firestoreGroup = queryDocumentSnapshotToFirestoreGroupType(doc);

    //     // })
    //   }
    // );
    const unsubscribeFunction = onSnapshot(
      query(collection(getFirestore(), "groups"), where("userIds", "array-contains", authUser?.uid ?? "")).withConverter(firestoreGroupTypeConverter), 
      (querySnapshot) => {
        setFirestoreGroups(querySnapshot.docs.map((doc) => doc.data()));
      }
    );
    setLoading(false);
    return unsubscribeFunction;
  }, [ authUser ]);

  return {
    groups: firestoreGroups,
    groupsLoading: loading,
    setGroupsLoading: setLoading,
  }
}