import useFirebaseAuth from "@/firebase/auth/useAuthUser";
import { firebaseDb } from "@/firebase/firestore";
import { getAuth, Unsubscribe } from "firebase/auth";
import { collection, DocumentData, DocumentSnapshot, getFirestore, limit, onSnapshot, orderBy, query, QuerySnapshot, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FirestoreGroupType, queryDocumentSnapshotToFirestoreGroupType } from "./FirestoreGroupType";

export function useGroups() {
  const [ firestoreGroups, setFirestoreGroups ] = useState<FirestoreGroupType[]>([]);
  const [ loading, setLoading ] = useState(true);

  useEffect(() => {
    setLoading(true);
    const authUser = getAuth().currentUser;
    const unsubscribeFunction = onSnapshot(
      query(collection(getFirestore(), "groups"), where("userIds", "array-contains", authUser?.uid ?? "")), 
      (querySnapshot) => {
        setFirestoreGroups(querySnapshot.docs.map((doc) => queryDocumentSnapshotToFirestoreGroupType(doc)));
      }
    );
    setLoading(false);
    return unsubscribeFunction;
  }, []);

  return {
    groups: firestoreGroups,
    groupsLoading: loading,
  }
}