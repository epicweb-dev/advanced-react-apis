import { useReducer, useState } from 'react'
import * as ReactDOM from 'react-dom/client'

type State = { count: number }
// 🐨 make it so the action is one of two objects:
// - a type string with the value 'increment' and a step number with the value of the step
// - a type string with the value 'decrement' and a step number with the value of the step
type Action = Partial<State> | ((currentState: State) => Partial<State>)
// 🐨 update the countReducer to handle the new action type
// 💯 handle situations where the action's type is neither increment nor decrement
const countReducer = (state: State, action: Action) => ({
	...state,
	...(typeof action === 'function' ? action(state) : action),
})

function Counter({ initialCount = 0, step = 1 }) {
	// 🐨 rename "setState" to "dispatch"
	const [state, setState] = useReducer(countReducer, {
		count: initialCount,
	})
	const { count } = state
	// 🐨 the logic has now been moved back to the reducer, update these to pass
	// the appropriate action object to the dispatch function
	const increment = () =>
		setState((currentState) => ({ count: currentState.count + step }))
	const decrement = () =>
		setState((currentState) => ({ count: currentState.count - step }))
	return (
		<div className="counter">
			<output>{count}</output>
			<div>
				<button onClick={decrement}>⬅️</button>
				<button onClick={increment}>➡️</button>
			</div>
		</div>
	)
}

function App() {
	const [step, setStep] = useState(1)

	return (
		<div className="app">
			<h1>Counter:</h1>
			<form>
				<div>
					<label htmlFor="step-input">Step</label>
					<input
						id="step-input"
						type="number"
						value={step}
						onChange={(e) => setStep(Number(e.currentTarget.value))}
					/>
				</div>
			</form>
			<Counter step={step} />
		</div>
	)
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
ReactDOM.createRoot(rootEl).render(<App />)
