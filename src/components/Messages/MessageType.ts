import { DocumentData, Timestamp } from "firebase/firestore"

export type MessageType = {
  message: string,
  time: Timestamp,
  isReceived: boolean,
  from: string,
}
export function toMessageType(data: DocumentData) {
  return {
    message: data.message,
    time: data.time,
    isReceived: data.isReceived,
    from: data.from
  }
}