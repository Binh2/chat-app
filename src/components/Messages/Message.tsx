import { useAuthUserContext } from "@/firebase/auth/AuthUserContext";
import { FirestoreGroupType } from "../Groups/FirestoreGroupType";
import { useMessages } from "./useMessages";

export function Message(props: {group: FirestoreGroupType | null}) {
  const { messages, messagesLoading, setMessagesLoading } = useMessages(props.group, 1);
  const { authUser } = useAuthUserContext();
  if (messages.length < 1) return;
  const message = messages[0];

  return (
    <>
      <div>{message.from}: {message.message}</div>
    </>
  )
}