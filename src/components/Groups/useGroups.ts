import useFirebaseAuth from "@/firebase/auth/useFirebaseAuth";
import { firebaseDb } from "@/firebase/firestore";
import { Unsubscribe } from "firebase/auth";
import { addDoc, collection, DocumentData, getFirestore, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FirestoreGroupType, queryDocumentSnapshotToFirestoreGroupType } from "./FirestoreGroupType";

export function useGroups() {
  const [ firestoreGroups, setFirestoreGroups ] = useState<FirestoreGroupType[]>([]);
  // const { user } = useFirebaseAuth();

  useEffect(() => {
    const unsubscribeFunctions: Unsubscribe[] = [];
    const unsubscribeFunction = onSnapshot(collection(firebaseDb, "groups"), async (querySnapshot: QuerySnapshot<DocumentData>) => {
      setFirestoreGroups(querySnapshot.docs.map((doc) => queryDocumentSnapshotToFirestoreGroupType(doc)));
    });
    unsubscribeFunctions.push(unsubscribeFunction);
    return () => unsubscribeFunctions.forEach((unsubscribeFunction) => unsubscribeFunction());
  })

  return {
    // groups: firestoreGroups.map(firestoreGroup => firestoreGroupTypeToGroupType(firestoreGroup)),
    groups: firestoreGroups
  }
}