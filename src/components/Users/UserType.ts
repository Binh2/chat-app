import { User } from "firebase/auth";
import { QueryDocumentSnapshot, SnapshotOptions } from "firebase/firestore";

export type UserType = {
  id: string,
  email: string,
  displayName: string,
  photoUrl: string, 
}

export function authUserToUserType(user: User | null) {
  if (!user) return null;
  return {
    id: user.uid,
    email: user.email ?? "",
    displayName: user.displayName ?? "",
    photoUrl: user.photoURL ?? "",
  }
}

export const userTypeConverter = {
  toFirestore: (user: UserType) => {
    return {
      id: user.id,
      email: user.email,
      displayName: user.displayName,
      photoUrl: user.photoUrl,
    }
  },
  fromFirestore: (snapshot: QueryDocumentSnapshot, options: SnapshotOptions) => {
    const data = snapshot.data(options);
    return {
      id: data.id,
      email: data.email,
      displayName: data.displayName,
      photoUrl: data.photoUrl,
    };
  }
};