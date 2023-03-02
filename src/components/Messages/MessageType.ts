import { QueryDocumentSnapshot, SnapshotOptions, Timestamp } from "firebase/firestore";

export type MessageType = {
  message: string,
  time: Date,
  isReceived: boolean,
  from: string,
  id: string,
}

export const messageTypeConverter = {
  toFirestore: (message: MessageType) => {
    return {
      message: message.message,
      time: Timestamp.fromDate(message.time),
      from: message.from,
    }
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
    const data = snapshot.data();
    return {
      message: data.message,
      time: data.time.toDate(),
      isReceived: true,
      from: data.from,
      id: snapshot.id
    }
  }
};