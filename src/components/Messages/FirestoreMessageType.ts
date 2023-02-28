import { DocumentData, QueryDocumentSnapshot, Timestamp } from "firebase/firestore"

export type FirestoreMessageType = {
  message: string,
  time: Timestamp,
  isReceived: boolean,
  from: string,
  id: string
}

export function queryDocumentSnapshotToFirestoreMessageType(queryDocumentSnapshot: QueryDocumentSnapshot<DocumentData>) {
  return {
    message: queryDocumentSnapshot.data.message,
    time: queryDocumentSnapshot.data.time,
    isReceived: queryDocumentSnapshot.data.isReceived,
    from: queryDocumentSnapshot.data.from,
    id: queryDocumentSnapshot.id
  }
}