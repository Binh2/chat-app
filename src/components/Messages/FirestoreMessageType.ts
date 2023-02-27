import { DocumentData, Timestamp } from "firebase/firestore"

export type FirestoreMessageType = {
  message: string,
  time: Timestamp,
  isReceived: boolean,
  from: string,
}

export function toFirestoreMessageType(data: DocumentData) {
  return {
    message: data.message,
    time: data.time,
    isReceived: data.isReceived,
    from: data.from
  }
}