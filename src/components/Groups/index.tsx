import { useAuthUserContext } from "@/firebase/auth/AuthUserContext";
import { SyntheticEvent, useEffect } from "react";
import { Message } from "../Messages/Message";
import styles from "./Groups.module.scss";
import { GroupType } from "./GroupType";
import placeholderImage from "/public/profile-pic-placeholder.svg";
import Image from "next/image";

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

  return (
    <>
      <ul>
        { props.groups.map(group =>
          <li key={group.id} 
            className={ `${isSameGroups(props.currentGroup, group) ? styles.group__active : ""} ${styles.group}`}
            onClick={event => !isSameGroups(props.currentGroup, group) && 
              props.onCurrentGroupChange?.(props.currentGroup, group, event)
            }
          >
            <div className={styles.group_photos}>
              {group.users.map((user, index) => (
                <Image key={index} alt="Profile pic" src={user.photoUrl ? user.photoUrl : placeholderImage} className={`${styles.group_photo} ${styles["group_photo" + index.toString()]}`} />
              ))}
            </div>
            <p className={styles.group_nickname}>{group.nickname}</p>
            <Message group={group} className={styles.group_message} />
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