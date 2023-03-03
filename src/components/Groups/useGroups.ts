import { useAuthUserContext } from "@/firebase/auth/AuthUserContext";
import { collection, getFirestore, onSnapshot, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getNewestMessages } from "../Messages/messageHandlingFunctions";
import { FirestoreGroupType, firestoreGroupTypeConverter } from "./FirestoreGroupType";
import { GroupType } from "./GroupType";

export function useGroups() {
  const [ firestoreGroups, setFirestoreGroups ] = useState<FirestoreGroupType[]>([]);
  const [ groups, setGroups ] = useState<GroupType[]>([]);
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
      query(collection(getFirestore(), "groups"), 
        where("userIds", "array-contains", authUser?.uid ?? "")
      ).withConverter(firestoreGroupTypeConverter), 
      (querySnapshot) => {
        const firestoreGroupsTemp = querySnapshot.docs.map((doc) => doc.data());
        // querySnapshot.docChanges()
        setFirestoreGroups(firestoreGroupsTemp);
        // setGroups(firestoreGroupsTemp);
        // firestoreGroupsTemp.map(async firestoreGroup => {
        //   const messagesSnapshot = await getNewestMessages(firestoreGroup, 1);
        //   setGroups();
        // })
        
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