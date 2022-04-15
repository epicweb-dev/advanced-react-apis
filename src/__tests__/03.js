import * as React from 'react'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../final/03'
// import App from '../exercise/03'

test('clicking the button increments the count', async () => {
  render(<App />)
  const button = screen.getByText(/increment count/i)
  const display = screen.getByText(/the current count/i)
  expect(display).toHaveTextContent(/0/)
  await userEvent.click(button)
  expect(display).toHaveTextContent(/1/)
  await userEvent.click(button)
  expect(display).toHaveTextContent(/2/)
})
