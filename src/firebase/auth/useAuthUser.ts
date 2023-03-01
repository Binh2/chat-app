import { useState, useEffect } from 'react'
import { getAuth, User } from 'firebase/auth';
import { useRouter } from 'next/router';

export default function useAuthUser() {
  const [ authUser, setAuthUser ] = useState<User | null>(null);
  const [ loading, setLoading ] = useState(true);
  const router = useRouter();

  const authStateChanged = (authState: User | null) => {
    if (!authState) {
      if (router.pathname != "/") router.push("/");
      setAuthUser(null)
      setLoading(false)
      return;
    }

    setLoading(true);
    setAuthUser(authState);    
    setLoading(false);
  };

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged(authStateChanged);
    return unsubscribe;
  }, []);

  return {
    authUser,
    authUserLoading: loading,
  };
}