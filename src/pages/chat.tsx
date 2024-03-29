import { collection, DocumentData, getFirestore, onSnapshot, QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Key, SyntheticEvent, useEffect } from "react";
import { useRef, useState } from "react";

import logoImage from '/public/logo-with-text.svg';

import { UsersFinderForm } from "@/components/Users/UsersFinderForm";
import useFirebaseAuth from "@/firebase/auth/useAuthUser";
import styles from '@/styles/Chat.module.css';
import { addUserToFirestore } from "@/components/Users/userHandlingFunctions";
import { useGroups } from "@/components/Groups/useGroups";
import { useMessages } from "@/components/Messages/useMessages";
import { Messages } from "@/components/Messages";
import { addMessageToFirestore } from "@/components/Messages/functions";
import { addGroupToFirestoreWithoutDup } from "@/components/Groups/functions";
import { Groups } from "@/components/Groups";
import { useCurrentGroup } from "@/components/Groups/useCurrentGroup";

export default function Chat() {
  const messageBox = useRef<HTMLInputElement>(null);
  const { authUser, authUserLoading } = useFirebaseAuth();
  const { groups, groupsLoading, setGroupsLoading } = useGroups();
  const { currentGroup, setCurrentGroup } = useCurrentGroup();
  const { messages, messagesLoading, setMessagesLoading } = useMessages(currentGroup, 10);

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
    addMessageToFirestore(currentGroup, messageBox.current.value ?? "");
    messageBox.current.value = ""
  }

  return (
    <>
      <Head>
      </Head>
      <main className={styles.main}>
        <div className={`${styles.contacts} scrollY`}>
          <Link href="/">
            <Image src={logoImage} alt="App logo" className={styles.logoImage} priority={true} />
          </Link>

          { authUserLoading ? <p>Loading...</p> : <p>{authUser?.email ?? "null"}</p>}
          { authUserLoading ? <p>Loading...</p> : <p>{authUser?.uid ?? "null"}</p>}

          <UsersFinderForm onClickOnUser={async (event, user) => {
            setGroupsLoading(true);
            await addGroupToFirestoreWithoutDup(user);
            setGroupsLoading(false);
          }}></UsersFinderForm>

          <button onClick={() => addUserToFirestore({
            id: "123",
            email: "mary@gmail.com",
            displayName: "Mary Curie",
            photoUrl: ""
          })}>Add fake user</button>
          {/* <Users users={users} usersLoading={usersLoading} 
            onClickOnUser={(event, user) => {addGroupToFirestoreWithoutDup(user?.id ?? "chat/index.tsx");}}></Users> */}
          Groups
          <Groups groups={groups} groupsLoading={groupsLoading} currentGroup={currentGroup}
            onCurrentGroupChange={(oldGroup, newGroup, event) => { 
              setMessagesLoading(true);
              setCurrentGroup(newGroup);
            }}></Groups>
        </div>

        <div className={styles.contact__header}>
          <p>{ authUserLoading ? <p>Loading...</p> : <p>{authUser?.displayName ?? "null"}</p>}</p>
        </div>
        <Messages group={currentGroup} messages={messages} messagesLoading={messagesLoading}></Messages>
        <form className={styles.messageBox} onSubmit={sendMessage}>
          <input className={styles.messageBox_input} type="text" placeholder="Word your thought"
            ref={messageBox}></input>
          <button className={styles.messageBox_sendButton}>Enter</button>
        </form>
      </main>
    </>
  );
}