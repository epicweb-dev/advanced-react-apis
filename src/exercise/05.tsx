// useImperativeHandle: scroll to top/bottom
// http://localhost:3000/isolated/exercise/05.tsx

import * as React from 'react'

type Message = {id: string; author: string; content: string}

// 🐨 wrap this in a React.forwardRef and accept `ref` as the second argument
function MessagesDisplay({messages}: {messages: Array<Message>}) {
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useLayoutEffect(() => {
    scrollToBottom()
  })

  // 💰 you're gonna want this as part of your imperative methods
  // function scrollToTop() {
  //   if (!containerRef.current) return
  //   containerRef.current.scrollTop = 0
  // }
  function scrollToBottom() {
    if (!containerRef.current) return
    containerRef.current.scrollTop = containerRef.current.scrollHeight
  }

  // 🐨 call useImperativeHandle here with your ref and a callback function
  // that returns an object with scrollToTop and scrollToBottom

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
}

function App() {
  const messageDisplayRef = React.useRef(null)
  const [messages, setMessages] = React.useState(allMessages.slice(0, 8))
  const addMessage = () =>
    messages.length < allMessages.length
      ? setMessages(allMessages.slice(0, messages.length + 1))
      : null
  const removeMessage = () =>
    messages.length > 0
      ? setMessages(allMessages.slice(0, messages.length - 1))
      : null

  const scrollToTop = () => messageDisplayRef.current?.scrollToTop()
  const scrollToBottom = () => messageDisplayRef.current?.scrollToBottom()

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
      {/* 🐨 add ref prop here */}
      <MessagesDisplay messages={messages} />
      <div>
        <button onClick={scrollToBottom}>scroll to bottom</button>
      </div>
    </div>
  )
}

export default App

const allMessages: Array<Message> = [
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
].map((m, i) => ({
  id: String(i),
  author: m.split(': ')[0],
  content: m.split(': ')[1],
}))
