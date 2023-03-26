import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";
import { MessageType, messageTypeConverter } from "../Messages/MessageType";
import { UserType, userTypeConverter } from "../Users/UserType"

export type GroupType = {
  id: string,
  userIds: string[],
  users: UserType[],
  nickname: string,
}

export const groupTypeConverter = {
  toFirestore: (group: GroupType) => {
    return {
      userIds: group.userIds,
      users: group.users.map(user => userTypeConverter.toFirestore(user)),
      // messages: group.messages.map(message => messageTypeConverter.toFirestore(message)),
      nickname: group.users.map(user => user.displayName).join(", "),
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
    const data = snapshot.data();
    return {
      id: snapshot.id,
      userIds: data.userIds,
      users: data.users,
      nickname: data.nickname
    };
  }
};