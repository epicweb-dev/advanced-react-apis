// useReducer: simple Counter
// 💯 simulate setState with an object
// http://localhost:3000/isolated/final-ts/01.extra-2.tsx

import * as React from 'react'

//#region reducer
interface State {
  count: number
}

const countReducer: React.Reducer<State, State> = (state, action) => ({
  ...state,
  ...action,
})
//#endregion reducer

//#region Counter
interface CounterProps {
  initialCount?: number
  step?: number
}
const Counter: React.VFC<CounterProps> = ({initialCount = 0, step = 1}) => {
  const initialState: State = {count: initialCount}
  const [state, setState] = React.useReducer(countReducer, initialState)
  const {count} = state
  const increment: React.MouseEventHandler<HTMLButtonElement> = () =>
    setState({count: count + step})
  return <button onClick={increment}>{count}</button>
}
//#endregion Counter

//#region App
const App: React.VFC = () => {
  return <Counter />
}
//#endregion App

export default App
