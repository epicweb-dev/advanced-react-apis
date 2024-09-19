import { expect, testStep, dtl } from '@epic-web/workshop-utils/test'
const { screen, fireEvent, waitFor } = dtl

import './index.tsx'

await testStep('The portal is rendered to the body', async () => {
	const [heartButton] = await screen.findAllByText('🤍')

	const tooltipPromise = waitFor(
		() => {
			const tooltip = screen.getByText('Add favorite')
			return { tooltip, position: tooltip.getBoundingClientRect() }
		},
		{ interval: 0 },
	)

	fireEvent.focusIn(heartButton)

	const { tooltip, position } = await tooltipPromise

	await new Promise((resolve) => setTimeout(resolve, 250))
	const newPosition = tooltip.getBoundingClientRect()

	expect(
		{ x: newPosition.x, y: newPosition.y },
		'🚨 The tooltip is not correctly positioned initially. Use useLayoutEffect to prevent the incorrect position from being rendered.',
	).toEqual({
		x: position.x,
		y: position.y,
	})
})
