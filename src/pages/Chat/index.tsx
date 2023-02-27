import { DocumentData, QueryDocumentSnapshot, QuerySnapshot } from "firebase/firestore";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import { Key, useEffect } from "react";
import { useRef, useState } from "react";

import logoImage from '/public/logo-with-text.svg';

import { addMessage, getAllMessages, subscribeToMessages } from "@/components/Messages/useMessages";
import { useFirestoreUser } from "@/components/Users/useFirestoreUser";
import { UsersFinder } from "@/components/Users/UsersFinder";
import useFirebaseAuth from "@/firebase/auth/useFirebaseAuth";
import Users from "@/components/Users";
import styles from '@/styles/Chat.module.css';

export default function Chat() {
  const [messages, setMessages] = useState<Array<String>>([]);
  const [serverMessages, setServerMessages] = useState<Array<DocumentData>>([]);
  const messageBox = useRef<HTMLInputElement>(null);
  const { user, loading } = useFirebaseAuth();
  const { firestoreUsers, firestoreUsersLoading, addUserToFirestore } = useFirestoreUser("", "");

  useEffect(() => {
    return subscribeToMessages((collection: QuerySnapshot<DocumentData>) => {
      setServerMessages(collection.docs);
      collection.docs.map((doc) => {
        console.log(doc.ref.path)
      })
    });
  }, []);

  function sendMessage(e: any): void {
    e.preventDefault();
    if (messageBox.current != null) {
      setMessages([...messages, messageBox.current.value]);
      addMessage(messageBox.current.value);
      messageBox.current.value = "";
    }
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

          {/* <div className={`${styles.contact} ${styles.contact__first}`}>
            <p>Mary Doe</p>
            <p>Hi</p>
          </div>
          <div className={styles.contact}>
            <p>Mary Doe</p>
            <p>Hi</p>
          </div>
          <div className={styles.contact}>
            <p>Mary Doe</p>
            <p>Hi</p>
          </div> */}
          <Users firestoreUsers={firestoreUsers} firestoreUsersLoading={firestoreUsersLoading}></Users>
        </div>

        <div className={styles.contact__header}>
          <p>Mary Doe</p>
        </div>
        <ol className={styles.messages}>
          Client-side messages
          { messages.map((message: String, index: Key) => (<li key={index}>{message}</li>))}
        </ol>
        <ol className={styles.serverMessages}>
          Server-side messages
          { serverMessages.map((doc) => (<li key={doc.id}>{doc.data().message}</li>)) }
          {/* { serverMessages.forEach((doc, index) => (<li key={index}>{doc}</li>)) } */}
          {/* { serverMessages.map((message: String, index: Key) => (<li key={index}>{message}</li>))} */}
        </ol>
        <form className={styles.messageBox} onSubmit={sendMessage}>
          <input className={styles.messageBox_input} type="text" placeholder="Word your thought"
            ref={messageBox}></input>
          <button className={styles.messageBox_sendButton}>Enter</button>
        </form>
      </main>
    </>
  );
}