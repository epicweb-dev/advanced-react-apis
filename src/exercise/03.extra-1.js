// useContext: Caching response data in context
// http://localhost:3000/isolated/exercise/03.extra-1.js

// you can edit this here and look at the isolated page or you can copy/paste
// this in the regular exercise file.

import React from 'react'
import fetchPokemon from '../fetch-pokemon'

// 🐨 Create a PokemonCacheContext

// 🐨 create a PokemonCacheProvider function
// 🐨 useReducer with pokemonCacheReducer in your PokemonCacheProvider
// 💰 you can grab the one that's in PokemonInfo
// 🐨 return your context provider with the value assigned to what you get back from useReducer
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
  // 💣 remove the useReducer here
  const [cache, dispatch] = React.useReducer(pokemonCacheReducer, {})
  // 🐨 get the cache and dispatch from useContext with PokemonCacheContext
  const cachedPokemon = cache[pokemonName]

  const asyncCallback = React.useCallback(() => {
    if (!pokemonName) {
      return Promise.resolve(null)
    }
    if (cachedPokemon) {
      return Promise.resolve(cachedPokemon)
    } else {
      return fetchPokemon(pokemonName).then(pokemonData => {
        if (pokemonData) {
          dispatch({type: 'ADD_POKEMON', pokemonName, pokemonData})
        }
        return pokemonData
      })
    }
  }, [cachedPokemon, dispatch, pokemonName])

  const state = useAsync(asyncCallback)
  const {data: pokemon, status, error} = state

  let info
  if (status === 'idle') {
    info = 'Submit a pokemon'
  } else if (status === 'pending') {
    info = '...'
  } else if (status === 'rejected') {
    info = (
      <div>
        There was an error: <pre>{error.message}</pre>
      </div>
    )
  } else if (status === 'resolved') {
    info = <pre>{JSON.stringify(pokemon, null, 2)}</pre>
  }

  return (
    <div
      style={{
        height: 300,
        width: 300,
        overflow: 'scroll',
        backgroundColor: '#eee',
        borderRadius: 4,
        padding: 10,
      }}
    >
      {info}
    </div>
  )
}

function PreviousPokemon({onSelect}) {
  // 🐨 get the cache from useContext with PokemonCacheContext
  const cache = {}
  return (
    <div>
      Previous Pokemon
      <ul style={{listStyle: 'none', paddingLeft: 0}}>
        {Object.keys(cache).map(pokemonName => (
          <li key={pokemonName}>
            <button onClick={() => onSelect(pokemonName)}>{pokemonName}</button>
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
      <div style={{marginLeft: 10}} data-testid="pokemon-display">
        <PokemonInfo pokemonName={submittedPokemon} />
      </div>
    </div>
  )
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

function InvisibleButton(props) {
  return (
    <button
      type="button"
      style={{
        border: 'none',
        padding: 'inherit',
        fontSize: 'inherit',
        fontFamily: 'inherit',
        cursor: 'pointer',
        fontWeight: 'inherit',
      }}
      {...props}
    />
  )
}

function App() {
  const [{submittedPokemon, pokemonName}, setState] = React.useReducer(
    (state, action) => ({...state, ...action}),
    {submittedPokemon: '', pokemonName: ''},
  )

  function handleChange(e) {
    setState({pokemonName: e.target.value})
  }

  function handleSubmit(e) {
    e.preventDefault()
    setState({submittedPokemon: pokemonName.toLowerCase()})
  }

  function handleSelect(pokemonName) {
    setState({pokemonName, submittedPokemon: pokemonName})
  }

  return (
    <div style={{display: 'flex', flexDirection: 'column'}}>
      <form
        onSubmit={handleSubmit}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <label htmlFor="pokemonName-input">Pokemon Name</label>
        <small>
          Try{' '}
          <InvisibleButton onClick={() => handleSelect('pikachu')}>
            "pikachu"
          </InvisibleButton>
          {', '}
          <InvisibleButton onClick={() => handleSelect('charizard')}>
            "charizard"
          </InvisibleButton>
          {', or '}
          <InvisibleButton onClick={() => handleSelect('mew')}>
            "mew"
          </InvisibleButton>
        </small>
        <div>
          <input
            id="pokemonName-input"
            name="pokemonName"
            value={pokemonName}
            onChange={handleChange}
          />
          <button type="submit">Submit</button>
        </div>
      </form>
      <hr />
      <PokemonSection
        onSelect={handleSelect}
        submittedPokemon={submittedPokemon}
      />
    </div>
  )
}

export default App
