import { useReducer, useState } from 'react'
import * as ReactDOM from 'react-dom/client'

type State = { count: number }
type Action =
	| { type: 'increment'; step: number }
	| { type: 'decrement'; step: number }
function countReducer(state: State, action: Action) {
	const { type, step } = action
	switch (type) {
		case 'increment': {
			return {
				...state,
				count: state.count + step,
			}
		}
		case 'decrement': {
			return {
				...state,
				count: state.count - step,
			}
		}
	}
}

function Counter({ initialCount = 0, step = 1 }) {
	const [state, dispatch] = useReducer(countReducer, {
		count: initialCount,
	})
	const { count } = state
	const increment = () => dispatch({ type: 'increment', step })
	const decrement = () => dispatch({ type: 'decrement', step })
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
