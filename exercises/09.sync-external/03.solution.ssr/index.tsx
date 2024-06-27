import { Suspense, useSyncExternalStore } from 'react'
import * as ReactDOM from 'react-dom/client'

export function makeMediaQueryStore(mediaQuery: string) {
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

	return function useMediaQuery() {
		return useSyncExternalStore(subscribe, getSnapshot)
	}
}

const useNarrowMediaQuery = makeMediaQueryStore('(max-width: 600px)')

function NarrowScreenNotifier() {
	const isNarrow = useNarrowMediaQuery()
	return isNarrow ? 'You are on a narrow screen' : 'You are on a wide screen'
}

function App() {
	return (
		<div>
			<div>This is your narrow screen state:</div>
			<Suspense fallback="">
				<NarrowScreenNotifier />
			</Suspense>
		</div>
	)
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
// 🦉 here's how we pretend we're server-rendering
rootEl.innerHTML = (await import('react-dom/server')).renderToString(<App />)

// 🦉 here's how we simulate a delay in hydrating with client-side js
await new Promise((resolve) => setTimeout(resolve, 1000))

ReactDOM.hydrateRoot(rootEl, <App />, {
	onRecoverableError(error) {
		if (String(error).includes('Missing getServerSnapshot')) return

		console.error(error)
	},
})
