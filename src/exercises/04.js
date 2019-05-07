// useContext: Caching response data in context
import React from 'react'
import deepEqual from 'dequal'

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

function useDeepCompareMemoize(value) {
  const ref = React.useRef()

  if (!deepEqual(value, ref.current)) {
    ref.current = value
  }

  return ref.current
}

function useFetch(url, config = {}) {
  const asyncCallback = React.useCallback(
    () =>
      window
        .fetch(url, {
          ...config,
          headers: {
            'content-type': 'application/json;charset=UTF-8',
            ...config.headers,
          },
        })
        .then(r => r.json())
        .then(response => response.data),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    useDeepCompareMemoize([url, config]),
  )
  return useAsync(asyncCallback)
}

function useFetchPokemon({name}) {
  const pokemonQuery = `
    query ($name: String) {
      pokemon(name: $name) {
        id
        number
        name
        attacks {
          special {
            name
            type
            damage
          }
        }
      }
    }
  `

  const state = useFetch('https://graphql-pokemon.now.sh', {
    // learn more about this API here: https://graphql-pokemon.now.sh/
    method: 'POST',
    body: JSON.stringify({
      query: pokemonQuery,
      variables: {name},
    }),
  })
  return {...state, pokemon: state.data ? state.data.pokemon : null}
}

function PokemonInfo({pokemonName}) {
  const {pokemon, loading, error} = useFetchPokemon({name: pokemonName})

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
Usage.title = 'useContext: Caching response data in context'

export default Usage
