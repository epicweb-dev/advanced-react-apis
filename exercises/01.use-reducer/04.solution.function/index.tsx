import { useReducer, useState } from 'react'
import * as ReactDOM from 'react-dom/client'

type State = { count: number }
type Action = Partial<State> | ((currentState: State) => Partial<State>)
const countReducer = (state: State, action: Action) => ({
	...state,
	...(typeof action === 'function' ? action(state) : action),
})

function Counter({ initialCount = 0, step = 1 }) {
	const [state, setState] = useReducer(countReducer, {
		count: initialCount,
	})
	const { count } = state
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
