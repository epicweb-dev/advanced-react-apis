// useContext: simple Counter
// 💯 splitting state and dispatch into individual providers
// src/count-context.js
import React from 'react'

const CountStateContext = React.createContext()
const CountDispatchContext = React.createContext()

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

function CountProvider({children}) {
  const [count, dispatch] = React.useReducer(countReducer, 0)
  return (
    <CountStateContext.Provider value={count}>
      <CountDispatchContext.Provider value={dispatch}>
        {children}
      </CountDispatchContext.Provider>
    </CountStateContext.Provider>
  )
}

function useCountState() {
  const context = React.useContext(CountStateContext)
  if (context === undefined) {
    throw new Error('useCountState must be used within a CountProvider')
  }
  return context
}

function useCountDispatch() {
  const context = React.useContext(CountDispatchContext)
  if (context === undefined) {
    throw new Error('useCountDispatch must be used within a CountProvider')
  }
  return context
}

// export {CountProvider, useCount}

// some-other-file.js
// import {CountProvider, useCount} from './count-context'

function CountDisplay() {
  const count = useCountState()
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  const dispatch = useCountDispatch()
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
