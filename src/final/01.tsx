// useReducer: simple Counter
// http://localhost:3000/isolated/final/01.tsx

import * as React from 'react'

const countReducer = (state: unknown, newState: number) => newState

function Counter({initialCount = 0, step = 1}) {
  const [count, setCount] = React.useReducer(countReducer, initialCount)
  const increment = () => setCount(count + step)
  const decrement = () => setCount(count - step)
  return (
    <div className="counter">
      <button onClick={decrement}>⬅️</button>
      {count}
      <button onClick={increment}>➡️</button>
    </div>
  )
}

function App() {
  return <Counter />
}

export default App
