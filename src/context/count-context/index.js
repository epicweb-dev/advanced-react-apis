import * as React from 'react'

const CountContext = React.createContext() // returns an object with two properties: {Provider, Consumer}

// setup custom hook that checks for context and has error boundaries=
export const useCount = () => {
  const context = React.useContext(CountContext)
  // console.log('context in useCount =', context)  = [0, f]
  if (!context) {
    throw new Error('useCount must be used within the CountProvider')
  }
  return context
}

export const CountProvider = props => {
  // get the count state and setCount updater with React.useState
  const [count, setCount] = React.useState(0)
  // create a `value` array with count and setCount
  const value = [count, setCount] // value is an integer (count) and a function (setCount)
  // return your context provider with the value assigned to that array and forward all the other props, specifically children prop to the context provider
  // alwyas has a single prop called value
  return <CountContext.Provider value={value} {...props} />
}
