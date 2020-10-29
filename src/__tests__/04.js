import * as React from 'react'
import {render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../final/04'
// import App from '../exercise/04'

test('adds and removes children from the log', () => {
  const {getByText, getByRole} = render(<App />)
  const log = getByRole('log')
  const chatCount = log.children.length
  const add = getByText(/add/i)
  const remove = getByText(/remove/i)
  userEvent.click(add)
  expect(log.children).toHaveLength(chatCount + 1)
  userEvent.click(remove)
  expect(log.children).toHaveLength(chatCount)
})
