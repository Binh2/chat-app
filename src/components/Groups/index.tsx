import useAuthUser from "@/firebase/auth/useAuthUser";
import { SyntheticEvent } from "react";
import { FirestoreGroupType } from "./FirestoreGroupType";
import styles from "./Groups.module.css";

export function Groups(props: { groups: FirestoreGroupType[], groupsLoading: boolean, 
currentGroup: FirestoreGroupType | null, onCurrentGroupSwitch?: (
  event: SyntheticEvent, 
  oldGroup: FirestoreGroupType | null, 
  newGroup: FirestoreGroupType
) => void }) {
  const { authUser, authUserLoading } = useAuthUser();

  return (
    <>
      {/* { user != null ?
        <Users firestoreUsers={props.groups.map((group) => group.users
          .find((firestoreUser: UserType) => firestoreUser.uid != user.uid))} firestoreUsersLoading={true}></Users>
        : ""
      } */}
      <ul>
        { authUserLoading || props.groupsLoading ? 
          "Loading..." :
          props.groups.map(group =>  
            <li key={group.id} 
              className={props.currentGroup && group.userIds.join(",") == props.currentGroup.userIds.join(",") ? styles.group__active : ""}
              onClick={event => props.onCurrentGroupSwitch?.(event, props.currentGroup, group)}
            >{group.userIds.find((userId) => userId != authUser?.uid)}</li>
          )
        }
      </ul>
    </>  
  )
}