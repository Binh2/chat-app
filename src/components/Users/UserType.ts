import { User } from "firebase/auth"
import { DocumentData } from "firebase/firestore";

export type UserType = {
  id: string,
  email: string,
  displayName: string,
  photoURL: string, 
}
export function userToUserType(user: User) {
  return (({uid, email, displayName, photoURL}) => ({
    id: uid, 
    email: email ?? "", 
    displayName: displayName ?? "", 
    photoURL: photoURL ?? ""
  }))(user);
}
export function documentDataToUserType(doc: DocumentData) {
  return (({id, email, displayName, photoURL}) => ({id, email, displayName, photoURL}))(doc);
}
