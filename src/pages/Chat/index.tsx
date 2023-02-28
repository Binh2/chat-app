import { collection, DocumentData, getFirestore, onSnapshot, QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Key, SyntheticEvent, useEffect } from "react";
import { useRef, useState } from "react";

import logoImage from '/public/logo-with-text.svg';

import { useFirestoreUser } from "@/components/Users/useFirestoreUser";
import { UsersFinder } from "@/components/Users/UsersFinder";
import useFirebaseAuth from "@/firebase/auth/useFirebaseAuth";
import Users from "@/components/Users";
import styles from '@/styles/Chat.module.css';
import { addUserToFirestore } from "@/components/Users/userHandlingFunctions";
import { useGroups } from "@/components/Groups/useGroups";
import { useMessages } from "@/components/Messages/useMessages";
import { Messages } from "@/components/Messages";
import { addMessageToFirestore } from "@/components/Messages/messageHandlingFunctions";
import { addGroupToFirestore } from "@/components/Groups/groupHandlingFunctions";
import { Groups } from "@/components/Groups";

export default function Chat() {
  const { messages } = useMessages(10);
  const messageBox = useRef<HTMLInputElement>(null);
  const { user, loading } = useFirebaseAuth();
  const { firestoreUsers, firestoreUsersLoading } = useFirestoreUser("", "");
  const { groups } = useGroups();

  useEffect(() => onSnapshot(collection(getFirestore(), "messages"), 
    (collection: QuerySnapshot<DocumentData>) => {
      collection.docs.map((doc) => {
        console.log(doc.ref.path);
      });
    }
  ), []);

  function sendMessage(event: SyntheticEvent) {
    event.preventDefault();
    if (messageBox.current == null) return;
    addMessageToFirestore(messageBox.current.value ?? "");
    messageBox.current.value = ""
  }

  return (
    <>
      <Head>
      </Head>
      <main className={styles.main}>
        <div className={styles.contacts}>
          <Link href="/">
            <Image src={logoImage} alt="App logo" className={styles.logoImage} priority={true} />
          </Link>

          { loading ? <p>Loading...</p> : <p>{user?.email ?? "null"}</p>}
          { loading ? <p>Loading...</p> : <p>{user?.uid ?? "null"}</p>}

          <UsersFinder></UsersFinder>

          <button onClick={() => addUserToFirestore({
            uid: "123",
            email: "mary@gmail.com",
            displayName: "Mary Curie",
            photoURL: ""
          })}>Add fake user</button>
          <Users firestoreUsers={firestoreUsers} firestoreUsersLoading={firestoreUsersLoading} ></Users>
          Groups
          <Groups groups={groups}></Groups>
        </div>

        <div className={styles.contact__header}>
          <p>Mary Doe</p>
        </div>
        <Messages messages={messages}></Messages>
        <form className={styles.messageBox} onSubmit={sendMessage}>
          <input className={styles.messageBox_input} type="text" placeholder="Word your thought"
            ref={messageBox}></input>
          <button className={styles.messageBox_sendButton}>Enter</button>
        </form>
      </main>
    </>
  );
}