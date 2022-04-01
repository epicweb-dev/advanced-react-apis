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

// state is kind of where you're up to in the loop
// whatever is in action will overwrite state
// this func merges the two values (state, action) together
// const countReducer = (state, action) => ({...state, ...action})

// const countReducer = (state, action) => ({
//   // if the action is a function, call action with state, otherwise if object call action
//   ...state,
//   ...(typeof action === 'function' ? action(state) : action),
// })

const countReducer = (state, action) => {
  console.log(`state.count = ${state.count}`)
  console.log(`action.step = ${action.step}`)

  switch (action.type) {
    case 'INCREMENT':
      return {
        count: state.count + action.step,
      }
    default:
      throw new Error(`Unsupported action type: ${action.type}`)
  }
}

function Counter({initialCount = 0, step = 1}) {
  // always pass two params: the reducer and the initial state
  // const [state, setState] = React.useReducer(countReducer, {
  //   count: initialCount,
  // })
  const [state, dispatch] = React.useReducer(countReducer, {
    count: initialCount,
  })

  // count is initially 0 because we've set initialCount = 0
  const {count} = state

  console.log(`count = ${count}`)

  // const increment = () =>
  //   setState(currentState => ({count: currentState.count + step}))

  const increment = () => dispatch({type: 'INCREMENT', step})

  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
