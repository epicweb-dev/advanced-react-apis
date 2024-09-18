import { expect, testStep, dtl } from '@epic-web/workshop-utils/test'
const { screen, fireEvent } = dtl

import './index.tsx'

await testStep('The portal is rendered to the body', async () => {
	const [heartButton] = await screen.findAllByText('🤍')
	heartButton.focus()

	const tooltip = await screen.findByText('Add favorite')
	expect(tooltip).toBeTruthy()
	expect(
		tooltip.closest('li'),
		'🚨 The tooltip is still rendered inside the li',
	).toBe(null)
})
