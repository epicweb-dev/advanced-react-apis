// useReducer: HTTP requests
import React from 'react'
import fetchPokemon from '../fetch-pokemon'

// 🐨 define your pokemonReducer here.
// 💰 Might I suggest the following action types:
//   LOADING
//   LOADED
//   ERROR
// 🦉 it's a good idea to add a default case handler that throws an error if
// an unsupported action type is supplied. That way you avoid typo issues!

function PokemonInfo({pokemonName}) {
  // 🐨 add a React.useReducer right here.
  // 💰 your initial state could be something like: {pokemon: null, loading: false, error: null}

  // 💣 destroy all three of these useStates
  const [pokemon, setPokemon] = React.useState(null)
  const [loading, setLoading] = React.useState(false)
  const [error, setError] = React.useState(null)

  React.useEffect(() => {
    // 🐨 dispatch a LOADING action here
    // 💣 remove all these sets
    setLoading(true)
    setError(null)
    setPokemon(null)
    fetchPokemon(pokemonName).then(
      pokemon => {
        // 🐨 dispatch a LOADED action here
        // 💰 you can pass the pokemon as part of the action you dispatch: dispatch({type: 'LOADED', pokemon})
        // 💣 remove all these sets
        setLoading(false)
        setError(null)
        setPokemon(pokemon)
      },
      error => {
        // 🐨 dispatch an ERROR action here
        // 💣 remove all these sets
        setLoading(false)
        setError(error)
        setPokemon(null)
      },
    )
  }, [pokemonName])

  return loading ? (
    '...'
  ) : error ? (
    'ERROR (check your developer tools network tab)'
  ) : (
    <pre>{JSON.stringify(pokemon || 'Unknown', null, 2)}</pre>
  )
}

/*
🦉 Elaboration & Feedback
After the instruction, copy the URL below into your browser and fill out the form:
http://ws.kcd.im/?ws=advanced%20react%20hooks&e=02&em=
*/

////////////////////////////////////////////////////////////////////
//                                                                //
//                 Don't make changes below here.                 //
// But do look at it to see how your code is intended to be used. //
//                                                                //
////////////////////////////////////////////////////////////////////

function Usage() {
  const [pokemonName, setPokemonName] = React.useState(null)
  function handleSubmit(e) {
    e.preventDefault()
    setPokemonName(e.target.elements.pokemonName.value)
  }
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="pokemonName-input">Pokemon Name (ie Pikachu)</label>
        <input id="pokemonName-input" name="pokemonName" />
        <button type="submit">Submit</button>
      </form>
      <div data-testid="pokemon-display">
        {pokemonName ? <PokemonInfo pokemonName={pokemonName} /> : null}
      </div>
    </div>
  )
}
Usage.title = 'useReducer: HTTP requests'

export default Usage
