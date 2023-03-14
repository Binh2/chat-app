import { addUserToFirestore, addUserToFirestoreWithoutDup } from "@/components/Users/userHandlingFunctions";
import { authUserToUserType } from "@/components/Users/UserType";
import { createUserWithEmailAndPassword, getAuth, GithubAuthProvider, signInAnonymously, signInWithPopup, signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDoc, getDocs, getFirestore, query, where } from "firebase/firestore";

export async function logInWithEmailAndPassword(email: string, password: string) {
  // const users = await getDocs(query(collection(getFirestore(), "users"), where("email", "==", email)));
  // if (users.docs.length < 1) return;
  const userCredential = await signInWithEmailAndPassword(getAuth(), email, password);
  return userCredential;
}
export async function addNewUserWithEmailAndPassword(email: string, password: string) {
  const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
  addUserToFirestore(authUserToUserType(userCredential.user));
  return userCredential;
}
export async function addNewUserWithGitHub() {
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
    addUserToFirestoreWithoutDup(authUserToUserType(userCredential.user))
  })
  // .catch((error) => {
  //   const errorCode = error.code;
  //   const errorMessage = error.message;
  //   // The email of the user's account used.
  //   const email = error.customData.email;
  //   // The AuthCredential type that was used.
  //   const credential = GitHubAuthProvider.credentialFromError(error);
  //   // ...
  // });
  
  return userCredential;
}
export async function addNewUserAnonymously() {
  const userCredential = await signInAnonymously(getAuth());
  addUserToFirestoreWithoutDup(authUserToUserType(userCredential.user));
  return userCredential;
}