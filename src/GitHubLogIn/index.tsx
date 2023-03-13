import { addNewUserWithGitHub } from "@/firebase/auth/authUserHandlingFunctions";
import { useRouter } from "next/router";

import Image from "next/image";
import GitHubLogo from "/public/github-logo.svg";
import styles from "./GitHubLogIn.module.css";

export function GitHubLogIn() {
  const router = useRouter();
  
  async function logInWithGitHub() {
    try {
      await addNewUserWithGitHub();
    } catch (error) {
      console.log(error);
      return;
    }
    router.push("/chat")
  }
  return (
    <>
      <button onClick={logInWithGitHub} className={`form__button form__button--blue-text ${styles.root}`}>
        <Image src={GitHubLogo} alt="GitHub's logo" className={styles.gitHubLogo} />
        <span>Log in with GitHub</span>
      </button>
    </>
  )
}