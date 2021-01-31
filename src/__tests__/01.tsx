import {alfredTip} from '@kentcdodds/react-workshop-app/test-utils'
import {render, screen} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../final/01'
// import App from '../exercise/01'

// don't do this in regular tests!
const Counter = App().type

if (!Counter) {
  alfredTip(
    true,
    `Can't find the Counter from the exported App component. Please make sure to not edit the App component so I can find the Counter and run some tests on it.`,
  )
}

test('clicking the button increments the count with useReducer', () => {
  const {container} = render(<App />)
  const increment = screen.getByRole('button', {name: '➡️'})
  const decrement = screen.getByRole('button', {name: '⬅️'})

  userEvent.click(increment)
  expect(container).toHaveTextContent('1')
  userEvent.click(decrement)
  expect(container).toHaveTextContent('0')

  alfredTip(() => {
    const commentLessLines = (Counter as Function)
      .toString()
      .split('\n')
      .filter(l => !l.trim().substr(0, 2).includes('//'))
      .join('\n')
    expect(commentLessLines).toMatch('useReducer(')
    expect(commentLessLines).not.toMatch('useState(')
  }, 'The Counter component that is rendered must call "useReducer" and not "useState" to get the "state" and "dispatch" function and you should get rid of that useState call.')
})
