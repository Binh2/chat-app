import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore"

export type FirestoreGroupType = {
  userIds: string[],
  id: string
}

export function queryDocumentSnapshotToFirestoreGroupType(queryDocumentSnapshot: QueryDocumentSnapshot<DocumentData>) {
  const documentData = queryDocumentSnapshot.data();
  return {
    userIds: documentData.userIds,
    id: queryDocumentSnapshot.id
  }
}
// export function documentDataToFirestoreGroup(documentData: DocumentData) {
//   return {
//     users: documentData.users
//   }
// }