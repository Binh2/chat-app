import { createUserWithEmailAndPassword, getAuth, User } from 'firebase/auth';
import { useRouter } from 'next/router';
import { SyntheticEvent, useRef, useState } from 'react';
import styles from './LogInForm.module.css'
// import OtherLogInMethods from '../OtherLogInMethods'

export default function LogInForm() {
  const auth = getAuth();
  const usernameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const [ user, setUser ] = useState<User | null>(null);
  const router = useRouter();
  function submit(e: SyntheticEvent) {
    e.preventDefault();
    if (usernameInput.current != null && passwordInput.current != null) {
      const email = usernameInput.current.value;
      const password = passwordInput.current.value;
      
      console.log("hello");
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          setUser(userCredential.user);
          console.log(userCredential.user);
          if (usernameInput.current != null && passwordInput.current != null) {
            usernameInput.current.value = "";
            passwordInput.current.value = "";
          }
          router.push("/chat");
        })
        .catch((error) => {
          console.log(error.code);
          console.log(error.message);
          console.log("hello2");
        });
    }
  }
  
  return (
    <>
      <form className={styles.form} onSubmit={submit}>
        <label className={styles.label} htmlFor="login-username">Username</label>
        <div className={styles.inputContainer}>
          <input className={styles.input} ref={usernameInput}
            type="text" id="login-username" name="login_username"
            // pattern="[a-zA-Z0-9]{1,15}"
            title="Username must be number (0 to 9) or alphabets (a to z and A to Z)"></input>
        </div>
        
        <label className={styles.label} htmlFor="login-password">Password</label>
        <div className={styles.inputContainer}>
          <input className={styles.input} ref={passwordInput}
            type="password" id="login-password" name="login_password"></input>
        </div>
        <p className={styles.signUpText}>Don&lsquo;t have an account? {' '}
          <span className={styles.signUpButton}>
            Sign up
          </span>
        </p>
        <div className={styles.logInButtons}>
          <button className={styles.logInButton}>Log in</button>
          <p>or</p>
          <button className={`${styles.logInButton} ${styles.logInAsGuestButton}`}>Log in as guest</button>
          <p>or</p>
          {/* <button className={`${styles.logInButton} ${styles.logInAsGuestButton}`}>Other log in methods</button> */}
          {/* <OtherLogInMethods /> */}
        </div>
      </form>  
    </>
  )
}