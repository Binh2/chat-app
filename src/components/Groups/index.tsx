import useAuthUser from "@/firebase/auth/useAuthUser";
import { SyntheticEvent, useEffect } from "react";
import { FirestoreGroupType } from "./FirestoreGroupType";
import styles from "./Groups.module.css";

export function Groups(props: { groups: FirestoreGroupType[], groupsLoading: boolean, 
currentGroup: FirestoreGroupType | null, onCurrentGroupSwitch?: (
  oldGroup: FirestoreGroupType | null, 
  newGroup: FirestoreGroupType,
  event?: SyntheticEvent, 
) => void }) {
  const { authUser, authUserLoading } = useAuthUser();

  function isSameGroups(group1: FirestoreGroupType | null, group2: FirestoreGroupType | null) {
    return group1 && group2 && group1.userIds.join(",") == group2.userIds.join(",");
  };
  useEffect(() => {
    if (props.groups.length == 1 && !isSameGroups(props.groups[0], props.currentGroup))
      props.onCurrentGroupSwitch?.(null, props.groups[0]);
  }, [props])

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
              className={ isSameGroups(props.currentGroup, group) ? styles.group__active : ""}
              onClick={event => props.onCurrentGroupSwitch?.(props.currentGroup, group, event)}
            >{group.userIds.find((userId) => userId != authUser?.uid)}</li>
          )
        }
      </ul>
    </>  
  )
}