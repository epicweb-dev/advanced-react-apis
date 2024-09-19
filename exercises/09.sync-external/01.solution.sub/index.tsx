import { useSyncExternalStore } from 'react'
import * as ReactDOM from 'react-dom/client'

const mediaQuery = '(max-width: 600px)'
function getSnapshot() {
	return window.matchMedia(mediaQuery).matches
}

function subscribe(callback: () => void) {
	const mediaQueryList = window.matchMedia(mediaQuery)
	mediaQueryList.addEventListener('change', callback)
	return () => {
		mediaQueryList.removeEventListener('change', callback)
	}
}

function NarrowScreenNotifier() {
	const isNarrow = useSyncExternalStore(subscribe, getSnapshot)
	return isNarrow ? 'You are on a narrow screen' : 'You are on a wide screen'
}

function App() {
	return <NarrowScreenNotifier />
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
const root = ReactDOM.createRoot(rootEl)
root.render(<App />)

// @ts-expect-error 🚨 this is for the test
window.__epicReactRoot = root
