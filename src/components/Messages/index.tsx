import { MessageType } from "./MessageType";
import { useMessages } from "./useMessages";

export function Messages(props: { messages: MessageType[]}) {
  return (
    <>
      <ol>
        {props.messages.map((message, index) => (<li key={index}><p>{message.message}</p></li>))}
      </ol>
    </>
  )
}