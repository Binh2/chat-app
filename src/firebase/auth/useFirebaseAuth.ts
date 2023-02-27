import { useState, useEffect } from 'react'
import { getAuth, User, createUserWithEmailAndPassword, GithubAuthProvider, signInWithPopup, signInAnonymously } from 'firebase/auth';

import { useFirestoreUser } from "@/components/Users/useFirestoreUser";
import { userToFirestoreUser } from '../../components/Users/UserType';

export default function useFirebaseAuth() {
  const [ user, setUser ] = useState<User | null>(null);
  const [ loading, setLoading ] = useState(true);
  const { addUserToFirestore, addUserToFirestoreWithoutDup } = useFirestoreUser();

  const authStateChanged = async (authState: User | null) => {
    if (!authState) {
      setUser(null)
      setLoading(false)
      return;
    }

    setLoading(true);
    setUser(authState);    
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged(authStateChanged);
    return unsubscribe;
  }, []);

  async function addNewUserWithEmailAndPassword(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
    addUserToFirestore(userToFirestoreUser(userCredential.user));
    return userCredential;
  }
  async function addNewUserWithGithub() {
    const provider = new GithubAuthProvider();
    const userCredential = await signInWithPopup(getAuth(), provider)
    .then((userCredential) => {
      // This gives you a GitHub Access Token. You can use it to access the GitHub API.
      const credential = GithubAuthProvider.credentialFromResult(userCredential);
      const token = credential?.accessToken;

      // IdP data available using getAdditionalUserInfo(result)
      return userCredential;
    })
    addUserToFirestoreWithoutDup(userToFirestoreUser(userCredential.user))
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GithubAuthProvider.credentialFromError(error);
      // ...
    });
    return userCredential;
  }
  async function addNewUserAnonymously() {
    const userCredential = await signInAnonymously(getAuth());
    addUserToFirestore(userToFirestoreUser(userCredential.user));
    return userCredential;
  }

  return {
    user,
    loading,
    addNewUserWithEmailAndPassword,
    addNewUserWithGithub,
    addNewUserAnonymously
  };
}