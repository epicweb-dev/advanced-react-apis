// useCallback: custom hooks
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from '../pokemon'

function asyncReducer(state, action) {
  const {type, data, error} = action
  switch (type) {
    case 'idle': {
      return {...state, data: null, status: 'idle', error: null}
    }
    case 'pending': {
      return {...state, data: null, status: 'pending', error: null}
    }
    case 'resolved': {
      return {...state, data, status: 'resolved', error: null}
    }
    case 'rejected': {
      return {...state, data: null, status: 'rejected', error}
    }
    default:
      throw new Error(`Unhandled action type:${type}`)
  }
}

function PokemonInfo({pokemonName}) {
  const [state, dispatch] = React.useReducer(asyncReducer, {
    data: null,
    error: null,
    status: 'idle',
  })
  window.state = state
  React.useEffect(() => console.log(state), [state])

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    dispatch({type: 'pending'})
    fetchPokemon(pokemonName).then(
      pokemon => {
        dispatch({type: 'resolved', data: pokemon})
      },
      error => {
        dispatch({type: 'rejected', error})
      },
    )
  }, [pokemonName])

  // 🐨 this will change from "pokemon" to "data"
  const {data, status, error} = state

  if (status === 'idle' || !pokemonName) {
    return 'Submit a pokemon'
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'rejected') {
    throw error
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={data} />
  }

  throw new Error('This should be impossible')
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')
  const handleSubmit = newPokemonName => setPokemonName(newPokemonName)
  const handleReset = () => setPokemonName('')

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonErrorBoundary onReset={handleReset} resetKeys={[pokemonName]}>
          <PokemonInfo pokemonName={pokemonName} />
        </PokemonErrorBoundary>
      </div>
    </div>
  )
}

function AppWithUnmountCheckbox() {
  const [mountApp, setMountApp] = React.useState(true)
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={mountApp}
          onChange={e => setMountApp(e.target.checked)}
        />{' '}
        Mount Component
      </label>
      <hr />
      {mountApp ? <App /> : null}
    </div>
  )
}

export default AppWithUnmountCheckbox
