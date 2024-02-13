import { useReducer, useState } from 'react'
import * as ReactDOM from 'react-dom/client'

type State = { count: number }
type Action = State
const countReducer = (state: State, action: Action) => ({ ...state, ...action })

function Counter({ initialCount = 0, step = 1 }) {
	const [state, setState] = useReducer(countReducer, {
		count: initialCount,
	})
	const { count } = state
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
	const [initialCount, setInitialCount] = useState(0)
	const [step, setStep] = useState(1)

	return (
		<div className="app">
			<h1>Counter:</h1>
			<form>
				<div>
					<label htmlFor="initial-count-input">Initial Count</label>
					<input
						id="initial-count-input"
						type="number"
						value={initialCount}
						// 🦉 notice when you change the initial count, it doesn't affect
						// the counter because it's literally the "initial" count.
						onChange={e => setInitialCount(Number(e.currentTarget.value))}
					/>
				</div>
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
			<Counter initialCount={initialCount} step={step} />
		</div>
	)
}

const rootEl = document.createElement('div')
document.body.append(rootEl)
ReactDOM.createRoot(rootEl).render(<App />)
