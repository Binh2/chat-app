import { DocumentData, Timestamp } from "firebase/firestore"

export type FirestoreMessageType = {
  message: string,
  time: Timestamp,
  isReceived: boolean,
  from: string,
}
export type MessageType = {
  message: string,
  time: Date,
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
export function toMessageType(data: FirestoreMessageType) {
  return {
    message: data.message,
    time: data.time.toDate(),
    isReceived: data.isReceived,
    from: data.from
  }
}