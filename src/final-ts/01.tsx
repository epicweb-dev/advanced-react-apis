// useReducer: simple Counter
// http://localhost:3000/isolated/final-ts/01.tsx

import * as React from 'react'

type State = number

const countReducer = (state: State, newState: State): State => newState

//#region Counter
interface CounterProps {
  initialCount?: number
  step?: number
}
const Counter: React.VFC<CounterProps> = ({initialCount = 0, step = 1}) => {
  const [count, setCount] = React.useReducer(countReducer, initialCount)

  const increment: React.MouseEventHandler<HTMLButtonElement> = () =>
    setCount(count + step)

  return <button onClick={increment}>{count}</button>
}
//#endregion Counter

//#region App
const App: React.VFC = () => {
  return <Counter />
}
//#endregion App

export default App
