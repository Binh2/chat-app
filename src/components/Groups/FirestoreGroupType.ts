import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore"

export type FirestoreGroupType = {
  messages: string[],
  users: string[],
  id: string
}

export function queryDocumentSnapshotToFirestoreGroupType(queryDocumentSnapshot: QueryDocumentSnapshot<DocumentData>) {
  const documentData = queryDocumentSnapshot.data();
  return {
    messages: documentData.messages,
    users: documentData.users,
    id: queryDocumentSnapshot.id
  }
}
// export function documentDataToFirestoreGroup(documentData: DocumentData) {
//   return {
//     users: documentData.users
//   }
// }