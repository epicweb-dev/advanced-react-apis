import React from 'react'
import chalk from 'chalk'
import {render, fireEvent} from '@testing-library/react'
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
    expect(counterFn.toString()).toContain('useReducer(')
  } catch (error) {
    //
    //
    //
    // these comment lines are just here to keep the next line out of the codeframe
    // so it doesn't confuse people when they see the error message twice.
    error.message = `🚨  ${chalk.red(
      'The Counter component that is rendered must call "useReducer" to get the "state" and "dispatch" function.',
    )}`

    throw error
  }
})
