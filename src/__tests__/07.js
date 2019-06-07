import chalk from 'chalk'
import matchMediaPolyfill from 'mq-polyfill'
import React from 'react'
import {render} from '@testing-library/react'
import Usage from '../exercises-final/07'
// import Usage from '../exercises/07'

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
  const {container} = render(<Usage />)
  try {
    expect(React.useDebugValue).toHaveBeenCalled()
    expect(React.useDebugValue).toHaveBeenCalledWith(
      expect.stringContaining('max-width: 699px'),
    )
    expect(React.useDebugValue).toHaveBeenCalledWith(
      expect.stringContaining('max-width: 999px'),
    )
    expect(React.useDebugValue).toHaveBeenCalledWith(
      expect.stringContaining('min-width: 1000px'),
    )
  } catch (error) {
    //
    //
    //
    // these comment lines are just here to keep the next line out of the codeframe
    // so it doesn't confuse people when they see the error message twice.
    error.message = `🚨  ${chalk.red(
      `Make sure to call \`useDebugValue\` with the formatted value`,
    )}\n\n${error.message}`

    throw error
  }

  const box = container.querySelector('[style]')

  window.resizeTo(1001, 1001)
  expect(box).toHaveStyle(`background-color: green;`)

  window.resizeTo(800, 800)
  expect(box).toHaveStyle(`background-color: yellow;`)

  window.resizeTo(600, 600)
  expect(box).toHaveStyle(`background-color: red;`)
})
