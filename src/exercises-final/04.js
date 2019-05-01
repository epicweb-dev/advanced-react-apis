// useContext: Caching response data in context
import React from 'react'

const PokemonCacheContext = React.createContext()

function PokemonCacheProvider(props) {
  const [cache, setCache] = React.useState({})
  const value = React.useMemo(() => {
    return {
      cache,
      setCache,
    }
  }, [cache])
  return <PokemonCacheContext.Provider value={value} {...props} />
}

function usePokemonFromCache(pokemonName) {
  const context = React.useContext(PokemonCacheContext)
  if (!context) {
    throw new Error(
      'usePokemonFromCache must be used within a PokemonCacheProvider',
    )
  }
  const {cache, setCache} = context
  const pokemon = cache[pokemonName]
  const addToCache = React.useCallback(
    pokemonData => setCache({...cache, [pokemonName]: pokemonData}),
    [cache, pokemonName, setCache],
  )
  return {
    pokemon,
    addToCache,
  }
}

function PokemonInfo({pokemonName}) {
  const {pokemon: cachedPokemon, addToCache} = usePokemonFromCache(pokemonName)

  const asyncCallback = React.useCallback(() => {
    if (cachedPokemon) {
      return Promise.resolve(cachedPokemon)
    } else {
      return fetchPokemon(pokemonName).then(pokemonData => {
        addToCache(pokemonData)
        return pokemonData
      })
    }
  }, [addToCache, cachedPokemon, pokemonName])

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

function fetchPokemon(name) {
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

  return window
    .fetch('https://graphql-pokemon.now.sh', {
      // learn more about this API here: https://graphql-pokemon.now.sh/
      method: 'POST',
      headers: {
        'content-type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify({
        query: pokemonQuery,
        variables: {name},
      }),
    })
    .then(r => r.json())
    .then(response => response.data.pokemon)
}

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

function Usage() {
  const [pokemonName, setPokemonName] = React.useState(null)
  function handleSubmit(e) {
    e.preventDefault()
    setPokemonName(e.target.elements.pokemonName.value)
  }
  return (
    <PokemonCacheProvider>
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
    </PokemonCacheProvider>
  )
}
Usage.title = 'useContext: Caching response data in context'

export default Usage
