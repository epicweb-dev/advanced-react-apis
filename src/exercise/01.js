// useReducer: simple Counter

import React from 'react'

function Counter({step = 1, initialCount = 0}) {
  // 🐨 replace React.useState with React.useReducer.
  const [count, setCount] = React.useState(initialCount)
  // 🦉 you can inline your reducer function as the first argument to
  // React.useReducer (this is especially useful if the reducer function is
  // configurable via props), but more often you'll find people place the
  // reducer function outside the component.

  // 💰 you can write your reducer so you don't have to make any changes
  // to the next two lines of code!
  const increment = () => setCount(c => c + step)
  return <button onClick={increment}>{count}</button>
}

function Usage() {
  return <Counter />
}

export default Usage
