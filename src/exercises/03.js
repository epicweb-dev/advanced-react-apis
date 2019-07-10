// useContext: simple Counter

import React from 'react'

// 🦉 I recommend you look down at the usage example to make sure you
// understand the structure and how these components will be used.

// 🐨 create your CountContext here with React.createContext

function CountProvider(props) {
  // 🐨 get the count state and setCount updater with React.useState
  // 🐨 create a `value` array with count and setCount
  // 🐨 return your context provider with the value assigned to that array and forward all the other props
  // 💰 more specifically, we need the children prop forwarded to the context provider
  return 'TODO...'
}

function CountDisplay() {
  // 🐨 get the count from useContext with the CountContext
  const count = 0
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  // 🐨 get the setCount from useContext with the CountContext
  const setCount = () => {}
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

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
