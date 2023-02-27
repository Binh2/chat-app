import { DocumentData } from "firebase/firestore"

export type FirestoreGroupType = {
  messages: string[],
  group: string[],
}

export function documentDataToFirestoreGroup(doc: DocumentData): FirestoreGroupType {
  return {
    messages: doc.messages,
    group: doc.group
  }
}