import { useFirestoreMessages } from "./useFirestoreMessages";

export function Messages() {
  const { messages, addMessage } = useFirestoreMessages();

  return (
    <>
      <ol>
        {messages.map((message, index) => (<li key={index}><p>{message.message}</p></li>))}
      </ol>
    </>
  )
}