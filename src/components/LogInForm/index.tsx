import { addNewUserAnonymously, addNewUserWithEmailAndPassword, logInWithEmailAndPassword } from '@/firebase/auth/authUserHandlingFunctions';
import { scrollToSmoothly } from '@/styles/reusables/scrollHandlingFunctions';
import { useRouter } from 'next/router';
import { SyntheticEvent, useRef, useState } from 'react';
import { GitHubLogIn } from '../../GitHubLogIn';
import styles from './LogInForm.module.css'
// import OtherLogInMethods from '../OtherLogInMethods'

export default function LogInForm(props: {
  className?: string
}) {
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const router = useRouter();
  function logIn(e: SyntheticEvent) {
    e.preventDefault();
    if (emailInput.current != null && passwordInput.current != null) {
      const email = emailInput.current.value;
      const password = passwordInput.current.value;
      
      logInWithEmailAndPassword(email, password)
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
  function goToSignUpForm() {
    const formsElement = document.getElementById("forms");
    scrollToSmoothly(formsElement, formsElement?.scrollWidth ? formsElement?.scrollWidth / 2 : 500, 500, false);
  }  
  return (
    <>
      <div className={props.className} id="logInForm">
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
            <span className={styles.goToSignUpFormButton} onClick={goToSignUpForm}>
              Sign up
            </span>
          </p>
          <div className={styles.logInButtons}>
            <button className={`form__button`}>Log in</button>
          </div>
        </form>
        <div className={styles.logInButtons}>
          <p>or</p>
          <button className={`form__button form__button--blue-text`} onClick={logInAsGuest}>Log in as guest</button>
          <p>or</p>
          <GitHubLogIn></GitHubLogIn>
        </div>
      </div>
    </>
  )
}