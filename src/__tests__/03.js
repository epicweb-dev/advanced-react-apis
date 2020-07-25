import React from 'react'
import {render, screen, act} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../final/03'
// import App from '../exercise/03'

test('clicking the button increments the count', () => {
  render(<App />)
  const button = screen.getByText(/increment count/i)
  const display = screen.getByText(/the current count/i)
  expect(display).toHaveTextContent(/0/)
  userEvent.click(button)
  expect(display).toHaveTextContent(/1/)
  userEvent.click(button)
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

  render(<App />)

  expect(providerProps.value).toEqual([0, expect.any(Function)])

  act(() => {
    providerProps.value[1](1) // lol
  })

  // assert that calling setCount directly updates the count state
  expect(providerProps.value).toEqual([1, expect.any(Function)])

  React.createElement = createElement
})
