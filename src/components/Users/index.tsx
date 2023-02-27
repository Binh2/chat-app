import Image from "next/image";

import logoImage from '/public/thirteen.svg';

import styles from "./Users.module.css";

import { UserType } from "@/components/Users/UserType";
import { useFirestoreUser } from "./useFirestoreUser";
import { useFirestoreGroups } from "../Groups/useFirestoreGroups";

export default function Users(props: { firestoreUsers: UserType[], firestoreUsersLoading: boolean }) {
  const message = "hello";
  const { firestoreGroups, addFirestoreGroup } = useFirestoreGroups();
  return (
    <>
      <ul>
        {props.firestoreUsers.map((firestoreUser, index) => (<li key={index} className={styles.user} 
          onClick={(event) => addFirestoreGroup(firestoreUser.uid)}>
          <div className={styles.user_uid}>{firestoreUser.uid}</div>
          {
            firestoreUser.photoURL ? 
            <Image src={ firestoreUser.photoURL } alt="Profile pic" className={styles.user_pic}></Image> :
            <Image src={ logoImage } alt="Profile pic" className={styles.user_pic}></Image>
          }
          
          <div className={styles.user_name}>{firestoreUser.displayName}</div>
          <div className={styles.user_message}>{message}</div>
        </li>))}
        { props.firestoreUsersLoading && <li >Loading...</li> }
      </ul>
    </>
  )
}