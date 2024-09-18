import { expect, testStep } from '@epic-web/workshop-utils/test'
import { useReducer } from 'react'
import { createRoot } from 'react-dom/client'
import { useSearchParams } from './index'

let setSearchParams: ReturnType<typeof useSearchParams>[1]
let rerender: () => void
function TestComponent() {
	const reducerTuple = useReducer((state) => state + 1, 0)
	const searchParamsTuple = useSearchParams()
	setSearchParams = searchParamsTuple[1]
	rerender = reducerTuple[1]
	return null
}

await testStep('setSearchParams is memoized', async () => {
	const container = document.createElement('div')
	const root = createRoot(container)
	root.render(<TestComponent />)
	await new Promise((resolve) => setTimeout(resolve, 100))
	const firstSetSearchParams = setSearchParams
	rerender()
	await new Promise((resolve) => setTimeout(resolve, 100))
	expect(firstSetSearchParams).toBe(setSearchParams)
})
