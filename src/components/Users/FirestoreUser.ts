import { User } from "firebase/auth"
import { DocumentData } from "firebase/firestore";

export function userToFirestoreUser(user: User) {
  return (({uid, email, displayName, photoURL}) => ({
    uid, 
    email: email ?? "", 
    displayName: displayName ?? "", 
    photoURL: photoURL ?? ""
  }))(user);
}
export function documentDataToFirestoreUser(doc: DocumentData) {
  return (({uid, email, displayName, photoURL}) => ({uid, email, displayName, photoURL}))(doc);
}
export type FirestoreUser = {
  uid: string,
  email: string,
  displayName: string,
  photoURL: string, 
}