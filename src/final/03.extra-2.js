// useContext: Caching response data in context
// 💯 caching in a context provider (final)
// http://localhost:3000/isolated/final/03.extra-2.js

// you can edit this here and look at the isolated page or you can copy/paste
// this in the regular exercise file.

import React from 'react'
import {useAsync, ErrorBoundary} from '../utils'
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
} from '../pokemon'

const PokemonCacheContext = React.createContext()

function pokemonCacheReducer(state, action) {
  switch (action.type) {
    case 'ADD_POKEMON': {
      return {...state, [action.pokemonName]: action.pokemonData}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function PokemonCacheProvider(props) {
  const [cache, dispatch] = React.useReducer(pokemonCacheReducer, {})
  return <PokemonCacheContext.Provider value={[cache, dispatch]} {...props} />
}

function PokemonInfo({pokemonName}) {
  const [cache, dispatch] = React.useContext(PokemonCacheContext)

  const {data: pokemon, status, error, run, setData} = useAsync()

  React.useEffect(() => {
    if (!pokemonName) {
      return
    } else if (cache[pokemonName]) {
      setData(cache[pokemonName])
    } else {
      console.log('calling fetchPokemon', pokemonName, cache)
      run(
        fetchPokemon(pokemonName).then(pokemonData => {
          dispatch({type: 'ADD_POKEMON', pokemonName, pokemonData})
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
    // this will be handled by an error boundary
    throw error
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }

  throw new Error('This should be impossible')
}

function PreviousPokemon({onSelect}) {
  const [cache] = React.useContext(PokemonCacheContext)
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

function PokemonSection({onSelect, pokemonName}) {
  return (
    <PokemonCacheProvider>
      <div style={{display: 'flex'}}>
        <PreviousPokemon onSelect={onSelect} />
        <div className="pokemon-info">
          <ErrorBoundary FallbackComponent={ErrorFallback}>
            <PokemonInfo pokemonName={pokemonName} />
          </ErrorBoundary>
        </div>
      </div>
    </PokemonCacheProvider>
  )
}

function ErrorFallback({error}) {
  return (
    <div role="alert">
      There was an error:{' '}
      <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
    </div>
  )
}

function App() {
  const [typedPokemonName, setTypedPokemonName] = React.useState(null)
  const [submittedPokemonName, setSubmittedPokemonName] = React.useState(null)

  function handleSubmit(newPokemonName) {
    setSubmittedPokemonName(newPokemonName)
  }

  function handleSelect(newPokemonName) {
    setTypedPokemonName(newPokemonName)
    setSubmittedPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm
        onSubmit={handleSubmit}
        typedPokemonName={typedPokemonName}
        onChange={setTypedPokemonName}
      />
      <hr />
      <PokemonSection
        onSelect={handleSelect}
        pokemonName={submittedPokemonName}
      />
    </div>
  )
}

export default App
