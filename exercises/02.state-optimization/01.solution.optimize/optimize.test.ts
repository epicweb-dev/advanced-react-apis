import { expect, testStep, dtl } from '@epic-web/workshop-utils/test'
const { screen, fireEvent, waitFor } = dtl

import './index.tsx'

const originalConsoleLog = console.log
let consoleLogCalls: string[] = []

// Setup
console.log = (...args: any[]) => {
	consoleLogCalls.push(args.join(' '))
	originalConsoleLog(...args)
}

await testStep('The app renders initially', async () => {
	await screen.findByRole('searchbox', { name: /search/i })
})

const submitButton = await testStep(
	'The submit button is visible',
	async () => {
		return screen.findByRole('button', { name: /submit/i })
	},
)

await testStep(
	'Submitting without changes does not trigger a re-render',
	async () => {
		consoleLogCalls = [] // Reset log calls
		const initialRenderCount = consoleLogCalls.filter((log) =>
			log.includes('rerendering component for new query'),
		).length

		fireEvent.click(submitButton)

		await new Promise((resolve) => setTimeout(resolve, 50))

		const newRenderCount = consoleLogCalls.filter((log) =>
			log.includes('rerendering component for new query'),
		).length
		expect(newRenderCount).toBe(initialRenderCount)

		expect(consoleLogCalls).toContain('setting search params')
	},
)

await testStep(
	'Changing the query and submitting triggers a re-render',
	async () => {
		consoleLogCalls = [] // Reset log calls
		const searchInput = screen.getByRole('searchbox', { name: /search/i })
		const initialRenderCount = consoleLogCalls.filter((log) =>
			log.includes('rerendering component for new query'),
		).length

		fireEvent.change(searchInput, { target: { value: 'new query' } })
		fireEvent.click(submitButton)

		await waitFor(() => {
			const newRenderCount = consoleLogCalls.filter((log) =>
				log.includes('rerendering component for new query'),
			).length
			expect(newRenderCount).toBe(initialRenderCount + 1)
		})

		expect(consoleLogCalls).toContain('setting search params')
		expect(consoleLogCalls[consoleLogCalls.length - 1]).toBe(
			'rerendering component for new query new query',
		)
	},
)

// Teardown
console.log = originalConsoleLog
