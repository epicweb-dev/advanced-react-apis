// useContext: Caching response data in context
// 💯 caching in a context provider (final)
// http://localhost:3000/isolated/final/03.extra-2.js

// you can edit this here and look at the isolated page or you can copy/paste
// this in the regular exercise file.

import React from 'react'
import fetchPokemon from '../fetch-pokemon'
import {
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
} from '../pokemon-components'
import {useAsync} from '../utils'

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
    return (
      <div>
        There was an error:{' '}
        <pre style={{whiteSpace: 'normal'}}>{error.message}</pre>
      </div>
    )
  } else if (status === 'resolved') {
    return (
      <div>
        <div className="pokemon-info__img-wrapper">
          <img src={pokemon.image} alt={pokemon.name} />
        </div>
        <PokemonDataView pokemon={pokemon} />
      </div>
    )
  }
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

function PokemonSection({onSelect, submittedPokemon}) {
  return (
    <PokemonCacheProvider>
      <div style={{display: 'flex'}}>
        <PreviousPokemon onSelect={onSelect} />
        <div className="pokemon-info" style={{marginLeft: 10}}>
          <PokemonInfo pokemonName={submittedPokemon} />
        </div>
      </div>
    </PokemonCacheProvider>
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
        submittedPokemon={submittedPokemonName}
      />
    </div>
  )
}

export default App
