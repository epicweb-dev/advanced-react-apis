// useImperativeHandle: scroll to top/bottom
// http://localhost:3000/isolated/final-ts/05.tsx

import * as React from 'react'

interface Message {
  id: number
  author: string
  content: string
}

interface MessagesDisplayProps {
  messages: Message[]
}
interface MessagesDisplayRef {
  scrollToTop: () => void
  scrollToBottom: () => void
}
const MessagesDisplay = React.forwardRef<
  MessagesDisplayRef,
  MessagesDisplayProps
>(function MessagesDisplay({messages}, ref) {
  const containerRef = React.useRef<HTMLDivElement>(null!)
  React.useLayoutEffect(() => {
    scrollToBottom()
  })
  function scrollToTop() {
    containerRef.current.scrollTop = 0
  }
  function scrollToBottom() {
    containerRef.current.scrollTop = containerRef.current.scrollHeight
  }
  React.useImperativeHandle(ref, () => ({
    scrollToTop,
    scrollToBottom,
  }))

  return (
    <div ref={containerRef} role="log">
      {messages.map((message, index, array) => (
        <div key={message.id}>
          <strong>{message.author}</strong>: <span>{message.content}</span>
          {array.length - 1 === index ? null : <hr />}
        </div>
      ))}
    </div>
  )
})

function App(): JSX.Element {
  const messageDisplayRef = React.useRef<MessagesDisplayRef>(null)
  const [messages, setMessages] = React.useState<Message[]>(allMessages.slice(0, 8))
  const addMessage = (): void =>
    messages.length < allMessages.length
      ? setMessages(allMessages.slice(0, messages.length + 1))
      : undefined
  const removeMessage = (): void =>
    messages.length > 0
      ? setMessages(allMessages.slice(0, messages.length - 1))
      : undefined

  const scrollToTop = (): void => messageDisplayRef.current?.scrollToTop()
  const scrollToBottom = (): void => messageDisplayRef.current?.scrollToBottom()

  return (
    <div className="messaging-app">
      <div style={{display: 'flex', justifyContent: 'space-between'}}>
        <button onClick={addMessage}>add message</button>
        <button onClick={removeMessage}>remove message</button>
      </div>
      <hr />
      <div>
        <button onClick={scrollToTop}>scroll to top</button>
      </div>
      <MessagesDisplay ref={messageDisplayRef} messages={messages} />
      <div>
        <button onClick={scrollToBottom}>scroll to bottom</button>
      </div>
    </div>
  )
}

export default App

const allMessages: Message[] = [
  `Leia: Aren't you a little short to be a stormtrooper?`,
  `Luke: What? Oh... the uniform. I'm Luke Skywalker. I'm here to rescue you.`,
  `Leia: You're who?`,
  `Luke: I'm here to rescue you. I've got your R2 unit. I'm here with Ben Kenobi.`,
  `Leia: Ben Kenobi is here! Where is he?`,
  `Luke: Come on!`,
  `Luke: Will you forget it? I already tried it. It's magnetically sealed!`,
  `Leia: Put that thing away! You're going to get us all killed.`,
  `Han: Absolutely, Your Worship. Look, I had everything under control until you led us down here. You know, it's not going to take them long to figure out what happened to us.`,
  `Leia: It could be worse...`,
  `Han: It's worse.`,
  `Luke: There's something alive in here!`,
  `Han: That's your imagination.`,
  `Luke: Something just moves past my leg! Look! Did you see that?`,
  `Han: What?`,
  `Luke: Help!`,
  `Han: Luke! Luke! Luke!`,
  `Leia: Luke!`,
  `Leia: Luke, Luke, grab a hold of this.`,
  `Luke: Blast it, will you! My gun's jammed.`,
  `Han: Where?`,
  `Luke: Anywhere! Oh!!`,
  `Han: Luke! Luke!`,
  `Leia: Grab him!`,
  `Leia: What happened?`,
  `Luke: I don't know, it just let go of me and disappeared...`,
  `Han: I've got a very bad feeling about this.`,
  `Luke: The walls are moving!`,
  `Leia: Don't just stand there. Try to brace it with something.`,
  `Luke: Wait a minute!`,
  `Luke: Threepio! Come in Threepio! Threepio! Where could he be?`,
].map((m, i) => ({id: i, author: m.split(': ')[0], content: m.split(': ')[1]}))
