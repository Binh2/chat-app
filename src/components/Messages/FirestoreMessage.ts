import { Timestamp } from "firebase/firestore"

export type FirestoreMessage = {
  message: string,
  time: Timestamp,
  isReceived: boolean,
  from: string,
}
export type FirestoreGroup = {
  messages: FirestoreMessage[],
  group: string[],
}