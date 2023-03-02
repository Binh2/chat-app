import { MessageType } from "./MessageType";

export function Messages(props: { messages: MessageType[], messagesLoading: boolean }) {
  return (
    <>
      { props.messagesLoading ? "Loading..." : 
        <ol>
          {props.messages.map((message, index) => (<li key={index}><p>{message.message}</p></li>))}
        </ol>
      }
    </>
  )
}