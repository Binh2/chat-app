import Image from "next/image";

import logoImage from '/public/thirteen.svg';

import styles from "./Users.module.css";

import { UserType } from "@/components/Users/UserType";
import { SyntheticEvent } from "react";

export default function Users(props: { users: UserType[], usersLoading: boolean, 
onClickOnUser?: (event?: SyntheticEvent, user?: UserType) => void | undefined}) {
  const message = "hello";
  return (
    <>
      <ul>
        {props.users.map((user, index) => (<li key={index} className={styles.user} 
          onClick={event => props.onClickOnUser?.(event, user)}>
          <div className={styles.user_uid}>{user.id}</div>
          {
            user.photoUrl ? 
            <Image src={ user.photoUrl } alt="Profile pic" className={styles.user_pic}></Image> :
            <Image src={ logoImage } alt="Profile pic" className={styles.user_pic}></Image>
          }
          
          <div className={styles.user_name}>{user.displayName}</div>
          <div className={styles.user_message}>{message}</div>
        </li>))}
        { props.usersLoading && <li >Loading...</li> }
      </ul>
    </>
  )
}