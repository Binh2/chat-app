import { MessageType } from "./MessageType";

export function Messages(props: { messages: MessageType[] }) {
  return (
    <>
      <ol>
        {props.messages.map((message, index) => (<li key={index}><p>{message.message}</p></li>))}
      </ol>
    </>
  )
}