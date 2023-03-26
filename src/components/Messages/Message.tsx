import { useAuthUserContext } from "@/firebase/auth/AuthUserContext";
import { GroupType } from "../Groups/GroupType";
import { useMessages } from "./useMessages";

export function Message(props: {group: GroupType | null, className?: string}) {
  const { messages, messagesLoading, setMessagesLoading } = useMessages(props.group, 1);
  const { authUser } = useAuthUserContext();
  if (messages.length < 1) return <></>;
  const message = messages[0];
  const fromUsers = props.group?.users.filter(user => user.id == message.from);
  if (!fromUsers || fromUsers.length < 1) return <></>;
  const fromUser = fromUsers[0];
  return (
    <>
      <div className={`${props.className ?? ""}`}>{fromUser.displayName}: {message.message}</div>
    </>
  )
}