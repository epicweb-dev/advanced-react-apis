import React from 'react'
import {render, fireEvent} from 'react-testing-library'
import Usage from '../exercises-final/03'
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

  const providerProps = {}
  React.createElement = (...args) => {
    if (args[0].$$typeof === Symbol.for('react.provider')) {
      Object.assign(providerProps, args[1])
      if (args.length > 2) {
        providerProps.children = args.slice(2)
      }
    }
    return createElement(...args)
  }

  render(<Usage />)

  expect(providerProps.value).toEqual({
    count: 0,
    increment: expect.any(Function),
  })

  providerProps.value.increment() // lol

  // assert that calling increment directly updates the count state
  expect(providerProps.value).toEqual({
    count: 1,
    increment: expect.any(Function),
  })

  React.createElement = createElement
})
