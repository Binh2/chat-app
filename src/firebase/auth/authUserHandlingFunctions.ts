import { addUserToFirestore, addUserToFirestoreWithoutDup } from "@/components/Users/userHandlingFunctions";
import { userToUserType } from "@/components/Users/UserType";
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, signInAnonymously, signInWithPopup } from "firebase/auth";

export async function addNewUserWithEmailAndPassword(email: string, password: string) {
  const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
  addUserToFirestore(userToUserType(userCredential.user));
  return userCredential;
}
export async function addNewUserWithGithub() {
  const provider = new GithubAuthProvider();
  const userCredential = await signInWithPopup(getAuth(), provider)
  .then((userCredential) => {
    // This gives you a GitHub Access Token. You can use it to access the GitHub API.
    const credential = GithubAuthProvider.credentialFromResult(userCredential);
    const token = credential?.accessToken;

    // IdP data available using getAdditionalUserInfo(result)
    return userCredential;
  })
  .then(userCredential => {
    addUserToFirestoreWithoutDup(userToUserType(userCredential.user))
  })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // The email of the user's account used.
  //   const email = error.customData.email;
  //   // The AuthCredential type that was used.
  //   const credential = GithubAuthProvider.credentialFromError(error);
  //   // ...
  // });
  
  return userCredential;
}
export async function addNewUserAnonymously() {
  const userCredential = await signInAnonymously(getAuth());
  addUserToFirestoreWithoutDup(userToUserType(userCredential.user));
  return userCredential;
}