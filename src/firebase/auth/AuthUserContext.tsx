import { User } from "firebase/auth";
import { createContext, PropsWithChildren, useContext } from "react";
import useAuthUser from "./useAuthUser";

export const AuthUserContext = createContext<{
  authUser: User | null,
  authUserLoading: boolean,
}>({
  authUser: null,
  authUserLoading: true,
});

export function AuthUserProvider(props: PropsWithChildren) {
  return (
    <AuthUserContext.Provider value={useAuthUser()}>
      {props.children}
    </AuthUserContext.Provider>
  )
}

export const useAuthUserContext = () => useContext(AuthUserContext);