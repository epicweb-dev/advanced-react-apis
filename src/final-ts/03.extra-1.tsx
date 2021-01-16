// useContext: simple Counter
// 💯 create a consumer hook
// http://localhost:3000/isolated/final-ts/03.extra-1.tsx

import * as React from 'react'

type CounterContextInterface = readonly [
  number,
  React.Dispatch<React.SetStateAction<number>>,
]

// in JS calling React.createContext() with no argument doesn't raise any issue,
// in Typescript land thought, the compiler will yell at you!
// In fact, said function is defined as such:
// ``` function createContext<T>(defaultValue: T ): Context<T> ```
// where the defaultValue argument is required. if you want to read morea about it
// this is the issue discussion: https://github.com/DefinitelyTyped/DefinitelyTyped/pull/24509#issuecomment-382213106
// The possible options are listed in theses examples: https://react-typescript-cheatsheet.netlify.app/docs/basic/getting-started/context#extended-example
const CountContext = React.createContext<CounterContextInterface>(undefined!)

const CountProvider: React.FC = props => {
  const value = React.useState(0)
  return <CountContext.Provider value={value} {...props} />
}

function useCount(): CounterContextInterface {
  const context = React.useContext(CountContext)
  if (!context) {
    throw new Error('useCount must be used within a CountProvider')
  }
  return context
}

function CountDisplay(): JSX.Element {
  const [count] = useCount()
  return <div>{`The current count is ${count}`}</div>
}

function Counter(): JSX.Element {
  const [, setCount] = useCount()
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

function App(): JSX.Element {
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
