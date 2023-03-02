import { useAuthUserContext } from "@/firebase/auth/AuthUserContext";
import useAuthUser from "@/firebase/auth/useAuthUser";
import { SyntheticEvent, useEffect } from "react";
import { FirestoreGroupType } from "./FirestoreGroupType";
import styles from "./Groups.module.css";

export function Groups(props: { groups: FirestoreGroupType[], groupsLoading: boolean, 
currentGroup: FirestoreGroupType | null, onCurrentGroupChange?: (
  oldGroup: FirestoreGroupType | null, 
  newGroup: FirestoreGroupType,
  event?: SyntheticEvent, 
) => void }) {
  const { authUser, authUserLoading } = useAuthUserContext();

  function isSameGroups(group1: FirestoreGroupType | null, group2: FirestoreGroupType | null) {
    return group1 && group2 && group1.userIds.join(",") == group2.userIds.join(",");
  };

  const {groups, currentGroup, onCurrentGroupChange} = props;
  useEffect(() => {
    if (!currentGroup && groups.length > 0 && !isSameGroups(groups[0], currentGroup))
      onCurrentGroupChange?.(null, groups[0]);
  }, [groups, currentGroup, onCurrentGroupChange]);

  return (
    <>
      {/* { user != null ?
        <Users firestoreUsers={props.groups.map((group) => group.users
          .find((firestoreUser: UserType) => firestoreUser.uid != user.uid))} firestoreUsersLoading={true}></Users>
        : ""
      } */}
      <ul>
        { props.groups.map(group =>  
          <li key={group.id} 
            className={ isSameGroups(props.currentGroup, group) ? styles.group__active : ""}
            onClick={event => !isSameGroups(props.currentGroup, group) && 
              props.onCurrentGroupChange?.(props.currentGroup, group, event)
            }
          >{group.userIds.find((userId) => userId != authUser?.uid)}</li>
        )}
        { authUserLoading || props.groupsLoading ? 
          "Loading..." :
          ""
        }
      </ul>
    </>  
  )
}