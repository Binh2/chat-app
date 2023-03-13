import { MessageType } from "./MessageType";
import styles from "./Messages.module.scss";
import { useAuthUserContext } from "@/firebase/auth/AuthUserContext";

export function Messages(props: { messages: MessageType[], messagesLoading: boolean}) {
  const { authUser } = useAuthUserContext();
  console.log(props.messages.map(message => message.from));
  return (
    <>
      { props.messagesLoading || !authUser ? "Loading..." : 
        <ol>
          {props.messages.map((message, index) => (
            <li key={index} className={`${authUser.uid == message.from ? styles.rightMessageContainer: styles.leftMessageContainer} ${styles.messageContainer}`}>
              <div className={styles.messageWrapper}>
                <div className={styles.name}>{authUser.uid == message.from ? "You": message.from}</div>
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