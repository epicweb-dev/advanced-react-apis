// useContext: simple Counter
import React from 'react'

function CountProvider({children}) {
  // const [count, setCount] = React.useState(initialCount)
  // const increment = () => setCount(c => c + step)
  return children
}

function CountDisplay() {
  const {count} = {count: 'unknown'}
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  const {increment} = {
    increment: () => {
      console.info('i do nothing')
    },
  }
  return <button onClick={increment}>Increment count</button>
}

function Usage() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  )
}
Usage.title = 'useContext: simple Counter'

export default Usage
