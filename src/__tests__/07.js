import matchMediaPolyfill from 'mq-polyfill'
import React from 'react'
import {render} from 'react-testing-library'
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
  const {container} = render(<Usage />)
  const box = container.querySelector('[style]')

  window.resizeTo(600, 600)
  expect(box).toHaveStyle(`background-color: green;`)

  window.resizeTo(400, 400)
  expect(box).toHaveStyle(`background-color: yellow;`)

  window.resizeTo(200, 200)
  expect(box).toHaveStyle(`background-color: red;`)
})
