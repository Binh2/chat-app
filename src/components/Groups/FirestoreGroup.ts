import { DocumentData } from "firebase/firestore"
import { MessageType } from "../Messages/MessageType"
import { FirestoreUser } from "../Users/FirestoreUser"

export type FirestoreGroup = {
  messages: string[] | MessageType[],
  group: string[] | FirestoreUser[],
}
export function documentDataToFirestoreGroup(doc: DocumentData): FirestoreGroup {
  return {
    messages: doc.messages,
    group: doc.group
  }
}