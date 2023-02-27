import useFirebaseAuth from "@/firebase/auth/useFirebaseAuth";
import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";

export function GithubLogIn() {
  const router = useRouter();
  const { addNewUserWithGithub } = useFirebaseAuth()
  
  async function logInWithGithub() {
    await addNewUserWithGithub();
    router.push("/chat")
  }
  return (
    <button onClick={logInWithGithub}>Log in with Github</button>
  )
}