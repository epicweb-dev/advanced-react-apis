import { useReducer, useState } from 'react'
import * as ReactDOM from 'react-dom/client'

type State = { count: number }
// 🦺 make it so the action can be a function which accepts State and returns Partial<State>
type Action = Partial<State>
const countReducer = (state: State, action: Action) => ({
	...state,
	// 🐨 if the action is a function, then call it with the state and spread the results,
	// otherwise, just spread the results (as it is now).
	...action,
})

function Counter({ initialCount = 0, step = 1 }) {
	const [state, setState] = useReducer(countReducer, {
		count: initialCount,
	})
	const { count } = state
	// 🐨 update these calls to use the callback form. Use the currentState given
	// to you by the callback form of setState when calculating the new state.
	const increment = () => setState({ count: count + step })
	const decrement = () => setState({ count: count - step })
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
						onChange={e => setStep(Number(e.currentTarget.value))}
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
