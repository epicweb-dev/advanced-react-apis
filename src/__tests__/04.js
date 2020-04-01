import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import App from '../final/04'
// import App from '../exercise/04'

test('adds and removes children from the log', () => {
  const {getByText, getByRole} = render(<App />)
  const log = getByRole('log')
  const chatCount = log.children.length
  const add = getByText(/add/i)
  const remove = getByText(/remove/i)
  fireEvent.click(add)
  expect(log.children).toHaveLength(chatCount + 1)
  fireEvent.click(remove)
  expect(log.children).toHaveLength(chatCount)
})
