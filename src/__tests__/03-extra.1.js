import React from 'react'
import {render, fireEvent} from '@testing-library/react'
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
test('CountProvider is rendering a context provider with the right value', () => {
  const createElement = React.createElement

  let providerValues = []
  React.createElement = (...args) => {
    if (args[0].$$typeof === Symbol.for('react.provider')) {
      providerValues.push(args[1].value)
    }
    return createElement(...args)
  }

  render(<Usage />)

  expect(providerValues).toHaveLength(2)
  expect(providerValues).toContain(0)
  expect(providerValues).toContainEqual(expect.any(Function))
  const setCount = providerValues.find(f => typeof f === 'function')

  providerValues = []
  setCount(1) // lol

  // assert that calling setCount directly updates the count state
  expect(providerValues).toContain(1)
  expect(providerValues).toContain(setCount)

  React.createElement = createElement
})
