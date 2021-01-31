// useContext: simple Counter
// http://localhost:3000/isolated/final/03.tsx

import * as React from 'react'

type CountContextType = [number, React.Dispatch<React.SetStateAction<number>>]
const CountContext = React.createContext<CountContextType | undefined>(
  undefined,
)

function CountProvider({children}: {children: React.ReactNode}) {
  const [count, setCount] = React.useState(0)
  return (
    <CountContext.Provider value={[count, setCount]}>
      {children}
    </CountContext.Provider>
  )
}

function CountDisplay() {
  const context = React.useContext(CountContext)
  if (!context) {
    throw new Error('CountDisplay must be used within a CountProvider')
  }
  const [count] = context
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  const context = React.useContext(CountContext)
  if (!context) {
    throw new Error('Counter must be used within a CountProvider')
  }
  const [, setCount] = context
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
