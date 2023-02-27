import { useMessages } from "./useMessages";

export function Messages() {
  const { messages, addMessageToFirestore } = useMessages();

  return (
    <>
      <ol>
        {messages.map((message, index) => (<li key={index}><p>{message.message}</p></li>))}
      </ol>
    </>
  )
}