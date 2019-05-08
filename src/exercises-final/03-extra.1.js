// useContext: simple Counter
// 💯 split up state context and dispatch context
import React from 'react'

const CountStateContext = React.createContext()
const CountDispatchContext = React.createContext()

function CountProvider(props) {
  const [count, setCount] = React.useState(0)
  return (
    <CountStateContext.Provider value={count}>
      <CountDispatchContext.Provider value={setCount}>
        {props.children}
      </CountDispatchContext.Provider>
    </CountStateContext.Provider>
  )
}

function CountDisplay() {
  const count = React.useContext(CountStateContext)
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  const setCount = React.useContext(CountDispatchContext)
  const increment = () => setCount(c => c + 1)
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
