import { createContext, useContext } from 'react'
import useFirebaseAuth from './useFirebaseAuth';
import { FormattedUser } from './types';

type FirebaseAuthContext = {
  authUser: FormattedUser | null,
  loading: boolean
};
const firebaseAuthContext = createContext<FirebaseAuthContext>({
  authUser: null,
  loading: true,
});

export function AuthUserProvider({ children }: any) {
  const auth = useFirebaseAuth();
  return <firebaseAuthContext.Provider value={auth}>{children}</firebaseAuthContext.Provider>;
}
// custom hook to use the firebaseAuthContext and access authUser and loading
export const useAuth = () => useContext(firebaseAuthContext);