import { FirestoreMessageType } from "./FirestoreMessageType"


export type MessageType = {
  message: string,
  time: Date,
  isReceived: boolean,
  from: string,
}

export function toMessageType(data: FirestoreMessageType) {
  return {
    message: data.message,
    time: data.time.toDate(),
    isReceived: data.isReceived,
    from: data.from
  }
}