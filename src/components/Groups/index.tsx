import useFirebaseAuth from "@/firebase/auth/useFirebaseAuth";
import Users from "../Users";
import { UserType } from "../Users/UserType";
import { FirestoreGroupType } from "./FirestoreGroupType";
import { GroupType } from "./GroupType";
import { useGroups } from "./useGroups"

export function Groups(props: { groups: FirestoreGroupType[] }) {
  const { user } = useFirebaseAuth();

  return (
    <>
      {/* { user != null ?
        <Users firestoreUsers={props.groups.map((group) => group.users
          .find((firestoreUser: UserType) => firestoreUser.uid != user.uid))} firestoreUsersLoading={true}></Users>
        : ""
      } */}
      <ul>
        { props.groups.map(group => <li key={group.id}>{group.users[0]}</li>)}
      </ul>
    </>  
  )
}