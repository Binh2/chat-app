import Image from "next/image";

import logoImage from '/public/thirteen.svg';

import styles from "./Users.module.css";

import { FirestoreUser } from "@/components/Users/FirestoreUser";
import { useFirestoreUser } from "./useFirestoreUser";

export default function Users(props: { searchText?: string, searchField?: string}) {
  const message = "hello";
  const { firestoreUsers, firestoreUsersLoading } = useFirestoreUser();
  return (
    <>
      <ul>
        {firestoreUsers.map((firestoreUser, index) => (<li key={index} className={styles.user}>
          {
            firestoreUser.photoURL ? 
            <Image src={ firestoreUser.photoURL } alt="Profile pic" className={styles.user_pic}></Image> :
            <Image src={ logoImage } alt="Profile pic" className={styles.user_pic}></Image>
          }
          
          <div className={styles.user_name}>{firestoreUser.displayName}</div>
          <div className={styles.user_message}>{message}</div>
        </li>))}
        { firestoreUsersLoading && <li >Loading...</li> }
      </ul>
    </>
  )
}