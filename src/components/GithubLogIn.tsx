import { getAuth, signInWithPopup, GithubAuthProvider } from "firebase/auth";
import { useRouter } from "next/router";

export function GithubLogIn() {
  const auth = getAuth();
  const provider = new GithubAuthProvider();
  const router = useRouter();
  function logInWithGithub() {
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(result);
      const token = credential?.accessToken;

      // The signed-in user info.
      const user = result.user;
      // IdP data available using getAdditionalUserInfo(result)
      // ...
      console.log(user);
      router.push("/chat")
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);
      // ...
    });
  };
  return (
    <button onClick={logInWithGithub}>Log in with Github</button>
  )
}