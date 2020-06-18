import React from 'react'
import chalk from 'chalk'
import {render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../final/01'
// import App from '../exercise/01'

test('clicking the button increments the count', () => {
  const {container} = render(<App />)
  const button = container.querySelector('button')
  userEvent.click(button)
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
  render(<App />)
  React.createElement = createElement

  const lines = counterFn.toString().split('\n')
  const useReducerLine = lines.find(line => {
    return !line.trim().startsWith('//') && line.includes('useReducer(')
  })
  const useStateLine = lines.find(line => {
    return !line.trim().startsWith('//') && line.includes('useState(')
  })
  if (!useReducerLine || useStateLine) {
    throw new Error(
      `🚨  ${chalk.red(
        'The Counter component that is rendered must call "useReducer" to get the "state" and "dispatch" function and you should get rid of that useState call.',
      )}`,
    )
  }
})
