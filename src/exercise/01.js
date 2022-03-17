// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function Counter({initialCount = 0, step = 1}) {
  // often two args passed to useReducer are state and action
  // const [state, dispatch] = React.useReducer()
  const [count, setCount] = React.useReducer(countReducer, initialCount)

  // this is the reducer
  function countReducer(count, step) {
    return step
  }
  // The 1st argument is called "state" - the current value of count
  // The 2nd argument is called "newState" - the value passed to setCount - often called an action
  const increment = () => setCount(count + step)
  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
