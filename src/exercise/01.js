// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function Counter({initialCount = 0, step = 1}) {
  function countReducer(state, action) {
    return {
      ...state,
      ...(typeof action === 'function' ? action(state) : action),
    }
  }

  const [state, setState] = React.useReducer(countReducer, {
    count: initialCount,
  })
  const {count} = state

  const increment = () =>
    setState(currentState => ({count: currentState.count + step}))
  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
