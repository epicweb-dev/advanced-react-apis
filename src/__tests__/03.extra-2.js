import React from 'react'
import {render, screen, fireEvent, waitFor} from '@testing-library/react'
import App from '../final/03.extra-2'
// import App from '../exercise/03.extra-2'

beforeAll(() => {
  window.fetch.mockImplementation(() =>
    Promise.resolve({json: () => Promise.resolve({data: {pokemon: {}}})}),
  )
  jest.spyOn(console, 'error')
})

afterEach(() => {
  jest.resetAllMocks()
})

function buildPokemon(overrides) {
  return {
    name: 'jeffry',
    number: '777',
    image: '/some/image.png',
    attacks: {
      special: [
        {name: 'Super kick', type: 'Karate', damage: '122'},
        {name: 'Pound it', type: 'Cool', damage: '323'},
      ],
    },
    ...overrides,
  }
}

test('displays the pokemon', async () => {
  const fakePokemon = buildPokemon()
  window.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({data: {pokemon: fakePokemon}}),
    }),
  )
  render(<App />)
  const input = screen.getByLabelText(/pokemon/i)
  const submit = screen.getByText(/^submit$/i)

  // verify that an initial request is made when mounted
  fireEvent.change(input, {target: {value: fakePokemon.name}})
  fireEvent.click(submit)

  await screen.findByRole('heading', {name: new RegExp(fakePokemon.name, 'i')})

  expect(window.fetch).toHaveBeenCalledTimes(1)
  expect(window.fetch).toHaveBeenCalledWith('https://graphql-pokemon.now.sh', {
    method: 'POST',
    headers: {'content-type': 'application/json;charset=UTF-8'},
    // if this assertion fails, make sure that the pokemon name is being passed
    body: expect.stringMatching(new RegExp(fakePokemon.name, 'i')),
  })
  window.fetch.mockClear()

  // don't normally do this. We really should fix the reason this exists
  // (by caching promises), but that's more advanced than people are ready
  // for at this stage, so we'll do this for now...
  await waitFor(() => {})

  // verify that a request is made when props change
  const fakePokemon2 = buildPokemon({name: 'fred'})
  window.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve({data: {pokemon: fakePokemon2}}),
    }),
  )
  fireEvent.change(input, {target: {value: fakePokemon2.name}})
  fireEvent.click(submit)

  await screen.findByRole('heading', {name: new RegExp(fakePokemon2.name, 'i')})

  expect(window.fetch).toHaveBeenCalledWith('https://graphql-pokemon.now.sh', {
    method: 'POST',
    headers: {'content-type': 'application/json;charset=UTF-8'},
    // if this assertion fails, make sure that the pokemon name is being passed
    body: expect.stringMatching(new RegExp(fakePokemon2.name, 'i')),
  })
  expect(window.fetch).toHaveBeenCalledTimes(1)
  window.fetch.mockClear()

  // verify that when props remain the same a request is not made
  fireEvent.click(submit)

  await screen.findByRole('heading', {name: new RegExp(fakePokemon2.name, 'i')})

  expect(
    window.fetch,
    'Make certain that you are providing a dependencies list in useEffect!',
  ).not.toHaveBeenCalled()

  // verify that an error renders an error
  const fakeErrorMessage = 'some fake error'
  window.fetch.mockImplementationOnce(() =>
    Promise.resolve({
      ok: false,
      json: () =>
        Promise.resolve({data: {errors: [{message: fakeErrorMessage}]}}),
    }),
  )

  console.error.mockImplementation(() => {})

  fireEvent.change(input, {target: {value: 'george'}})
  fireEvent.click(submit)
  expect(await screen.findByRole('alert')).toHaveTextContent(fakeErrorMessage)
  expect(console.error).toHaveBeenCalledTimes(2)

  console.error.mockReset()
  window.fetch.mockClear()

  // use the cached value
  fireEvent.click(
    screen.getByRole('button', {name: new RegExp(fakePokemon.name, 'i')}),
  )
  expect(window.fetch).not.toHaveBeenCalled()
  await screen.findByRole('heading', {name: new RegExp(fakePokemon.name, 'i')})
})
