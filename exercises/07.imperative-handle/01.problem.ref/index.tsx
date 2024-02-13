import { useLayoutEffect, useRef, useState } from 'react'
import * as ReactDOM from 'react-dom/client'
import { allMessages } from './messages'

// 💰 this'll be handy
// type ScrollableImperativeAPI = {
// 	scrollToTop: () => void
// 	scrollToBottom: () => void
// }

// 🐨 wrap this in a forwardRef and accept `ref` as the second argument
function Scrollable({ children }: { children: React.ReactNode }) {
	const containerRef = useRef<HTMLDivElement>(null)

	useLayoutEffect(() => {
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
			{children}
		</div>
	)
}

function App() {
	// 🐨 create a scrollableRef with useRef that is a MessagesImperativeAPI type
	const [messages, setMessages] = useState(allMessages.slice(0, 8))
	function addMessage() {
		if (messages.length < allMessages.length) {
			setMessages(allMessages.slice(0, messages.length + 1))
		}
	}
	function removeMessage() {
		if (messages.length > 0) {
			setMessages(allMessages.slice(0, messages.length - 1))
		}
	}

	// 🐨 make this function call the scrollToTop function on the ref
	const scrollToTop = () => {}

	// 🐨 make this function call the scrollToBottom function on the ref
	const scrollToBottom = () => {}

	return (
		<div className="messaging-app">
			<div style={{ display: 'flex', justifyContent: 'space-between' }}>
				<button onClick={addMessage}>add message</button>
				<button onClick={removeMessage}>remove message</button>
			</div>
			<hr />
			<div>
				<button onClick={scrollToTop}>scroll to top</button>
			</div>
			{/* 🐨 add ref prop here */}
			<Scrollable>
				{messages.map((message, index, array) => (
					<div key={message.id}>
						<strong>{message.author}</strong>: <span>{message.content}</span>
						{array.length - 1 === index ? null : <hr />}
					</div>
				))}
			</Scrollable>
			<div>
				<button onClick={scrollToBottom}>scroll to bottom</button>
			</div>
		</div>
	)
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
ReactDOM.createRoot(rootEl).render(<App />)
