// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.tsx

import * as React from 'react'

// 🐨 create your CountContext here with React.createContext

// 🐨 create a CountProvider component here that does this:
//   🐨 get the count state and setCount updater with React.useState
//   🐨 create a `value` array with count and setCount
//   🐨 return your context provider with the value assigned to that array and forward all the other props
//   💰 more specifically, we need the children prop forwarded to the context provider

function CountDisplay() {
  // 🐨 get the count from useContext with the CountContext
  const count = 0
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  // 🐨 replace the fake implementation of setCount with what you get back from useContext with the CountContext
  const setCount = () => {}
  // @ts-expect-error 💣
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

function App() {
  return (
    <div>
      {/*
        🐨 wrap these two components in the CountProvider so they can access
        the CountContext value
      */}
      <CountDisplay />
      <Counter />
    </div>
  )
}

export default App
