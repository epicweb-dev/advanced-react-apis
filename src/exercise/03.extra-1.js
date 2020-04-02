// useContext: Caching response data in context
// 💯 caching in a context provider (exercise)
// http://localhost:3000/isolated/exercise/03.extra-1.js

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

// 🐨 Create a PokemonCacheContext

// 🐨 create a PokemonCacheProvider function
// 🐨 useReducer with pokemonCacheReducer in your PokemonCacheProvider
// 💰 you can grab the one that's in PokemonInfo
// 🐨 return your context provider with the value assigned to what you get back from useReducer
// 💰 value={[cache, dispatch]}
// 💰 make sure you forward the props.children!

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

function PokemonInfo({pokemonName}) {
  // 💣 remove the useReducer here (or move it up to your PokemonCacheProvider)
  const [cache, dispatch] = React.useReducer(pokemonCacheReducer, {})
  // 🐨 get the cache and dispatch from useContext with PokemonCacheContext

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
  }, [cache, pokemonName, run, setData])

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
  // 🐨 get the cache from useContext with PokemonCacheContext
  const cache = {}
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
  // 🐨 wrap this in the PokemonCacheProvider so the PreviousPokemon
  // and PokemonInfo components have access to that context.
  return (
    <div style={{display: 'flex'}}>
      <PreviousPokemon onSelect={onSelect} />
      <div className="pokemon-info" style={{marginLeft: 10}}>
        <PokemonInfo pokemonName={submittedPokemon} />
      </div>
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
        submittedPokemon={submittedPokemonName}
      />
    </div>
  )
}

export default App
