import matchMediaPolyfill from 'mq-polyfill'
import * as React from 'react'
import {alfredTip} from '@kentcdodds/react-workshop-app/test-utils'
import {render} from '@testing-library/react'
import App from '../final/06.extra-1'
// import App from '../exercise/06'

beforeAll(() => {
  matchMediaPolyfill(window)
})

test('works', () => {
  jest.spyOn(React, 'useDebugValue')
  render(<App />)
  alfredTip(
    () => expect(React.useDebugValue).toHaveBeenCalled(),
    `Make sure \`useDebugValue\` is called`,
  )

  const [[debugData, formatDebugValue]] = React.useDebugValue.mock.calls
  alfredTip(
    () =>
      expect(debugData).toEqual({
        query: expect.any(String),
        state: expect.any(Boolean),
      }),
    `Make sure \`useDebugValue\` is called with an object as the first argument with query (string) and state (boolean) properties`,
  )
  alfredTip(
    () => expect(formatDebugValue).toEqual(expect.any(Function)),
    `Make sure \`useDebugValue\` is called with a function as the second argument`,
  )

  alfredTip(() => {
    expect(formatDebugValue({query: '(max-width: 699px)', state: false})).toBe(
      `\`(max-width: 699px)\` => false`,
    )
    expect(formatDebugValue({query: '(max-width: 699px)', state: true})).toBe(
      `\`(max-width: 699px)\` => true`,
    )
  }, `Make sure the format returned from your debug format function is \`{query}\` => {state}. Right now, we're getting: "${formatDebugValue({query: '(max-width: 699px)', state: false})}"`)
})
