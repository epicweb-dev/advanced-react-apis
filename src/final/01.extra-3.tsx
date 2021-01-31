// useReducer: simple Counter
// 💯 simulate setState with an object OR function
// http://localhost:3000/isolated/final/01.extra-3.tsx

import * as React from 'react'

type State = {count: number}
const countReducer = (
  state: State,
  action: State | ((currentState: State) => State),
) => ({
  ...state,
  ...(typeof action === 'function' ? action(state) : action),
})

function Counter({initialCount = 0, step = 1}) {
  const [state, setState] = React.useReducer(countReducer, {
    count: initialCount,
  })
  const {count} = state
  const increment = () =>
    setState(currentState => ({count: currentState.count + step}))
  const decrement = () =>
    setState(currentState => ({count: currentState.count - step}))
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
