import * as React from 'react'
import {render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../final/05'
// import App from '../exercise/05'

test('adds and removes children from the log', async () => {
  const {getByText, getByRole} = render(<App />)
  const log = getByRole('log')
  const chatCount = log.children.length
  const add = getByText(/add/i)
  const remove = getByText(/remove/i)
  await userEvent.click(add)
  expect(log.children).toHaveLength(chatCount + 1)
  await userEvent.click(remove)
  expect(log.children).toHaveLength(chatCount)
})

test('scroll to top scrolls to the top', async () => {
  const {getByText, getByRole} = render(<App />)
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
  await userEvent.click(scrollToTop)
  expect(scrollTopSetter).toHaveBeenCalledTimes(1)
  expect(scrollTopSetter).toHaveBeenCalledWith(0)

  scrollTopSetter.mockClear()

  await userEvent.click(scrollToBottom)
  expect(scrollTopSetter).toHaveBeenCalledTimes(1)
  expect(scrollTopSetter).toHaveBeenCalledWith(log.scrollHeight)
})
