// useReducer: simple Counter
import React from 'react'

const countReducer = (state, newState) => newState(state)

function Counter({step = 1, initialCount = 0}) {
  const [count, setCount] = React.useReducer(countReducer, initialCount)
  const increment = () => setCount(c => c + step)
  return <button onClick={increment}>{count}</button>
}

function Usage() {
  return <Counter />
}
Usage.title = 'useReducer: simple Counter'

export default Usage
