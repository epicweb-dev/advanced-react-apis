// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'


// changing the state to an object e.g. {count: 0} extra credit 2

//extra credit 3 modding to accept a funtion to support both an object and an option.
const countReducer = (state, action) => ({
  ...state,
   ...(typeof action === 'function' ? action(state) : state)
   /*
   if(typeof action === 'function){
    action(state) //function call.
   } else {
    state //object call.
   }
   */
  })


function Counter({initialCount = 0, step = 1}) {
  // 🐨 replace React.useState with React.useReducer.
  // 💰 React.useReducer(countReducer, initialCount)

  //extra crdit 2 API, must addapt the reducer hook.
  const [state, setState] = React.useReducer(countReducer, {
    count: initialCount,
  })
  const {count} = state
  const increment = () =>
    setState(currentState => ({count: currentState.count + step}))
  
  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
