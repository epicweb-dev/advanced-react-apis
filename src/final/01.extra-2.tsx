// useReducer: simple Counter
// 💯 simulate setState with an object
// http://localhost:3000/isolated/final/01.extra-2.tsx

import * as React from 'react'

type State = {count: number}
const countReducer = (state: State, action: State) => ({...state, ...action})

function Counter({initialCount = 0, step = 1}) {
  const [state, setState] = React.useReducer(countReducer, {
    count: initialCount,
  })
  const {count} = state
  const increment = () => setState({count: count + step})
  const decrement = () => setState({count: count - step})
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
