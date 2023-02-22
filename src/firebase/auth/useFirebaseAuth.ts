import { useState, useEffect } from 'react'
import { getAuth, User } from 'firebase/auth';


export default function useFirebaseAuth() {
  const [ user, setUser ] = useState<User | null>(null);
  const [ loading, setLoading ] = useState(true);

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


  const clear = () => {
    setUser(null);
    setLoading(true);
  };

  useEffect(() => {
    const unsubscribe = getAuth().onAuthStateChanged(authStateChanged);
    return () => unsubscribe();
  }, []);

  return {
    user,
    loading,
  };
}