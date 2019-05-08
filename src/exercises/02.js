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
      <div style={{display: 'flex'}}>
        <div style={{marginLeft: 10}} data-testid="pokemon-display">
          <PokemonInfo pokemonName={submittedPokemon} />
        </div>
      </div>
    </div>
  )
}
Usage.title = 'useReducer: HTTP requests'

export default Usage
