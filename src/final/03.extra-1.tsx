// useContext: simple Counter
// 💯 create a consumer hook
// http://localhost:3000/isolated/final/03.extra-1.tsx

import * as React from 'react'

type CountContextType = [number, React.Dispatch<React.SetStateAction<number>>]
const CountContext = React.createContext<CountContextType>(undefined)

function CountProvider({children}: {children: React.ReactNode}) {
  const [count, setCount] = React.useState(0)
  return (
    <CountContext.Provider value={[count, setCount]}>
      {children}
    </CountContext.Provider>
  )
}

function useCount() {
  const context = React.useContext(CountContext)
  if (!context) {
    throw new Error('useCount must be used within a CountProvider')
  }
  return context
}

function CountDisplay() {
  const [count] = useCount()
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
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
