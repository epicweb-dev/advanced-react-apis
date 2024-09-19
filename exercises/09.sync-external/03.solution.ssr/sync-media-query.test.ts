import { expect, testStep, dtl } from '@epic-web/workshop-utils/test'
const { screen } = dtl

import './index.tsx'

let mediaQueryCallbacks: Array<(e: { matches: boolean }) => void> = []
let currentMatches = false

const originalMatchMedia = window.matchMedia
// @ts-expect-error - meh it's free javascript
window.matchMedia = (query: string) => ({
	...originalMatchMedia(query),
	matches: currentMatches,
	media: query,
	addEventListener: (
		event: string,
		callback: (e: { matches: boolean }) => void,
	) => {
		mediaQueryCallbacks.push(callback)
	},
	removeEventListener: (
		event: string,
		callback: (e: { matches: boolean }) => void,
	) => {
		mediaQueryCallbacks = mediaQueryCallbacks.filter((cb) => cb !== callback)
	},
})

function triggerMediaQueryChange(matches: boolean) {
	currentMatches = matches
	mediaQueryCallbacks.forEach((callback) => callback({ matches }))
}

await testStep(
	'NarrowScreenNotifier renders wide screen message initially',
	async () => {
		const message = await screen.findByText('You are on a wide screen')
		expect(message).toBeTruthy()
	},
)

await testStep(
	'NarrowScreenNotifier updates when media query changes to narrow',
	async () => {
		triggerMediaQueryChange(true)
		const message = await screen.findByText('You are on a narrow screen')
		expect(message).toBeTruthy()
	},
)

await testStep(
	'NarrowScreenNotifier updates when media query changes back to wide',
	async () => {
		triggerMediaQueryChange(false)
		const message = await screen.findByText('You are on a wide screen')
		expect(message).toBeTruthy()
	},
)

await testStep(
	'NarrowScreenNotifier removes event listener on unmount',
	async () => {
		const initialCallbackCount = mediaQueryCallbacks.length
		// @ts-expect-error 🚨 this is for the test
		window.__epicReactRoot.unmount()
		expect(mediaQueryCallbacks.length).toBe(initialCallbackCount - 1)
	},
)

// Cleanup
window.matchMedia = originalMatchMedia
