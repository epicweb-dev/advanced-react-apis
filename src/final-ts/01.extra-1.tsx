// useReducer: simple Counter
// 💯 accept the step as the action
// http://localhost:3000/isolated/final-ts/01.extra-1.tsx

import * as React from 'react'

type State = number


type Reducer<State, Action> = (state: State, action: Action) => State

// React also export the same type definition at `React.Reducer` and it has the
// exact same api
const countReducer: Reducer<State, State> = (count, change) => count + change

//#region Counter
interface CounterProps {
  initialCount?: number
  step?: number
}
const Counter: React.VFC<CounterProps> = ({initialCount = 0, step = 1}) => {
  const [count, changeCount] = React.useReducer(countReducer, initialCount)
  const increment: React.MouseEventHandler<HTMLButtonElement> = () =>
    changeCount(step)
  return <button onClick={increment}>{count}</button>
}
//#endregion Counter

//#region Usage
const Usage: React.VFC = () => {
  return <Counter />
}
//#endregion Usage

export default Usage
