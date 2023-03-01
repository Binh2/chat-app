import { DocumentData, QueryDocumentSnapshot, Timestamp } from "firebase/firestore"

export type FirestoreMessageType = {
  message: string,
  time: Timestamp,
  isReceived: boolean,
  from: string,
  id: string
}

export function queryDocumentSnapshotToFirestoreMessageType(queryDocumentSnapshot: QueryDocumentSnapshot<DocumentData>) {
  const documentData = queryDocumentSnapshot.data();
  return {
    message: documentData.message,
    time: documentData.time,
    isReceived: documentData.isReceived,
    from: documentData.from,
    id: queryDocumentSnapshot.id
  }
}