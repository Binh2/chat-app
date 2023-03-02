import { DocumentData, QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore"

export type FirestoreGroupType = {
  userIds: string[],
  id: string
}

// export function queryDocumentSnapshotToFirestoreGroupType(queryDocumentSnapshot: QueryDocumentSnapshot<DocumentData>) {
//   const documentData = queryDocumentSnapshot.data();
//   return {
//     userIds: documentData.userIds,
//     id: queryDocumentSnapshot.id
//   }
// }

export const firestoreGroupTypeConverter = {
  toFirestore: (group: FirestoreGroupType) => {
    return {
      userIds: group.userIds,
    };
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
    const data = snapshot.data(options);
    return {
      userIds: data.userIds,
      id: snapshot.id,
    };
  }
};