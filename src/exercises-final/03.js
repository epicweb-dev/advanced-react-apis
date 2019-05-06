// useContext: simple Counter
// src/count-context.js
import React from 'react'

const CountContext = React.createContext()

function CountProvider(props) {
  const [count, setCount] = React.useState(0)
  const increment = () => setCount(c => c + 1)
  const value = {count, increment}
  return <CountContext.Provider value={value} {...props} />
}

function useCount() {
  return React.useContext(CountContext)
}

// export {CountProvider, useCount}

// some-other-file.js
// import {CountProvider, useCount} from './count-context'

function CountDisplay() {
  const {count} = useCount()
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  const {increment} = useCount()
  return <button onClick={increment}>Increment count</button>
}

function Usage() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  )
}
Usage.title = 'useContext: simple Counter'

export default Usage
