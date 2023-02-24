import { useState, useEffect } from 'react'
import { getAuth, User, createUserWithEmailAndPassword } from 'firebase/auth';

import { useFirestoreUser } from "@/components/Users/useFirestoreUser";
import { userToFirestoreUser } from '../../components/Users/FirestoreUser';

export default function useFirebaseAuth() {
  const [ user, setUser ] = useState<User | null>(null);
  const [ loading, setLoading ] = useState(true);
  const { addUserToFirestore } = useFirestoreUser();

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
    return () => unsubscribe();
  }, []);

  async function addNewUserWithEmailAndPassword(email: string, password: string) {
    const userCredential = await createUserWithEmailAndPassword(getAuth(), email, password);
    addUserToFirestore(userToFirestoreUser(userCredential.user));
    return userCredential;
  }

  return {
    user,
    loading,
    addNewUserWithEmailAndPassword,
  };
}