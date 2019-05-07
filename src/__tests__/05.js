import React from 'react'
import {render, fireEvent} from 'react-testing-library'
import Usage from '../exercises-final/05'

test('adds and removes children from the log', () => {
  const {getByText, getByRole} = render(<Usage />)
  const log = getByRole('log')
  const chatCount = log.children.length
  const add = getByText(/add/i)
  const remove = getByText(/remove/i)
  fireEvent.click(add)
  expect(log.children).toHaveLength(chatCount + 1)
  fireEvent.click(remove)
  expect(log.children).toHaveLength(chatCount)
})
