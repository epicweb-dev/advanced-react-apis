// useReducer: HTTP requests
// 💯 using useCallback to empower the user to customize memoization
import React from 'react'
import fetchPokemon from '../fetch-pokemon'

function asyncReducer(state, action) {
  switch (action.type) {
    case 'LOADING': {
      return {loading: true, data: null, error: null}
    }
    case 'LOADED': {
      return {loading: false, data: action.data, error: null}
    }
    case 'ERROR': {
      return {loading: false, data: null, error: action.error}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function useAsync(asyncCallback) {
  const [state, dispatch] = React.useReducer(asyncReducer, {
    data: null,
    loading: false,
    error: null,
  })
  React.useEffect(() => {
    dispatch({type: 'LOADING'})
    asyncCallback().then(
      data => {
        dispatch({type: 'LOADED', data})
      },
      error => {
        dispatch({type: 'ERROR', error})
      },
    )
  }, [asyncCallback])
  return state
}

function PokemonInfo({pokemonName}) {
  const asyncCallback = React.useCallback(() => fetchPokemon(pokemonName), [
    pokemonName,
  ])
  const state = useAsync(asyncCallback)
  const {data: pokemon, loading, error} = state

  return loading ? (
    '...'
  ) : error ? (
    'ERROR (check your developer tools network tab)'
  ) : (
    <pre>{JSON.stringify(pokemon || 'Unknown', null, 2)}</pre>
  )
}

function Usage() {
  const [pokemonName, setPokemonName] = React.useState(null)
  function handleSubmit(e) {
    e.preventDefault()
    setPokemonName(e.target.elements.pokemonName.value)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pokemonName-input">Pokemon Name (ie Pikachu)</label>
        <input id="pokemonName-input" name="pokemonName" />
        <button type="submit">Submit</button>
      </form>
      <div data-testid="pokemon-display">
        {pokemonName ? <PokemonInfo pokemonName={pokemonName} /> : null}
      </div>
    </div>
  )
}
Usage.title = 'useReducer: HTTP requests'

export default Usage
