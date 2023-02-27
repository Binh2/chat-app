import useFirebaseAuth from "@/firebase/auth/useFirebaseAuth";
import Users from "../Users";
import { FirestoreUser } from "../Users/UserType";
import { FirestoreGroup } from "./FirestoreGroup";
import { useFirestoreGroups } from "./useFirestoreGroups"

export function Groups(props: { groups: FirestoreGroup[] }) {
  // const { firestoreGroups, addFirestoreGroup } = useFirestoreGroups();
  const { user } = useFirebaseAuth();

  return (
    <>
      <Users firestoreUsers={props.firestoreGroups.map((firestoreGroup) => firestoreGroup.group
        .find((firestoreUser: FirestoreUser) => firestoreUser.uid != user?.uid))} firestoreUsersLoading={true}></Users>
    </>  
  )
}