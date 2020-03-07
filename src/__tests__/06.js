import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import Usage from '../final/06'
// import Usage from '../exercises/06'

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

test('scroll to top scrolls to the top', () => {
  const {getByText, getByRole} = render(<Usage />)
  const log = getByRole('log')
  const scrollToTop = getByText(/scroll to top/i)
  const scrollToBottom = getByText(/scroll to bottom/i)
  const scrollTopSetter = jest.fn()
  Object.defineProperties(log, {
    scrollHeight: {
      get() {
        return 100
      },
    },
    scrollTop: {
      get() {
        return 0
      },
      set: scrollTopSetter,
    },
  })
  fireEvent.click(scrollToTop)
  expect(scrollTopSetter).toHaveBeenCalledTimes(1)
  expect(scrollTopSetter).toHaveBeenCalledWith(0)

  scrollTopSetter.mockClear()

  fireEvent.click(scrollToBottom)
  expect(scrollTopSetter).toHaveBeenCalledTimes(1)
  expect(scrollTopSetter).toHaveBeenCalledWith(log.scrollHeight)
})
