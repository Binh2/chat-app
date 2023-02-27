import { DocumentData } from "firebase/firestore"
import { FirestoreMessage } from "../Messages/MessageType"
import { FirestoreUser } from "../Users/FirestoreUser"

export type FirestoreGroup = {
  messages: string[] | FirestoreMessage[],
  group: string[] | FirestoreUser[],
}
export function documentDataToFirestoreGroup(doc: DocumentData): FirestoreGroup {
  return {
    messages: doc.messages,
    group: doc.group
  }
}