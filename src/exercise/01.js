// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function Counter({initialCount = 0, step = 1}) {
  
  function countReducer(state, newState) {
    console.log('state', state)
    console.log('noostate', newState)
    return newState;
  }

  const [count, setCount] = React.useReducer(countReducer, initialCount)

  
  // The 1st argument is called "state" - the current value of count
  // The 2nd argument is called "newState" - the value passed to setCount
  const increment = () => setCount(count + step)
  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
