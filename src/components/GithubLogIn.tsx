import { addNewUserWithGithub } from "@/firebase/auth/authUserHandlingFunctions";
import { useRouter } from "next/router";

export function GithubLogIn() {
  const router = useRouter();
  
  async function logInWithGithub() {
    await addNewUserWithGithub();
    router.push("/chat")
  }
  return (
    <button onClick={logInWithGithub}>Log in with Github</button>
  )
}