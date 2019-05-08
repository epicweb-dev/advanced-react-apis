// useReducer: HTTP requests
import React from 'react'
import fetchPokemon from '../fetch-pokemon'

function pokemonReducer(state, action) {
  switch (action.type) {
    case 'LOADING': {
      return {loading: true, pokemon: null, error: null}
    }
    case 'LOADED': {
      return {loading: false, pokemon: action.pokemon, error: null}
    }
    case 'ERROR': {
      return {loading: false, pokemon: null, error: action.error}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function PokemonInfo({pokemonName}) {
  const [state, dispatch] = React.useReducer(pokemonReducer, {
    pokemon: null,
    loading: false,
    error: null,
  })
  const {pokemon, loading, error} = state

  React.useEffect(() => {
    dispatch({type: 'LOADING'})
    fetchPokemon(pokemonName).then(
      pokemon => {
        dispatch({type: 'LOADED', pokemon})
      },
      error => {
        dispatch({type: 'ERROR', error})
      },
    )
  }, [pokemonName])

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
