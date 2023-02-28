import Head from 'next/head'
import Image from 'next/image'
import styles from '@/styles/Home.module.css'

import logoImage from '/public/logo-with-text.svg';
import blob from '/public/blob.svg';

import LogInForm from '@/components/LogInForm'

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

        <LogInForm />
      </main>
      {/* 
      <main className={styles.main}>
        <div className={styles.grid}>
          <a
            href="https://nextjs.org/learn?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Learn <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Learn about Next.js in an interactive course with&nbsp;quizzes!
            </p>
          </a>

          <a
            href="https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Templates <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Discover and deploy boilerplate example Next.js&nbsp;projects.
            </p>
          </a>

          <a
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
            className={styles.card}
            target="_blank"
            rel="noopener noreferrer"
          >
            <h2 className={inter.className}>
              Deploy <span>-&gt;</span>
            </h2>
            <p className={inter.className}>
              Instantly deploy your Next.js site to a shareable URL
              with&nbsp;Vercel.
            </p>
          </a>
        </div>
      </main> */}
    </>
  )
}
