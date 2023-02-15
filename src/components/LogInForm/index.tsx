import styles from './LogInForm.module.css'
// import OtherLogInMethods from '../OtherLogInMethods'

export default function LogInForm() {
  return (
    <>
      <form className={styles.form} action="/api/form" method="post">
        <label className={styles.label} htmlFor="login-username">Username</label>
        <div className={styles.inputContainer}>
          <input className={styles.input} 
            type="text" id="login-username" name="login_username"
            pattern="[a-zA-Z0-9]{1,15}"
            title="Username must be number (0 to 9) or alphabets (a to z and A to Z)"></input>
        </div>
        
        <label className={styles.label} htmlFor="login-password">Password</label>
        <div className={styles.inputContainer}>
          <input className={styles.input} type="password" id="login-password" name="login_password"></input>
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