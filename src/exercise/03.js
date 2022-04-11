// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

const CountContext = React.createContext()

// 🐨 create a CountProvider component here that does this:
//   🐨 create a `value` array with count and setCount
//   🐨 return your context provider with the value assigned to that array and forward all the other props
//   💰 more specifically, we need the children prop forwarded to the context provider

function CountProvider() {
  const [count, setCount] = React.useState(0)
  const context = React.useContext(CountContext)

  return context
}

function CountDisplay() {
  const count = React.useContext(CountContext)
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  // 🐨 get the setCount from useContext with the CountContext
  const setCount = () => CountProvider()
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

function App() {
  return (
    <div>
      <CountContext.Provider value={0}>
        <CountDisplay />
        <Counter />
      </CountContext.Provider>
    </div>
  )
}

export default App
