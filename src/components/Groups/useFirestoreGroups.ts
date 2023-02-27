import useFirebaseAuth from "@/firebase/auth/useFirebaseAuth";
import { firebaseDb } from "@/firebase/firestore";
import { Unsubscribe } from "firebase/auth";
import { collection, DocumentData, onSnapshot, QuerySnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import { documentDataToFirestoreGroup, FirestoreGroup } from "./FirestoreGroup";

export function useFirestoreGroups() {
  const [ firestoreGroups, setFirestoreGroups ] = useState<FirestoreGroup[]>([]);
  const { user } = useFirebaseAuth();
  function addFirestoreGroup(friendUid: string) {
    if (user == null) return;
    setFirestoreGroups([...firestoreGroups, {
      messages: [],
      group: [user.uid, friendUid],
    }]);
  }
  useEffect(() => {
    const unsubscribeFuncs: Unsubscribe[] = [];
    const unsubscribeFunc = onSnapshot(collection(firebaseDb, "groups"), async (querySnapshot: QuerySnapshot<DocumentData>) => {
      setFirestoreGroups(querySnapshot.docs.map((doc) => documentDataToFirestoreGroup(doc)));
    });
    unsubscribeFuncs.push(unsubscribeFunc);
    return () => unsubscribeFuncs.forEach((unsubscribeFunc) => unsubscribeFunc());
  })

  return {
    firestoreGroups,
    addFirestoreGroup,
  }
}