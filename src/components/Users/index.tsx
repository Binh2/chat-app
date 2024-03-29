import Image from "next/image";

import placeholderImage from '/public/profile-pic-placeholder.svg';

import styles from "./Users.module.css";

import { UserType } from "@/components/Users/UserType";
import { SyntheticEvent } from "react";

export default function Users(props: { users: UserType[], usersLoading: boolean, 
onClickOnUser?: (event?: SyntheticEvent, user?: UserType) => void | undefined}) {
  return (
    <>
      <ul>
        {props.users.map((user, index) => (<li key={index} className={styles.user} 
          onClick={event => props.onClickOnUser?.(event, user)}>
          <div className={styles.user_uid}>{user.id}</div>
          <Image src={ user.photoUrl ? user.photoUrl : placeholderImage } alt="Profile pic" className={styles.user_pic}></Image> :
          
          <div className={styles.user_name}>{user.displayName}</div>
        </li>))}
        { props.usersLoading && "Loading..." }
      </ul>
    </>
  )
}