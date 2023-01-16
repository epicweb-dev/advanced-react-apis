import * as React from 'react'
import {alfredTip} from '@kentcdodds/react-workshop-app/test-utils'
import {render} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
// import App from '../final/01'
import App from '../exercise/01'

// don't do this in regular tests!
const Counter = App().type

if (!Counter) {
  alfredTip(
    true,
    `Can't find the Counter from the exported App component. Please make sure to not edit the App component so I can find the Counter and run some tests on it.`,
  )
}

test('clicking the button increments the count with useReducer', async () => {
  const {container} = render(<App />)
  const button = container.querySelector('button')
  await userEvent.click(button)
  expect(button).toHaveTextContent('1')
  await userEvent.click(button)
  expect(button).toHaveTextContent('2')

  alfredTip(() => {
    const commentLessLines = Counter.toString()
      .split('\n')
      .filter(l => !l.trim().substr(0, 2).includes('//'))
      .join('\n')
    expect(commentLessLines).toMatch('useReducer(')
    expect(commentLessLines).not.toMatch('useState(')
  }, 'The Counter component that is rendered must call "useReducer" and not "useState" to get the "state" and "dispatch" function and you should get rid of that useState call.')
})
