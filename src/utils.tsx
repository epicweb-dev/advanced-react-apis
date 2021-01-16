import * as React from 'react'

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

type State<Data> =
  | FiniteState<'idle'>
  | FiniteState<'pending'>
  | FiniteState<'resolved', Data>
  | FiniteState<'rejected', null, Error>

type Action<Data> =
  | ActionIdle
  | ActionPending
  | ActionResolved<Data>
  | ActionRejected

function useSafeDispatch<Dispatch extends (...args: any[]) => void>(
  dispatch: Dispatch,
): Dispatch {
  const mounted = React.useRef(false)

  React.useLayoutEffect(() => {
    mounted.current = true
    return () => {
      mounted.current = false
    }
  }, [])

  // eslint-disable-next-line react-hooks/exhaustive-deps
  return React.useCallback(
    ((...args) => {
      if (mounted.current) {
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
  initialState?: State<Data>,
): Readonly<{
  setData: (data: Data) => void
  setError: (error: Error) => void
  state: State<Data>
  run: (promise: Promise<Data>) => void
}> {
  const [state, unsafeDispatch] = React.useReducer<AsyncReducer<Data>>(
    asyncReducer,
    {
      status: Status.IDLE,
      data: null,
      error: null,
      ...initialState,
    },
  )

  const dispatch = useSafeDispatch(unsafeDispatch)

  const run = React.useCallback(
    (promise: Promise<Data>) => {
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

  const setData = React.useCallback(
    (data: Data) => dispatch({type: Status.RESOLVED, data}),
    [dispatch],
  )

  const setError = React.useCallback(
    (error: Error) => dispatch({type: Status.REJECTED, error}),
    [dispatch],
  )

  return {
    setData,
    setError,
    state,
    run,
  } as const
}

export {useAsync}
