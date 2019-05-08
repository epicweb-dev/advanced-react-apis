// useContext: simple Counter
// 💯 using a reducer
// src/count-context.js
import React from 'react'

const CountContext = React.createContext()

function countReducer(count, action) {
  const {step = 1} = action
  switch (action.type) {
    case 'INCREMENT': {
      return count + step
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`)
    }
  }
}

function CountProvider(props) {
  const [count, dispatch] = React.useReducer(countReducer, 0)
  const value = React.useMemo(() => {
    return {
      count,
      dispatch,
    }
  }, [count])
  return <CountContext.Provider value={value} {...props} />
}

function useCount({step = 1} = {}) {
  const context = React.useContext(CountContext)
  if (!context) {
    throw new Error('useCount must be used within a CountProvider')
  }
  const {count, dispatch} = context
  const increment = React.useCallback(
    () => dispatch({type: 'INCREMENT', step}),
    [step, dispatch],
  )
  return {
    count,
    increment,
  }
}

// export {CountProvider, useCount}

// some-other-file.js
// import {CountProvider, useCount} from './count-context'

function CountDisplay() {
  const {count} = useCount()
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  const {increment} = useCount({step: 2})
  return <button onClick={increment}>Increment count</button>
}

function Usage() {
  return (
    <CountProvider>
      <CountDisplay />
      <Counter />
    </CountProvider>
  )
}
Usage.title = 'useContext: simple Counter'

export default Usage
