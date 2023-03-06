// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'


// changing the state to an object e.g. {count: 0} extra credit 2

//extra credit 3 modding to accept a funtion to support both an object and an option.

//extra credit 4 implementation with a dispatch object and a switch statement.
function countReducer(state, action){ //change from const to function.
  const {type, step} = action //object with both type and step variables.

  switch(type){
    case 'INCREMENT': {

      return {
        ...state,
        count: state.count + step,
      }
    }
    default: {
      throw new Error(`Unsupported action type: ${type}`)
    }

  }

  }


function Counter({initialCount = 0, step = 1}) {
  // 🐨 replace React.useState with React.useReducer.
  // 💰 React.useReducer(countReducer, initialCount)

  //extra crdit 2 API, must addapt the reducer hook.
  const [state, dispatch] = React.useReducer(countReducer, {
    count: initialCount,
  })
  const {count} = state
  const increment = () => dispatch({type: 'INCREMENT', step})
  
  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter />
}

export default App
