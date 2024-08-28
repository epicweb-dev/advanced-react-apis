import { expect, testStep, dtl } from '@epic-web/workshop-utils/test'
const { screen, fireEvent } = dtl

import './index.tsx'

await testStep('The user can see the counter', async () => {
	const output = await screen.findByRole('status')
	expect(output).toHaveTextContent('0')
})

const incrementButton = await testStep(
	'The user can see the increment button',
	async () => {
		const result = await screen.findByRole('button', { name: '➡️' })
		return result
	},
)

const decrementButton = await testStep(
	'The user can see the decrement button',
	async () => {
		const result = await screen.findByRole('button', { name: '⬅️' })
		return result
	},
)

await testStep('The user can increment the counter', async () => {
	fireEvent.click(incrementButton)
	const output = await screen.findByRole('status')
	expect(output).toHaveTextContent('1')
})

await testStep('The user can decrement the counter', async () => {
	fireEvent.click(decrementButton)
	const output = await screen.findByRole('status')
	expect(output).toHaveTextContent('0')
})

const stepInput = await testStep(
	'The user can see the step input',
	async () => {
		const result = await screen.findByLabelText(/step/i)
		expect(result).toHaveValue(1)
		return result
	},
)

await testStep('The user can change the step value', async () => {
	fireEvent.change(stepInput, { target: { value: '5' } })
	expect(stepInput).toHaveValue(5)
})

await testStep(
	'Changing step value affects increment and decrement',
	async () => {
		fireEvent.click(incrementButton)
		let output = await screen.findByRole('status')
		expect(output).toHaveTextContent('5')

		fireEvent.click(decrementButton)
		output = await screen.findByRole('status')
		expect(output).toHaveTextContent('0')
	},
)
