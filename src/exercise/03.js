// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

import { useCount, CountProvider } from '../context/count-context'

// const CountContext = React.createContext([0, () => {}]) // no-op function is default set-count

function CountDisplay() {
  // get the count from useContext with the CountContext
  const [count] = useCount()
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  // get the setCount from useContext with the CountContext
  const [, setCount] = useCount()
  // [, setCount] says skip the first item in the array which is the integer
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

function App() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  )
}

export default App
