import { expect, testStep, dtl } from '@epic-web/workshop-utils/test'
const { screen, fireEvent, waitFor } = dtl

import './index.tsx'

await testStep(
	'Scrollable component handles scroll to top and bottom',
	async () => {
		// Find the scroll buttons
		const scrollTopButton = await screen.findByText(/Scroll to Top/i)
		const scrollBottomButton = await screen.findByText(/Scroll to Bottom/i)

		// Find the scrollable container
		const scrollableContainer = screen.getByRole('log')

		// Scroll to bottom
		fireEvent.click(scrollBottomButton)
		await waitFor(() => {
			expect(
				scrollableContainer.scrollTop,
				'🚨 Scrollable container should be scrolled to the bottom when the scroll to bottom button is clicked',
			).toBe(
				scrollableContainer.scrollHeight - scrollableContainer.clientHeight,
			)
		})

		// Scroll to top
		fireEvent.click(scrollTopButton)
		await waitFor(() => {
			expect(
				scrollableContainer.scrollTop,
				'🚨 Scrollable container should be scrolled to the top when the scroll to top button is clicked',
			).toBe(0)
		})
	},
)
