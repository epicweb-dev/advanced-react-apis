import * as React from 'react'
import {render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../final/04'
// import App from '../exercise/04'

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

test('scrolls to the bottom', async () => {
  const {getByText, getByRole} = render(<App />)
  const log = getByRole('log')
  const add = getByText(/add/i)
  const remove = getByText(/remove/i)
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

  await userEvent.click(add)
  expect(scrollTopSetter).toHaveBeenCalledTimes(1)
  expect(scrollTopSetter).toHaveBeenCalledWith(log.scrollHeight)

  scrollTopSetter.mockClear()

  await userEvent.click(remove)
  expect(scrollTopSetter).toHaveBeenCalledTimes(1)
  expect(scrollTopSetter).toHaveBeenCalledWith(log.scrollHeight)
})
