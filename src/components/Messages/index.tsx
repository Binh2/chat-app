import { MessageType } from "./MessageType";
import styles from "./Messages.module.css";
import { useAuthUserContext } from "@/firebase/auth/AuthUserContext";

export function Messages(props: { messages: MessageType[], messagesLoading: boolean }) {
  const { authUser } = useAuthUserContext();
  console.log(props.messages.map(message => message.from));
  return (
    <>
      { props.messagesLoading || !authUser ? "Loading..." : 
        <ol>
          {props.messages.map((message, index) => (
            <li key={index} className={authUser.uid == message.from ? styles.yourMessage: styles.othersMessage}>
              <p>{authUser.uid == message.from ? "You": message.from}</p>
              <p>{message.message}</p>
              <p>{message.time.toUTCString()}</p>
            </li>
          ))}
        </ol>
      }
    </>
  )
}