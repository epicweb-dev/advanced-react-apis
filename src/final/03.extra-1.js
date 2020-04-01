// useContext: simple Counter
// 💯 caching in a context provider
// http://localhost:3000/isolated/final/03.extra.1.js

import React from 'react'
import fetchPokemon from '../fetch-pokemon'
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
  const addPokemon = React.useCallback(
    ({pokemonName, pokemonData}) =>
      dispatch({type: 'ADD_POKEMON', pokemonName, pokemonData}),
    [],
  )
  const getPokemon = React.useCallback(pokemonName => cache[pokemonName], [
    cache,
  ])
  const value = {addPokemon, getPokemon, cache}
  return <PokemonCacheContext.Provider value={value} {...props} />
}

function PokemonInfo({pokemonName}) {
  const {addPokemon, getPokemon} = React.useContext(PokemonCacheContext)

  const {data: pokemon, status, error, run, setData} = useAsync()

  React.useEffect(() => {
    if (!pokemonName) {
      setData(null)
    } else if (getPokemon(pokemonName)) {
      setData(getPokemon(pokemonName))
    } else {
      run(
        fetchPokemon(pokemonName).then(pokemonData => {
          addPokemon({pokemonName, pokemonData})
          return pokemonData
        }),
      )
    }
  }, [addPokemon, getPokemon, pokemonName, run, setData])

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
  const {cache} = React.useContext(PokemonCacheContext)
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
  return (
    <PokemonCacheProvider>
      <div style={{display: 'flex'}}>
        <PreviousPokemon onSelect={onSelect} />
        <div style={{marginLeft: 10}} data-testid="pokemon-display">
          <PokemonInfo pokemonName={submittedPokemon} />
        </div>
      </div>
    </PokemonCacheProvider>
  )
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
