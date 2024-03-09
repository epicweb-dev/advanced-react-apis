import * as ReactDOM from 'react-dom/client'

// 💰 this is the mediaQuery we're going to be matching against:
// const mediaQuery = '(max-width: 600px)'

// 🐨 make a getSnapshot function here that returns whether the media query matches

// 🐨 make a subscribe function here which takes a callback function
// 🐨 create a matchQueryList variable here with the mediaQuery from above (📜 https://developer.mozilla.org/en-US/docs/Web/API/MediaQueryList)
// 🐨 add a change listener to the mediaQueryList which calls the callback
// 🐨 return a cleanup function whihc removes the change event listener for the callback

function NarrowScreenNotifier() {
	// 🐨 assign this to useSyncExternalStore with the subscribe and getSnapshot functions above
	const isNarrow = false
	return isNarrow ? 'You are on a narrow screen' : 'You are on a wide screen'
}

function App() {
	return <NarrowScreenNotifier />
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
ReactDOM.createRoot(rootEl).render(<App />)
