/**
 * React.useCallback
 *  - two args passed to useCallback
 *  1. callback you want called
 *  2. an array of dependencies which is similar to useEffect
 *  if the the dependencies don't change, will get callback which was returned the previous time (so the callback remains the same between renders)
 *  useCallback returns the function passed
 *
 *  Why useCallback ?
 *  - It is useful when passing callbacks to optimised child components that rely on reference equality to prevent unnecessary rerenders = performance !
 */

/*
import * as React from 'react'

function ParentComponent(props) {
  const example = React.useCallback(() => {
    console.log('handle logic here, do a func')
  }, []) // always include e.g. [dependencies], even if empty array, otherwise won't run
}

function ConsoleGreeting(props) {
  const greet = React.useCallback(
    greeting => console.log(`${greeting} ${props.name}`),
    [props.name],
  )

  React.useEffect(() => {
    const helloGreeting = 'Hello'
    greet(helloGreeting)
  }, [greet])
  return <div>check the console</div>
}
*/
