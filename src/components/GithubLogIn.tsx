import { addNewUserWithGithub } from "@/firebase/auth/authUserHandlingFunctions";
import { useRouter } from "next/router";

export function GithubLogIn() {
  const router = useRouter();
  
  async function logInWithGithub() {
    try {
      await addNewUserWithGithub();
    } catch {
      return;
    }
    router.push("/chat")
  }
  return (
    <button onClick={logInWithGithub}>Log in with Github</button>
  )
}