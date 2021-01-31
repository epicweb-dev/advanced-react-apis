// useCallback: custom hooks
// http://localhost:3000/isolated/exercise/02.tsx

import * as React from 'react'
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from '../pokemon'
import {PokemonData} from '../types'

// 🦺 I'd change "PokemonState" to "AsyncState"
// Also rename the "pokemon" property to a more generic name like "data"
// 🦺 Also, now that we're making a "generic" hook,
// we'll want this type to be a generic that takes a DataType and uses that
// instead of "PokemonData"
type PokemonState =
  | {
      status: 'idle'
      pokemon?: null
      error?: null
    }
  | {
      status: 'pending'
      pokemon?: null
      error?: null
    }
  | {
      status: 'resolved'
      pokemon: PokemonData
      error: null
    }
  | {
      status: 'rejected'
      pokemon: null
      error: Error
    }

// 🦺 similar to above, this will need to be a generic type now and rename "pokemon" to "data"
// I'd also recommend renaming this
type PokemonAction =
  | {type: 'reset'}
  | {type: 'pending'}
  | {type: 'resolved'; pokemon: PokemonData}
  | {type: 'rejected'; error: Error}

// 🐨 this is going to be our generic asyncReducer
// 🦺 make this function a generic that accepts a DataType and passes that to
// your AsyncState and AsyncAction types
function pokemonInfoReducer(
  state: PokemonState,
  action: PokemonAction,
): PokemonState {
  switch (action.type) {
    case 'pending': {
      // 🐨 replace "pokemon" with "data"
      return {status: 'pending', pokemon: null, error: null}
    }
    case 'resolved': {
      // 🐨 replace "pokemon" with "data" (in the action too!)
      return {status: 'resolved', pokemon: action.pokemon, error: null}
    }
    case 'rejected': {
      // 🐨 replace "pokemon" with "data"
      return {status: 'rejected', pokemon: null, error: action.error}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function PokemonInfo({pokemonName}) {
  // 🐨 move all the code between the lines into a new useAsync function.
  // 💰 look below to see how the useAsync hook is supposed to be called
  // 🦺 useAsync will need to be a generic that takes the DataType which can
  // be inferred from the asyncCallback.
  // 💰 If you want some help, here's the function signature (or delete this
  // comment really quick if you don't want the spoiler)!
  // function useAsync<DataType>(
  //   asyncCallback: () => Promise<DataType> | null,
  //   dependencies: Array<unknown>,
  // ) {/* code in here */}

  // -------------------------- start --------------------------

  const [state, dispatch] = React.useReducer(pokemonInfoReducer, {
    status: 'idle',
    // 🐨 this will need to be "data" instead of "pokemon"
    pokemon: null,
    error: null,
  })

  React.useEffect(() => {
    // 💰 this first early-exit bit is a little tricky, so let me give you a hint:
    // const promise = asyncCallback()
    // if (!promise) {
    //   return
    // }
    // then you can dispatch and handle the promise etc...
    if (!pokemonName) {
      return
    }
    dispatch({type: 'pending'})
    fetchPokemon(pokemonName).then(
      pokemon => {
        dispatch({type: 'resolved', pokemon})
      },
      error => {
        dispatch({type: 'rejected', error})
      },
    )
    // 🐨 you'll accept dependencies as an array and pass that here.
    // 🐨 because of limitations with ESLint, you'll need to ignore
    // the react-hooks/exhaustive-deps rule. We'll fix this in an extra credit.
  }, [pokemonName])
  // --------------------------- end ---------------------------

  // 🐨 here's how you'll use the new useAsync hook you're writing:
  // const state = useAsync(() => {
  //   if (!pokemonName) {
  //     return
  //   }
  //   return fetchPokemon(pokemonName)
  // }, [pokemonName])
  // 🐨 this will change from "pokemon" to "data"
  const {pokemon, status, error} = state

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

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName: string) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

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
export default App
