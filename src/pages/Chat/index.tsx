import Head from "next/head";
import Image from "next/image";

import logoImage from '/public/logo-with-text.svg';
import styles from '@/styles/Chat.module.css';

// import { useAuthState } from "react-firebase-hooks/auth";
import { firebaseApp } from "@/firebase";
import { getAuth, onAuthStateChanged, User } from "firebase/auth";
import { Key, useEffect } from "react";
import { useRef, useState } from "react";
import { addMessage, getAllMessages, subscribeToMessages } from "@/firebase/firestore/manage-messages";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import useFirebaseAuth from "@/firebase/auth/useFirebaseAuth";

export default function Chat() {
  // const [user, loading, error] = useAuthState(getAuth(firebaseApp));
  // console.log("Loading:", loading, "|", "Current user:", user);
  // console.log(getAuth());
  const [user, setUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Array<String>>([]);
  const [serverMessages, setServerMessages] = useState<Array<DocumentData>>([]);
  const messageBox = useRef<HTMLInputElement>(null);
  const { authUser, loading } = useFirebaseAuth();

  // console.log(authUser);
  useEffect(() => {
    return onAuthStateChanged(getAuth(firebaseApp), function(user) {
      console.log(user);
      setUser(user);
    });
  })
  useEffect(() => {
    getAllMessages().then((docs: Array<DocumentData>) => {
      setServerMessages(docs);
    })
  }, []);
  useEffect(() => {
    return subscribeToMessages((collection: any) => {
      setServerMessages(collection.docs);
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
          <Image src={logoImage} alt="App logo" className={styles.logoImage} priority />

          <p>{user?.displayName ?? 'null'}</p>
          { loading ? <p>Loading...</p> : <p>{authUser?.email ?? "null"}</p>}

          <form>
            <label htmlFor="search-by-drop-down">Search by</label>
            {' '}
            <select id="search-by-drop-down" name="search-by">
              <option value="name">Name</option>
              <option value="gender">Gender</option>
              <option value="age">Age</option>
              <option value="email">Email</option>
              <option value="phone">Phone number</option>
            </select>
            <input className={styles.search} type="text"></input>
          </form>
          <div className={`${styles.contact} ${styles.contact__first}`}>
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
          </div>
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