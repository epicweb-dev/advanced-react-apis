// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

const CountContext = React.createContext()
// returns an object with two properties: {Provider, Consumer}

const CountProvider = props => {
  // get the count state and setCount updater with React.useState
  const [count, setCount] = React.useState(0)
  // create a `value` array with count and setCount
  const value = [count, setCount] // value is an integer (count) and a function (setCount)
  // return your context provider with the value assigned to that array and forward all the other props, specifically children prop to the context provider
  return <CountContext.Provider value={value} {...props} />
}

function CountDisplay() {
  // get the count from useContext with the CountContext
  const [count] = React.useContext(CountContext)
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  // get the setCount from useContext with the CountContext
  const [, setCount] = React.useContext(CountContext)
  // [, setCount] says skip the first item in the array which is the integer
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

function App() {
  return (
    <div>
      {/*
        wrap these two components in the CountProvider so they can access
        the CountContext value
      */}
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  )
}

export default App
