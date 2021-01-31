import * as React from 'react'
import {alfredTip} from '@kentcdodds/react-workshop-app/test-utils'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../final/02'
// import App from '../exercise/02'

const getFetchMock = () => jest.spyOn(window, 'fetch')
const getErrorMock = () => jest.spyOn(console, 'error')
let fetchMock: ReturnType<typeof getFetchMock>,
  errorMock: ReturnType<typeof getErrorMock>
beforeEach(() => {
  fetchMock = getFetchMock()
  errorMock = getErrorMock()
})

afterEach(() => {
  fetchMock.mockRestore()
  errorMock.mockRestore()
})

test('displays the pokemon', async () => {
  render(<App />)
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
  fetchMock.mockClear()

  userEvent.click(submit)

  await screen.findByRole('heading', {name: /ditto/i})

  alfredTip(
    () => expect(fetchMock).not.toHaveBeenCalled(),
    'Make certain that you are providing a dependencies list in useEffect!',
  )

  // verify error handling
  errorMock.mockImplementation(() => {})

  userEvent.clear(input)
  userEvent.type(input, 'george')
  userEvent.click(submit)
  expect(await screen.findByRole('alert')).toHaveTextContent(
    /There was an error.*Unsupported pokemon.*george/,
  )
  expect(errorMock).toHaveBeenCalledTimes(2)

  errorMock.mockReset()
})
