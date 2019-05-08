// useContext: simple Counter
// src/count-context.js
import React from 'react'

// 🐨 create your CountContext here with React.createContext

function CountProvider(props) {
  // 🐨 get the count state and setCount updater with React.useState
  // 🐨 create an `increment` function here which will increment the count by 1
  // 🐨 create a `value` object with count and increment properties
  // 🐨 return your context provider with the value assigned to that object and foward all the other props
  // 💰 more specifically, we need the children prop forwarded to the context provider
  return 'TODO...'
}

function useCount() {
  // 🐨 return what you get back from React.useContext with the CountContext
  return {} // TODO
}

// export {CountProvider, useCount}

/*
🦉 Elaboration & Feedback
After the instruction, copy the URL below into your browser and fill out the form:
http://ws.kcd.im/?ws=advanced%20react%20hooks&e=03&em=
*/

////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

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
