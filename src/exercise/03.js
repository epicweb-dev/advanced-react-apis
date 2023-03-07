// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

// 🐨 create your CountContext here with React.createContext

// initialiazing 
const CountContext = React.createContext()

//   🐨 create a CountProvider component here that does this:
//   🐨 get the count state and setCount updater with React.useState
//   🐨 create a `value` array with count and setCount
//   🐨 return your context provider with the value assigned to that array and forward all the other props
//   💰 more specifically, we need the children prop forwarded to the context provider

function CountProvider(props){
  const [count, setCount]= React.useState(0) //default state to 0.
  const value = React.useState(0)
  //const value = [count, setCount]

  return <CountContext.Provider value={value} {...props}/> //return jsx component.
}


//costum hook useCount()
function useCount(){
  const context = React.useContext(CountContext)
  if(!context){ //no default or value and to not get 'undefined'
    throw new Error('useCount must be used within a CountProvider')
  }
  return context
}


function CountDisplay() {
  // 🐨 get the count from useContext with the CountContext

  //had a bug for not using the [] to keep an eye out.

  const [count] = useCount() //access the value through the useContext.

  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  // 🐨 get the setCount from useContext with the CountContext

  const [, setCount] = React.useContext(CountContext)
  
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
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
      
    </div>
  )
}

export default App
