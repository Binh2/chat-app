import { DocumentData } from "firebase/firestore"
import { MessageType } from "../Messages/MessageType"
import { UserType } from "../Users/UserType"

export type GroupType = {
  messages: string[] | MessageType[],
  group: string[] | UserType[],
}