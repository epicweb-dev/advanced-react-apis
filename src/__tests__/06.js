import matchMediaPolyfill from 'mq-polyfill'
import * as React from 'react'
import {alfredTip} from '@kentcdodds/react-workshop-app/test-utils'
import {render, act} from '@testing-library/react'
import App from '../final/06'
// import App from '../exercise/06'

beforeAll(() => {
  matchMediaPolyfill(window)
  window.resizeTo = function resizeTo(width, height) {
    Object.assign(this, {
      innerWidth: width,
      innerHeight: height,
      outerWidth: width,
      outerHeight: height,
    }).dispatchEvent(new this.Event('resize'))
  }
})

test('works', () => {
  jest.spyOn(React, 'useDebugValue')
  const {container} = render(<App />)
  alfredTip(
    () => expect(React.useDebugValue).toHaveBeenCalled(),
    `Make sure to call \`useDebugValue\` with the formatted value`,
  )
  alfredTip(
    () =>
      expect(React.useDebugValue).toHaveBeenCalledWith(
        expect.stringContaining('max-width: 699px'),
      ),
    `Make sure to call \`useDebugValue\` with the formatted value`,
  )
  alfredTip(
    () =>
      expect(React.useDebugValue).toHaveBeenCalledWith(
        expect.stringContaining('max-width: 999px'),
      ),
    `Make sure to call \`useDebugValue\` with the formatted value`,
  )
  alfredTip(
    () =>
      expect(React.useDebugValue).toHaveBeenCalledWith(
        expect.stringContaining('min-width: 1000px'),
      ),
    `Make sure to call \`useDebugValue\` with the formatted value`,
  )
  const box = container.querySelector('[style]')

  act(() => {
    window.resizeTo(1001, 1001)
  })
  expect(box).toHaveStyle(`background-color: green;`)

  act(() => {
    window.resizeTo(800, 800)
  })
  expect(box).toHaveStyle(`background-color: yellow;`)

  act(() => {
    window.resizeTo(600, 600)
  })
  expect(box).toHaveStyle(`background-color: red;`)
})
