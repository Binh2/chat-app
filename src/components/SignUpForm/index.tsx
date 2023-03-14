import { addNewUserWithEmailAndPassword } from '@/firebase/auth/authUserHandlingFunctions';
import { scrollToSmoothly } from '@/styles/reusables/scrollHandlingFunctions';
import { useRouter } from 'next/router';
import { SyntheticEvent, useRef, useState } from 'react';
import styles from './SignUpForm.module.css'

export default function SignUpForm(props: {
  className?: string,
}) {
  const emailInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const confirmPasswordInput = useRef<HTMLInputElement>(null);
  const router = useRouter();
  function signUp(e: SyntheticEvent) {
    e.preventDefault();
    if (emailInput.current != null && passwordInput.current != null && confirmPasswordInput.current != null) {
      const email = emailInput.current.value;
      const password = passwordInput.current.value;
      const confirmPassword = confirmPasswordInput.current.value;
      
      if (password != confirmPassword) return;
      addNewUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        console.log(userCredential.user);
        if (emailInput.current != null && passwordInput.current != null && confirmPasswordInput.current != null) {
          emailInput.current.value = "";
          passwordInput.current.value = "";
          confirmPasswordInput.current.value = "";
        }
        router.push("/chat");
      })
      .catch((error) => {
        alert(error.message);
        console.log(error.code);
        console.log(error.message);
      });
    }
  }
  
  function goToLogInForm() {
    const formsElem = document.getElementById("forms");
    scrollToSmoothly(formsElem, 0, 500, false);
  }

  return (
    <>
      <div className={props.className} id="signUpForm">
        <button className={styles.goToLogInFormButton} onClick={goToLogInForm}>&lt;</button>
        <form className={styles.form} onSubmit={signUp}>
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

          <label className={styles.label} htmlFor="login-confirm-password">Confirm password</label>
          <div className={styles.inputContainer}>
            <input className={styles.input} ref={confirmPasswordInput}
              type="password" id="login-password" required 
              // pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}"
              // title="Must contain at least one number and one uppercase and lowercase letter, and at least 8 or more characters"
            ></input>
          </div>
          <button className={`form__button`}>Sign up</button>
        </form>
      </div>
    </>
  )
}