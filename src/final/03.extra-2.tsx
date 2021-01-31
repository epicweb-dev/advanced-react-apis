// useContext: Caching response data in context
// 💯 caching in a context provider (final)
// http://localhost:3000/isolated/final/03.extra-2.tsx

// you can edit this here and look at the isolated page or you can copy/paste
// this in the regular exercise file.

import * as React from 'react'
import {useAsync} from '../utils'
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from '../pokemon'
import type {PokemonData} from '../types'

type PokemonCacheState = Record<string, PokemonData>
type PokemonCacheContextType = [
  PokemonCacheState,
  React.Dispatch<PokemonCacheAction>,
]
const PokemonCacheContext =
  React.createContext<PokemonCacheContextType>(undefined)

type PokemonCacheAction = {
  type: 'ADD_POKEMON'
  pokemonName: string
  pokemonData: PokemonData
}

function pokemonCacheReducer(
  state: PokemonCacheState,
  action: PokemonCacheAction,
) {
  switch (action.type) {
    case 'ADD_POKEMON': {
      return {...state, [action.pokemonName]: action.pokemonData}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function PokemonCacheProvider({children}: {children: React.ReactNode}) {
  const [cache, dispatch] = React.useReducer(pokemonCacheReducer, {})
  return (
    <PokemonCacheContext.Provider value={[cache, dispatch]}>
      {children}
    </PokemonCacheContext.Provider>
  )
}

function usePokemonCache() {
  const context = React.useContext(PokemonCacheContext)
  if (!context) {
    throw new Error(
      'usePokemonCache must be used within a PokemonCacheProvider',
    )
  }
  return context
}

function PokemonSection({onSelect, pokemonName}) {
  return (
    <PokemonCacheProvider>
      <div style={{display: 'flex'}}>
        <PreviousPokemon onSelect={onSelect} />
        <div className="pokemon-info">
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

function PokemonInfo({pokemonName}: {pokemonName: string}) {
  const [cache, dispatch] = usePokemonCache()

  const {data: pokemon, status, error, run, setData} = useAsync<PokemonData>()

  React.useEffect(() => {
    if (!pokemonName) {
      return
    } else if (cache[pokemonName]) {
      setData(cache[pokemonName])
    } else {
      run(
        fetchPokemon(pokemonName).then(pokemonData => {
          dispatch({type: 'ADD_POKEMON', pokemonName, pokemonData})
          return pokemonData
        }),
      )
    }
  }, [cache, dispatch, pokemonName, run, setData])

  switch (status) {
    case 'idle':
      return <span>Submit a pokemon</span>
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />
    case 'rejected':
      throw error
    case 'resolved':
      return <PokemonDataView pokemon={pokemon} />
    default:
      throw new Error('This should be impossible')
  }
}

function PreviousPokemon({onSelect}: {onSelect: (name: string) => void}) {
  const [cache] = usePokemonCache()
  return (
    <div>
      Previous Pokemon
      <ul style={{listStyle: 'none', paddingLeft: 0}}>
        {Object.keys(cache).map(pokemonName => (
          <li key={pokemonName} style={{margin: '4px auto'}}>
            <button
              style={{width: '100%'}}
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

function App() {
  const [pokemonName, setPokemonName] = React.useState(null)

  function handleSubmit(newPokemonName: string) {
    setPokemonName(newPokemonName)
  }

  function handleSelect(newPokemonName: string) {
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
