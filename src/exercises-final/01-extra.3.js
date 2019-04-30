// useReducer: simple Counter
import React from 'react'

const countReducer = (state, action) => ({
  ...state,
  ...(typeof action === 'function' ? action(state) : action),
})

function Counter({initialCount = 0, step = 1}) {
  const [state, setState] = React.useReducer(countReducer, {
    count: initialCount,
  })
  const increment = () =>
    setState(currentState => ({count: currentState.count + 1}))
  return <button onClick={increment}>{state.count}</button>
}

function Usage() {
  return <Counter />
}
Usage.title = 'useReducer: simple Counter'

export default Usage
