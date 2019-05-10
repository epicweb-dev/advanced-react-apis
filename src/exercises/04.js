// useContext: Caching response data in context
import React from 'react'
import fetchPokemon from '../fetch-pokemon'

// 🐨 Create a PokemonCacheStateContext
// 🐨 Create a PokemonCacheDispatchContext

function PokemonCacheProvider(props) {
  // 🐨 useReducer right here with pokemonCacheReducer
  // 💰 you can grab the one that's in PokemonInfo

  // 🐨 return both of your context providers (nested)
  // 💰 the order is irrelevent.
  // 💰 make sure you render {props.children} in the inner-most provider
  return props.children
}

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
  // 🐨 get the cache from useContext with PokemonCacheStateContext
  // 🐨 get the dispatch from useContext with PokemonCacheDispatchContext
  const cachedPokemon = cache[pokemonName]

  const asyncCallback = React.useCallback(() => {
    if (!pokemonName) {
      return Promise.resolve(null)
    }
    if (cachedPokemon) {
      return Promise.resolve(cachedPokemon)
    } else {
      return fetchPokemon(pokemonName).then(pokemonData => {
        dispatch({type: 'ADD_POKEMON', pokemonName, pokemonData})
        return pokemonData
      })
    }
  }, [cachedPokemon, dispatch, pokemonName])

  const state = useAsync(asyncCallback)
  const {data: pokemon, loading, error} = state

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
      {loading ? (
        '...'
      ) : error ? (
        'ERROR (check your developer tools network tab)'
      ) : pokemonName ? (
        <pre>{JSON.stringify(pokemon || 'Unknown', null, 2)}</pre>
      ) : (
        'Submit a pokemon'
      )}
    </div>
  )
}

function PreviousPokemon({onSelect}) {
  // 🐨 get the cache from useContext with PokemonCacheStateContext
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

/*
🦉 Elaboration & Feedback
After the instruction, copy the URL below into your browser and fill out the form:
http://ws.kcd.im/?ws=advanced%20react%20hooks&e=04&em=
*/

////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

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

function Usage() {
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
      <PokemonCacheProvider>
        <div style={{display: 'flex'}}>
          <PreviousPokemon onSelect={handleSelect} />
          <div style={{marginLeft: 10}} data-testid="pokemon-display">
            <PokemonInfo pokemonName={submittedPokemon} />
          </div>
        </div>
      </PokemonCacheProvider>
    </div>
  )
}
Usage.title = 'useContext: Caching response data in context'

export default Usage
