import { useAuthUserContext } from "@/firebase/auth/AuthUserContext";
import useAuthUser from "@/firebase/auth/useAuthUser";
import { SyntheticEvent, useEffect } from "react";
import { Message } from "../Messages/Message";
import styles from "./Groups.module.css";
import { GroupType } from "./GroupType";

export function Groups(props: { groups: GroupType[], groupsLoading: boolean, 
currentGroup: GroupType | null, onCurrentGroupChange?: (
  oldGroup: GroupType | null, 
  newGroup: GroupType,
  event?: SyntheticEvent, 
) => void }) {
  const { authUser, authUserLoading } = useAuthUserContext();

  function isSameGroups(group1: GroupType | null, group2: GroupType | null) {
    return group1 && group2 && group1.userIds.join(",") == group2.userIds.join(",");
  };

  const {groups, currentGroup, onCurrentGroupChange} = props;
  useEffect(() => {
    if (!currentGroup && groups.length > 0 && !isSameGroups(groups[0], currentGroup))
      onCurrentGroupChange?.(null, groups[0]);
  }, [groups, currentGroup, onCurrentGroupChange]);
  // console.log(groups[0]);

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
          >
            {/* <p>{group.userIds.find((userId) => userId != authUser?.uid)}</p> */}
            <p>{group.nickname}</p>
            <p>
              {/* {group.messages ? group.messages[0]?.from : ""}: {" "}
              {group.messages ? group.messages[0]?.message: ""} */}
            </p>
            <Message group={group} />
          </li>
        )}
        { authUserLoading || props.groupsLoading ? 
          "Loading..." :
          ""
        }
      </ul>
    </>  
  )
}