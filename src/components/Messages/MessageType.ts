import { FirestoreMessageType } from "./FirestoreMessageType"


export type MessageType = {
  message: string,
  time: Date,
  isReceived: boolean,
  from: string,
  id: string,
}

export function firestoreMessageTypeToMessageType(firestoreMessageType: FirestoreMessageType) {
  return {
    message: firestoreMessageType.message,
    time: firestoreMessageType.time.toDate(),
    isReceived: firestoreMessageType.isReceived,
    from: firestoreMessageType.from,
    id: firestoreMessageType.id,
  }
}