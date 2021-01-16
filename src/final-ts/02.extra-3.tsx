// useCallback: custom hooks
// 💯 make safeDispatch with useCallback, useRef, and useEffect
// http://localhost:3000/isolated/final-ts/02.extra-3.tsx

import * as React from 'react'
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
  IPokemon,
} from '../pokemon'

//#region useAsync: a generic custom hook that would live in a separate module
export enum Status {
  IDLE = 'idle',
  PENDING = 'pending',
  RESOLVED = 'resolved',
  REJECTED = 'rejected',
}
interface FiniteState<
  Status extends 'idle' | 'pending' | 'resolved' | 'rejected',
  Data extends unknown = null,
  Err extends null | Error = null
> {
  status: Status
  data: Data
  error: Err
}

type State<Data> =
  | FiniteState<'idle'>
  | FiniteState<'pending'>
  | FiniteState<'resolved', Data>
  | FiniteState<'rejected', null, Error>

interface ActionType<
  Type extends 'idle' | 'pending' | 'resolved' | 'rejected'
> {
  type: Type
}

interface ActionIdle extends ActionType<Status.IDLE> {}
interface ActionPending extends ActionType<Status.PENDING> {}

interface ActionResolved<Data> extends ActionType<Status.RESOLVED> {
  data: Data
}

interface ActionRejected extends ActionType<Status.REJECTED> {
  error: Error
}

type Action<Data> =
  | ActionIdle
  | ActionPending
  | ActionResolved<Data>
  | ActionRejected

function useSafeDispatch<Dispatch extends (...args: any[]) => void>(
  dispatch: Dispatch,
): Dispatch {
  const mountedRef = React.useRef<boolean>(false)

  // to make this even more generic you should use the useLayoutEffect hook to
  // make sure that you are correctly setting the mountedRef.current immediately
  // after React updates the DOM. Even though this effect does not interact
  // with the dom another side effect inside a useLayoutEffect which does
  // interact with the dom may depend on the value being set
  React.useEffect(() => {
    mountedRef.current = true
    return () => {
      mountedRef.current = false
    }
  }, [])

  // eslint react-hooks/exhaustive-deps rule unfortunately is not abel to parse
  // through this typescript type casting syntax here, and therefore is raising
  // a warning. Do not worry, everything is still fine and dandy!
  // eslint-disable-next-line
  return React.useCallback(
    ((...args) => {
      if (mountedRef.current) {
        dispatch(...args)
      }
    }) as Dispatch,
    [dispatch],
    )
}

type AsyncReducer<Data> = React.Reducer<State<Data>, Action<Data>>
function asyncReducer<Data>(
  state: State<Data>,
  action: Action<Data>,
): State<Data> {
  switch (action.type) {
    case Status.IDLE:
      return {
        status: Status.IDLE,
        data: null,
        error: null,
      }

    case Status.PENDING:
      return {
        status: Status.PENDING,
        data: null,
        error: null,
      }

    case Status.RESOLVED:
      return {
        status: Status.RESOLVED,
        data: action.data,
        error: null,
      }

    case Status.REJECTED:
      return {
        status: Status.REJECTED,
        data: null,
        error: action.error,
      }

    default: {
      // @ts-ignore: exhaustive fallthrough checks: Property 'type' does not exist on type 'never'.
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

function useAsync<Data>(
  initialState: State<Data>,
): {
  state: State<Data>
  run: (promise: Promise<Data>) => void
} {
  const [state, unsafeDispatch] = React.useReducer<AsyncReducer<Data>>(
    asyncReducer,
    {
      // @ts-expect-error: 'status' is specified more than once, so this usage will be overwritten.
      status: Status.IDLE,
      data: null,
      error: null,
      ...initialState,
    },
  )

  const dispatch = useSafeDispatch(unsafeDispatch)

  const run = React.useCallback(
    (promise: Promise<Data>): void => {
      dispatch({type: Status.PENDING})
      promise.then(
        data => {
          dispatch({type: Status.RESOLVED, data})
        },
        error => {
          dispatch({type: Status.REJECTED, error})
        },
      )
    },
    [dispatch],
  )

  return {state, run}
}

//#region PokemonInfo
const PokemonInfo: React.VFC<{pokemonName?: string}> = ({pokemonName}) => {
  const {state, run} = useAsync<IPokemon>({
    status: pokemonName ? 'pending' : 'idle',
    data: null,
    error: null,
  })

  React.useEffect(() => {
    if (!pokemonName) {
      return
    }
    run(fetchPokemon(pokemonName))
  }, [pokemonName, run])

  switch (state.status) {
    case 'idle':
      return <>Submit a pokemon</>

    case 'pending':
      return <PokemonInfoFallback name={pokemonName!} />

    case 'rejected':
      throw state.error

    case 'resolved':
      return <PokemonDataView pokemon={state.data} />

    default:
      throw new Error('This should be impossible')
  }
}
//#endregion useAsync

//#endregion PokemonInfo

function App(): JSX.Element {
  const [pokemonName, setPokemonName] = React.useState<string>('')

  function handleSubmit(newPokemonName: string): void {
    setPokemonName(newPokemonName)
  }

  function handleReset(): void {
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

function AppWithUnmountCheckbox(): JSX.Element {
  const [mountApp, setMountApp] = React.useState<boolean>(true)
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
