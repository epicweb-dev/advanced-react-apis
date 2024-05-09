import { useReducer, useState } from 'react'
import * as ReactDOM from 'react-dom/client'

const countReducer = (state: unknown, newState: number) => newState

function Counter({ initialCount = 0, step = 1 }) {
	const [count, setCount] = useReducer(countReducer, initialCount)
	const increment = () => setCount(count + step)
	const decrement = () => setCount(count - step)
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
