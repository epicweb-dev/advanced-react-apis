// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

/**
 * useReducer (state, action)
 *  - is an alternative to useState
 *  - usually passes two arguments:
 *    - the current state (current value)
 *    - whatever the dispatch function (setCount) is called with - this is often called the action
 */

function countReducer(count, step) {
  // state is kind of where you're up to in the loop
  return count + step
}

function Counter({initialCount = 0, step = 1}) {
  // always pass two params: the reducer and the initial state
  const [count, changeCount] = React.useReducer(countReducer, initialCount)

  // our newState is + 1 every time increment is called
  const increment = () => changeCount(step)
  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
