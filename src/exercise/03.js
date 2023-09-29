// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

const CountContext = React.createContext()

const CountProvider = props => {
  const [count, setCount] = React.useState(0)
  return <CountContext.Provider {...props} value={[count, setCount]} />
}

const useCount = () => {
  const context = React.useContext(CountContext)
  if (!context) {
    throw new Error('useCount can only be used within CountProvider')
  }
  return context
}

function CountDisplay() {
  // const [count] = React.useContext(CountContext)
  const [count] = useCount()
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  // const [, setCount] = React.useContext(CountContext)
  const [, setCount] = useCount()
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
