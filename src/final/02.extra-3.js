// useCallback: custom hooks
// 💯 make safeDispatch with useCallback, useRef, and useEffect
// http://localhost:3000/isolated/final/02.extra-3.js

import React from 'react'
import {ErrorBoundary} from '../utils'
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
} from '../pokemon'

function useSafeDispatch(dispatch) {
  const mounted = React.useRef(false)

  React.useLayoutEffect(() => {
    mounted.current = true
    return () => (mounted.current = false)
  }, [])

  return React.useCallback(
    (...args) => (mounted.current ? dispatch(...args) : void 0),
    [dispatch],
  )
}

function asyncReducer(state, action) {
  switch (action.type) {
    case 'pending': {
      return {status: 'pending', data: null, error: null}
    }
    case 'resolved': {
      return {status: 'resolved', data: action.data, error: null}
    }
    case 'rejected': {
      return {status: 'rejected', data: null, error: action.error}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function useAsync() {
  const [state, unsafeDispatch] = React.useReducer(asyncReducer, {
    status: 'idle',
    data: null,
    error: null,
  })

  const dispatch = useSafeDispatch(unsafeDispatch)

  const {data, error, status} = state

  const run = React.useCallback(
    promise => {
      dispatch({type: 'pending'})
      promise.then(
        data => {
          dispatch({type: 'resolved', data})
        },
        error => {
          dispatch({type: 'rejected', error})
        },
      )
    },
    [dispatch],
  )

  return {
    error,
    status,
    data,
    run,
  }
}

function PokemonInfo({pokemonName}) {
  const {data: pokemon, status, error, run} = useAsync()

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    return run(fetchPokemon(pokemonName))
  }, [pokemonName, run])

  if (status === 'idle') {
    return 'Submit a pokemon'
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'rejected') {
    throw error
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }

  throw new Error('This should be impossible')
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
  const [pokemonName, setPokemonName] = React.useState(null)

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <ErrorBoundary FallbackComponent={ErrorFallback}>
          <PokemonInfo pokemonName={pokemonName} />
        </ErrorBoundary>
      </div>
    </div>
  )
}

export default App
