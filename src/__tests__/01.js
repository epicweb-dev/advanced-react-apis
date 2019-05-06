import React from 'react'
import {render, fireEvent} from 'react-testing-library'
import Usage from '../exercises-final/01'
// import Usage from '../exercises/01'

test('clicking the button increments the count', () => {
  const {container} = render(<Usage />)
  const button = container.querySelector('button')
  fireEvent.click(button)
  expect(button).toHaveTextContent('1')
})

// this test is using some serious witchcraft 🧙‍♀️
// don't write tests like this please.
// I'm just making sure that you're using useReducer
// but your apps should not have tests like this.
// That's an implementation detail... Read more: https://kcd.im/imp-deets
test('using useReducer', () => {
  const createElement = React.createElement
  let counterFn
  React.createElement = (...args) => {
    if (args[0] && args[0].name === 'Counter') {
      counterFn = args[0]
    }
    return createElement(...args)
  }
  render(<Usage />)
  React.createElement = createElement
  try {
    expect(counterFn.toString()).toContain('useReducer')
  } catch (error) {
    throw new Error(
      '🚨  The Counter component that is rendered must call "useReducer" to get the "state" and "dispatch" function.',
    )
  }
})

// TODO: add a test that grabs the reducer (mock React.useReducer) and calls it directly
