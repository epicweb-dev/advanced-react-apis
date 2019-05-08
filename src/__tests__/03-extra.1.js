import chalk from 'chalk'
import React from 'react'
import {render, fireEvent} from 'react-testing-library'
import Usage from '../exercises-final/03-extra.1'
// import Usage from '../exercises/03'

test('clicking the button increments the count', () => {
  const {getByText} = render(<Usage />)
  const button = getByText(/increment count/i)
  const display = getByText(/the current count/i)
  expect(display).toHaveTextContent(/0/)
  fireEvent.click(button)
  expect(display).toHaveTextContent(/1/)
  fireEvent.click(button)
  expect(display).toHaveTextContent(/2/)
})

// this test is using some serious witchcraft 🧙‍♀️
// don't write tests like this please.
// I'm just making sure that you're using useReducer
// but your apps should not have tests like this.
// That's an implementation detail... Read more: https://kcd.im/imp-deets
test('If CountDisplay is rendered outside of CountProvider a useful error is thrown', () => {
  const createElement = React.createElement

  let CountDisplay
  React.createElement = (...args) => {
    if (args[0].name === 'CountDisplay') {
      CountDisplay = args[0]
    }
    return createElement(...args)
  }

  render(<Usage />)

  jest.spyOn(console, 'error').mockImplementation(() => {})

  expect(() => render(<CountDisplay />)).toThrow()

  try {
    expect(() => render(<CountDisplay />)).not.toThrow(
      /property.*count.*undefined/,
    )
  } catch (error) {
    //
    //
    //
    // these comment lines are just here to keep the next line out of the codeframe
    // so it doesn't confuse people when they see the error message twice.
    error.message = `🚨  ${chalk.red(
      `Rending <CountDisplay /> by itself is throwing a non-helpful error message. Throw a custom error message.`,
    )}\n\n${error.message}`

    throw error
  }

  React.createElement = createElement
  console.error.mockRestore()
})
