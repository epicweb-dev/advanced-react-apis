// useReducer: simple Counter
// 💯 traditional dispatch object with a type and switch statement
// http://localhost:3000/isolated/final-ts/01.extra-4.tsx

import * as React from 'react'

//#region reducer

interface State {
  count: number
}

/**
 * an utility type for building Action types.
 * Definitely overkill for this small example, but quite common in the real world
 */
interface ActionType<Type extends string> {
  type: Type
}

interface IncrementAction extends ActionType<'increment'> {
  step: number
}

interface DecrementAction extends ActionType<'decrement'> {
  step: number
}

/**
 * Action type is defined as the discriminated union type of all the custom
 * action that you have defined.
 * This ensure that you can't dispatch a misshaped Action by accident.
 */
type Action = IncrementAction | DecrementAction

const countReducer: React.Reducer<State, Action> = (state, action) => {
  const {type, step} = action
  switch (type) {
    case 'increment': {
      return {
        ...state,
        count: state.count + step,
      }
    }
    default: {
      throw new Error(`Unsupported action type: ${action.type}`)
    }
  }
}
//#endregion reducer

//#region Counter
interface CounterProps {
  initialCount?: number
  step?: number
}
const Counter: React.VFC<CounterProps> = ({initialCount = 0, step = 1}) => {
  const initialState: State = {count: initialCount}
  const [state, dispatch] = React.useReducer(countReducer, initialState)
  const {count} = state
  const increment: React.MouseEventHandler<HTMLButtonElement> = () =>
    dispatch({type: 'increment', step})
  return <button onClick={increment}>{count}</button>
}
//#endregion Counter

//#region App
const App: React.VFC = () => {
  return <Counter />
}
//#endregion App

export default App
