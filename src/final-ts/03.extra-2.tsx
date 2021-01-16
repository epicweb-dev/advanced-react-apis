// useContext: Caching response data in context
// 💯 caching in a context provider (final)
// http://localhost:3000/isolated/final-ts/03.extra-2.tsx

// you can edit this here and look at the isolated page or you can copy/paste
// this in the regular exercise file.

import * as React from 'react'
import {useAsync} from '../utils'
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
  IPokemon,
} from '../pokemon'

type PokemonCacheContextInterface = readonly [
  cache: Record<string, IPokemon>,
  dispatch: React.Dispatch<Action>,
]
const PokemonCacheContext = React.createContext<PokemonCacheContextInterface>(
  undefined!,
)

type PokemonName = string
type State = Record<PokemonName, IPokemon>
type Action = {
  type: 'ADD_POKEMON'
  pokemonData: IPokemon
  pokemonName: PokemonName
}
const pokemonCacheReducer: React.Reducer<State, Action> = (state, action) => {
  switch (action.type) {
    case 'ADD_POKEMON': {
      return {...state, [action.pokemonName]: action.pokemonData}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function PokemonCacheProvider(props: {
  children?: React.ReactNode
}): JSX.Element {
  const [cache, dispatch] = React.useReducer(pokemonCacheReducer, {})
  return (
    <PokemonCacheContext.Provider
      value={[cache, dispatch] as const}
      {...props}
    />
  )
}

function usePokemonCache(): PokemonCacheContextInterface {
  const context = React.useContext(PokemonCacheContext)
  if (!context) {
    throw new Error(
      'usePokemonCache must be used within a PokemonCacheProvider',
    )
  }
  return context
}

interface PokemonInfoProps {
  pokemonName: string
}
function PokemonInfo({pokemonName}: PokemonInfoProps): JSX.Element {
  const [cache, dispatch] = usePokemonCache()

  const {state, run, setData} = useAsync<IPokemon>({
    status: pokemonName ? 'pending' : 'idle',
    error: null,
    data: null,
  })

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

  switch (state.status) {
    case 'idle':
      return <>Submit a pokemon</>

    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />

    case 'rejected':
      throw state.error

    case 'resolved':
      return <PokemonDataView pokemon={state.data} />

    default:
      throw new Error('This should be impossible')
  }
}

interface PreviousPokemonProps {
  onSelect: (pokemonName: string) => void
}
function PreviousPokemon({onSelect}: PreviousPokemonProps): JSX.Element {
  const [cache] = usePokemonCache()
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

interface PokemonSectionProps {
  onSelect: (pokemonName: string) => void
  pokemonName: string
}
function PokemonSection({
  onSelect,
  pokemonName,
}: PokemonSectionProps): JSX.Element {
  return (
    <PokemonCacheProvider>
      <div style={{display: 'flex'}}>
        <PreviousPokemon onSelect={onSelect} />
        <div className="pokemon-info">
          <PokemonErrorBoundary
            onReset={() => onSelect('')}
            resetKeys={[pokemonName]}
          >
            <PokemonInfo pokemonName={pokemonName} />
          </PokemonErrorBoundary>
        </div>
      </div>
    </PokemonCacheProvider>
  )
}

function App(): JSX.Element {
  const [pokemonName, setPokemonName] = React.useState<string>('')

  function handleSubmit(newPokemonName: string): void {
    setPokemonName(newPokemonName)
  }

  function handleSelect(newPokemonName: string): void {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <PokemonSection onSelect={handleSelect} pokemonName={pokemonName} />
    </div>
  )
}

export default App
