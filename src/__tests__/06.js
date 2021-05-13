import matchMediaPolyfill from 'mq-polyfill'
import * as React from 'react'
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

// sorry, I just couldn't find a reliable way to test your implementation
// so this test just ensures you don't break anything 😅

test('works', () => {
  const {container} = render(<App />)

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
