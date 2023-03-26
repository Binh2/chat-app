import { UserType } from "@/components/Users/UserType";
import { User } from "firebase/auth";

export function getUserName(user: UserType | null | undefined) : string {
  return user ? user.displayName ?? user.id.substring(0, 3) + "..." : "";
}
export function getAuthUserName(user: User | null) : string {
  return user ? user.displayName ?? user.uid.substring(0, 3) + "..." : "";
}