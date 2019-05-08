// useContext: simple Counter
// 💯 passing dispatch directly
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

function useCount() {
  const context = React.useContext(CountContext)
  if (!context) {
    throw new Error('useCount must be used within a CountProvider')
  }
  return context
}

// export {CountProvider, useCount}

// some-other-file.js
// import {CountProvider, useCount} from './count-context'

function CountDisplay() {
  const {count} = useCount()
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  const {dispatch} = useCount()
  return (
    <button onClick={() => dispatch({type: 'INCREMENT', step: 2})}>
      Increment count
    </button>
  )
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
