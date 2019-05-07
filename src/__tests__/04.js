import React from 'react'
import chalk from 'chalk'
import {render, fireEvent, waitForDomChange} from 'react-testing-library'
import Usage from '../exercises-final/04'
// import Usage from '../exercises/04'

beforeAll(() => {
  jest
    .spyOn(window, 'fetch')
    .mockImplementation(() =>
      Promise.resolve({json: () => Promise.resolve({data: {pokemon: {}}})}),
    )
})

afterAll(() => {
  window.fetch.mockRestore()
})

beforeEach(() => {
  window.fetch.mockClear()
})

test('displays the pokemon', async () => {
  window.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve({data: {pokemon: {id: 'jeffry-id'}}}),
    }),
  )
  const {getByLabelText, getByText, getByTestId} = render(<Usage />)
  const input = getByLabelText(/pokemon/i)
  const submit = getByText(/submit/i)

  // verify that an initial request is made when mounted
  fireEvent.change(input, {target: {value: 'jeffry'}})
  fireEvent.click(submit)
  await waitForDomChange(
    () => expect(getByTestId('pokemon-display')).toHaveTextContent('jeffry-id'),
    {timeout: 100},
  )
  expect(window.fetch).toHaveBeenCalledTimes(1)
  expect(window.fetch).toHaveBeenCalledWith('https://graphql-pokemon.now.sh', {
    method: 'POST',
    headers: {'content-type': 'application/json;charset=UTF-8'},
    // if this assertion fails, make sure that the pokemon name is being passed
    body: expect.stringMatching(/jeffry/),
  })
  window.fetch.mockClear()

  // verify that a request is made when props change
  window.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      json: () => Promise.resolve({data: {pokemon: {id: 'id-that-is-fake'}}}),
    }),
  )
  fireEvent.change(input, {target: {value: 'fred'}})
  fireEvent.click(submit)
  await waitForDomChange(
    () =>
      expect(getByTestId('pokemon-display')).toHaveTextContent(
        'id-that-is-fake',
      ),
    {timeout: 100},
  )
  expect(window.fetch).toHaveBeenCalledTimes(1)
  expect(window.fetch).toHaveBeenCalledWith('https://graphql-pokemon.now.sh', {
    method: 'POST',
    headers: {'content-type': 'application/json;charset=UTF-8'},
    // if this assertion fails, make sure that the pokemon name is being passed
    body: expect.stringMatching(/fred/),
  })
  window.fetch.mockClear()

  // verify that when props remain the same a request is not made
  fireEvent.click(submit)
  try {
    expect(window.fetch).not.toHaveBeenCalled()
  } catch (error) {
    //
    //
    //
    // these comment lines are just here to keep the next line out of the codeframe
    // so it doesn't confuse people when they see the error message twice.
    error.message = [
      chalk.red(
        `🚨  Make certain that you are providing a dependencies list in useEffect!`,
      ),
      error.message,
    ].join('\n')
    throw error
  }

  // verify that a previously requested pokemon is cached
  fireEvent.change(input, {target: {value: 'jeffry'}})
  fireEvent.click(submit)
  await waitForDomChange(
    () => expect(getByTestId('pokemon-display')).toHaveTextContent('jeffry-id'),
    {timeout: 100},
  )
  try {
    expect(window.fetch).toHaveBeenCalledTimes(0)
  } catch (error) {
    //
    //
    //
    // these comment lines are just here to keep the next line out of the codeframe
    // so it doesn't confuse people when they see the error message twice.
    error.message = `🚨  ${chalk.red(
      `Make sure the pokemon data is being cached by calling \`addToCache(pokemonData)\`.`,
    )}\n\n${error.message}`

    throw error
  }
  window.fetch.mockClear()

  // verify that an error renders an error
  window.fetch.mockImplementationOnce(() =>
    Promise.reject({
      error: 'some fake error',
    }),
  )

  fireEvent.change(input, {target: {value: 'george'}})
  fireEvent.click(submit)
  await waitForDomChange(() =>
    expect(getByTestId('pokemon-display')).toHaveTextContent(/error/i),
  )
})

// TODO: add a test that grabs the reducer (mock React.useReducer) and calls it directly
