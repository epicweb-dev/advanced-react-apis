import { useSyncExternalStore } from 'react'
import * as ReactDOM from 'react-dom/client'
import { makeMediaQueryStore } from './narrow-media-query'

const narrowScreenStore = makeMediaQueryStore('(max-width: 600px)')

function NarrowScreenNotifier() {
	const isNarrow = useSyncExternalStore(
		narrowScreenStore.subscribe,
		narrowScreenStore.getSnapshot,
	)
	return isNarrow ? 'You are on a narrow screen' : 'You are on a wide screen'
}

function App() {
	return <NarrowScreenNotifier />
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
ReactDOM.createRoot(rootEl).render(<App />)
