import { addNewUserAnonymously, addNewUserWithEmailAndPassword } from '@/firebase/auth/authUserHandlingFunctions';
import { useRouter } from 'next/router';
import { SyntheticEvent, useRef, useState } from 'react';
import { GithubLogIn } from '../GithubLogIn';
import styles from './LogInForm.module.css'
// import OtherLogInMethods from '../OtherLogInMethods'

export default function LogInForm() {
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const router = useRouter();
  function logIn(e: SyntheticEvent) {
    e.preventDefault();
    if (emailInput.current != null && passwordInput.current != null) {
      const email = emailInput.current.value;
      const password = passwordInput.current.value;
      
      addNewUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        if (emailInput.current != null && passwordInput.current != null) {
          emailInput.current.value = "";
          passwordInput.current.value = "";
        }
        router.push("/chat");
      })
      .catch((error) => {
        console.log(error.code);
        console.log(error.message);
      });
    }
  }
  async function logInAsGuest() {
    await addNewUserAnonymously();
    router.push("/chat");
  }
  
  return (
    <>
      <div>
        <form className={styles.form} onSubmit={logIn}>
          <label className={styles.label} htmlFor="login-email">Email</label>
          <div className={styles.inputContainer}>
            <input className={styles.input} ref={emailInput}
              type="email" id="login-email" required
              pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
            ></input>
          </div>
          
          <label className={styles.label} htmlFor="login-password">Password</label>
          <div className={styles.inputContainer}>
            <input className={styles.input} ref={passwordInput}
              type="password" id="login-password" required 
              // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              // title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            ></input>
          </div>
          <p className={styles.signUpText}>Don&lsquo;t have an account? {' '}
            <span className={styles.signUpButton}>
              Sign up
            </span>
          </p>
          <div className={styles.logInButtons}>
            <button className={styles.logInButton}>Log in</button>
          </div>
        </form>
        <div className={styles.logInButtons}>
          <p>or</p>
          <button className={`${styles.logInButton} ${styles.logInAsGuestButton}`} onClick={logInAsGuest}>Log in as guest</button>
          <p>or</p>
          {/* <button className={`${styles.logInButton} ${styles.logInAsGuestButton}`}>Other log in methods</button> */}
          {/* <OtherLogInMethods /> */}
          <GithubLogIn></GithubLogIn>
        </div>
      </div>
    </>
  )
}