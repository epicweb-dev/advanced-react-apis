import * as React from 'react'
import {alfredTip} from '@kentcdodds/react-workshop-app/test-utils'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../final/02.extra-3'
// import App from '../exercise/02'

beforeEach(() => {
  jest.spyOn(window, 'fetch')
  jest.spyOn(console, 'error')
})

afterEach(() => {
  window.fetch.mockRestore()
  console.error.mockRestore()
})

test('displays the pokemon', async () => {
  const {unmount} = render(<App />)
  const input = screen.getByLabelText(/pokemon/i)
  const submit = screen.getByText(/^submit$/i)

  // verify that an initial request is made when mounted
  userEvent.type(input, 'pikachu')
  userEvent.click(submit)

  await screen.findByRole('heading', {name: /pikachu/i})

  // verify that a request is made when props change
  userEvent.clear(input)
  userEvent.type(input, 'ditto')
  userEvent.click(submit)

  await screen.findByRole('heading', {name: /ditto/i})

  // verify that when props remain the same a request is not made
  window.fetch.mockClear()

  userEvent.click(submit)

  await screen.findByRole('heading', {name: /ditto/i})

  alfredTip(
    () => expect(window.fetch).not.toHaveBeenCalled(),
    'Make certain that you are providing a dependencies list in useEffect!',
  )

  // verify error handling
  console.error.mockImplementation(() => {})

  userEvent.clear(input)
  userEvent.type(input, 'george')
  userEvent.click(submit)
  expect(await screen.findByRole('alert')).toHaveTextContent(
    /There was an error.*Unsupported pokemon.*george/,
  )
  expect(console.error).toHaveBeenCalledTimes(2)

  console.error.mockReset()

  userEvent.type(input, 'mew')
  userEvent.click(submit)

  // verify unmounting does not result in an error
  unmount()
  // wait for a bit for the mocked request to resolve:
  await new Promise(r => setTimeout(r, 100))
  alfredTip(
    () => expect(console.error).not.toHaveBeenCalled(),
    'Make sure that when the component is unmounted the component does not attempt to trigger a rerender with `dispatch`',
  )
})
