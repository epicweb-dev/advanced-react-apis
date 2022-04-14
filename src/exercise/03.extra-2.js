// useContext: Caching response data in context
// 💯 caching in a context provider (exercise)
// http://localhost:3000/isolated/exercise/03.extra-2.js

// you can edit this here and look at the isolated page or you can copy/paste
// this in the regular exercise file.

import * as React from 'react'
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from '../pokemon'
import { useAsync } from '../utils'

const PokemonCacheContext = React.createContext() // returns an array with [obj, func]

const PokemonCacheProvider = props => {
  const [cache, dispatch] = React.useReducer(pokemonCacheReducer, {})
  // are the properties available on the PokemonCacheProvider, which is wrapping the PokemonSection, so it contains all the properties available on that
  console.log('what are the props = ', props)
  return <PokemonCacheContext.Provider value={[cache, dispatch]} {...props} />
}

const usePokemonCache = () => {
  const context = React.useContext(PokemonCacheContext)
  if (!context) {
    throw new Error(
      'usePokemonCache must be used within the PokemonCacheProvider',
    )
  }
  return context // always remember to return the context! Otherwise will break
}

function pokemonCacheReducer(state, action) {
  switch (action.type) {
    case 'ADD_POKEMON': {
      return { ...state, [action.pokemonName]: action.pokemonData }
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function PokemonInfo({ pokemonName }) {
  const [cache, dispatch] = usePokemonCache()
  const { data: pokemon, status, error, run, setData } = useAsync()

  React.useEffect(() => {
    if (!pokemonName) {
      return
    } else if (cache[pokemonName]) {
      setData(cache[pokemonName])
    } else {
      run(
        fetchPokemon(pokemonName).then(pokemonData => {
          dispatch({ type: 'ADD_POKEMON', pokemonName, pokemonData })
          return pokemonData
        }),
      )
    }
  }, [cache, dispatch, pokemonName, run, setData])

  if (status === 'idle') {
    return 'Submit a pokemon'
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'rejected') {
    throw error
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }
}

function PreviousPokemon({ onSelect }) {
  const [cache] = usePokemonCache()
  // cache without [cache] accesses the array that has two items within it {obj, func} - that is what the createContext hook returns
  // [cache] accesses the first item in the array, which is what we want to iterate through
  // if we just do cache without [], we will map through the array which has two items [0 - cache, 1 - function] - we don't want that,
  // we just want the first item, which is the [cache] which contains the pokemon being cached
  console.log("what's in the cache = ", cache)

  return (
    <div>
      Previous Pokemon
      <ul style={{ listStyle: 'none', paddingLeft: 0 }}>
        {Object.keys(cache).map(pokemonName => (
          <li key={pokemonName} style={{ margin: '4px auto' }}>
            <button
              style={{ width: '100%' }}
              onClick={() => onSelect(pokemonName)}
            >
              {pokemonName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function PokemonSection({ onSelect, pokemonName }) {
  // 🐨 wrap this in the PokemonCacheProvider so the PreviousPokemon
  // and PokemonInfo components have access to that context.
  return (
    <PokemonCacheProvider>
      <div style={{ display: 'flex' }}>
        <PreviousPokemon onSelect={onSelect} />
        <div className="pokemon-info" style={{ marginLeft: 10 }}>
          <PokemonErrorBoundary
            onReset={() => onSelect('')}
            resetKeys={[pokemonName]}
          >
            <PokemonInfo pokemonName={pokemonName} />
          </PokemonErrorBoundary>
        </div>
      </div>
    </PokemonCacheProvider>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState(null)

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleSelect(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <PokemonSection onSelect={handleSelect} pokemonName={pokemonName} />
    </div>
  )
}

export default App
