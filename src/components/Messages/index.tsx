import { MessageType } from "./MessageType";
import styles from "./Messages.module.scss";
import { useAuthUserContext } from "@/firebase/auth/AuthUserContext";
import { GroupType } from "../Groups/GroupType";
import { getUserName } from "@/common";

export function Messages(props: { group: GroupType | null, messages: MessageType[], messagesLoading: boolean}) {
  const { authUser } = useAuthUserContext();

  return (
    <>
      { props.messagesLoading || !authUser ? "Loading..." : 
        <ol className="scrollY">
          {props.messages.map((message, index) => (
            <li key={message.id} className={`${authUser.uid == message.from ? styles.rightMessageContainer: styles.leftMessageContainer} ${styles.messageContainer}`}>
              <div className={styles.messageWrapper}>
                <div className={styles.name}>{authUser.uid == message.from ? "You": 
                  getUserName(props.group ? props.group.users.find(user => user.id == message.from) : null) ?? message.from}
                </div>
                <div className={styles.message}>{message.message}</div>
              </div>
              <div className={styles.date}>{message.time.toDateString()}</div>
            </li>
          ))}
        </ol>
      }
    </>
  )
}