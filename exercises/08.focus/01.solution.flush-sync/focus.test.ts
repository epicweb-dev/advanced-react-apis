import { expect, testStep, dtl } from '@epic-web/workshop-utils/test'
const { screen, fireEvent, waitFor } = dtl

import './index.tsx'

await testStep('EditableText component renders', async () => {
	const editButton = await screen.findByRole('button', {
		name: /Edit project name/i,
	})
	expect(editButton).toBeTruthy()
	return editButton
})

await testStep(
	'Clicking edit button focuses input and selects text',
	async () => {
		const editButton = await screen.findByRole('button', {
			name: /Edit project name/i,
		})
		fireEvent.click(editButton)

		const input = screen.getByRole('textbox', { name: /Edit project name/i })
		await waitFor(() => {
			expect(
				input,
				'🚨 Input should be focused after clicking edit button',
			).toHaveFocus()
			if (!(input instanceof HTMLInputElement)) {
				throw new Error('Input is not an HTMLInputElement')
			}
			expect(
				input.selectionStart,
				'🚨 Input text should be fully selected',
			).toBe(0)
			expect(input.selectionEnd, '🚨 Input text should be fully selected').toBe(
				input.value.length,
			)
		})
		return input
	},
)

await testStep('Submitting form focuses button', async () => {
	const input = await screen.findByRole('textbox', {
		name: /Edit project name/i,
	})
	fireEvent.keyDown(input, { key: 'Enter' })
	fireEvent.submit(input.closest('form')!)

	await waitFor(() => {
		const newButton = screen.getByRole('button', { name: /Edit project name/i })
		expect(
			newButton,
			'🚨 Button should be focused after submitting',
		).toHaveFocus()
	})
})

await testStep('Canceling edit focuses button', async () => {
	const editButton = screen.getByRole('button', { name: /Edit project name/i })
	fireEvent.click(editButton)

	const input = screen.getByRole('textbox', { name: /Edit project name/i })
	fireEvent.keyDown(input, { key: 'Escape' })

	await waitFor(() => {
		const newButton = screen.getByRole('button', { name: /Edit project name/i })
		expect(
			newButton,
			'🚨 Button should be focused after canceling',
		).toHaveFocus()
	})
})

await testStep('Blurring input focuses button', async () => {
	const editButton = screen.getByRole('button', { name: /Edit project name/i })
	fireEvent.click(editButton)

	const input = screen.getByRole('textbox', { name: /Edit project name/i })
	fireEvent.blur(input)
	input.blur()

	await waitFor(() => {
		const newButton = screen.getByRole('button', { name: /Edit project name/i })
		expect(
			newButton,
			'🚨 Button should be focused after blurring input',
		).toHaveFocus()
	})
})
