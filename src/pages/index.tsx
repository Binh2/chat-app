import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

import logoImage from '/public/logo-with-text.svg';
import blob from '/public/blob.svg';

import LogInForm from '@/components/LogInForm'
import SignUpForm from "@/components/SignUpForm"

export default function Home() {
  return (
    <>
      <Head>
        <title>eoFriend</title>
        <meta name="description" content="A place where friends and foes can talk" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <Image src={logoImage} alt="App logo" className={styles.logo} />
        <Image src={blob} alt="Blob" className={styles.blob} />
        
        <div className={styles.blobTextContainer}>
          <p>
            <span className={styles.blobHeaderText}>A place to</span>
            <br />
            Connect and
            <br />
            diversify
          </p>
        </div>

        <div id="forms" className={styles.forms}>
          <LogInForm className={`${styles.form} ${styles.logInForm}`} />
          <SignUpForm className={`${styles.form} ${styles.signUpForm}`} />
        </div>
      </main>
    </>
  );
}
