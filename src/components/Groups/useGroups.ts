import { useAuthUserContext } from "@/firebase/auth/AuthUserContext";
import { collection, getFirestore, onSnapshot, query, Unsubscribe, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { GroupType, groupTypeConverter } from "./GroupType";

export function useGroups() {
  const [ groups, setGroups ] = useState<GroupType[]>([]);
  const [ loading, setLoading ] = useState(true);
  const { authUser } = useAuthUserContext();

  useEffect(() => {
    setLoading(true);
    const unsubscribeFunctions: Unsubscribe[] = [];
    const unsubscribeFunction = onSnapshot(
      query(collection(getFirestore(), "groups"), 
        where("userIds", "array-contains", authUser?.uid ?? "")
      ).withConverter(groupTypeConverter), 
      (querySnapshot) => {
        setGroups(querySnapshot.docs.map(doc => doc.data()));
      }
    );
    unsubscribeFunctions.push(unsubscribeFunction);
    setLoading(false);
    return () => { unsubscribeFunctions.map(unsubscribeFunction => { unsubscribeFunction(); }); };
  }, [ authUser, groups ]);

  return {
    groups: groups,
    groupsLoading: loading,
    setGroupsLoading: setLoading,
  }
}