// useContext: simple Counter
// 💯 configurable utilities
// src/count-context.js
import React from 'react'

const CountContext = React.createContext()

function CountProvider(props) {
  const [count, setCount] = React.useState(0)
  const value = React.useMemo(() => {
    return {
      count,
      setCount,
    }
  }, [count])
  return <CountContext.Provider value={value} {...props} />
}

function useCount({step = 1} = {}) {
  const context = React.useContext(CountContext)
  if (!context) {
    throw new Error('useCount must be used within a CountProvider')
  }
  const {count, setCount} = context
  const increment = React.useCallback(() => setCount(c => c + step), [
    step,
    setCount,
  ])
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
