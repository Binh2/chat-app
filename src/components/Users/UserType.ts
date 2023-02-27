import { User } from "firebase/auth"
import { DocumentData } from "firebase/firestore";

export type UserType = {
  uid: string,
  email: string,
  displayName: string,
  photoURL: string, 
}
export function userToUserType(user: User) {
  return (({uid, email, displayName, photoURL}) => ({
    uid, 
    email: email ?? "", 
    displayName: displayName ?? "", 
    photoURL: photoURL ?? ""
  }))(user);
}
export function documentDataToUserType(doc: DocumentData) {
  return (({uid, email, displayName, photoURL}) => ({uid, email, displayName, photoURL}))(doc);
}
