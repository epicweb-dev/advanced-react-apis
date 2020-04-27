import React from 'react'

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

  const setData = React.useCallback(
    data => dispatch({type: 'resolved', data}),
    [dispatch],
  )
  const setError = React.useCallback(
    error => dispatch({type: 'rejected', error}),
    [dispatch],
  )

  return {
    setData,
    setError,
    error,
    status,
    data,
    run,
  }
}

class ErrorBoundary extends React.Component {
  state = {error: null}
  static getDerivedStateFromError(error) {
    return {error}
  }
  componentDidUpdate(prevProps, prevState) {
    // we're re-rendering. Let's try to clear our state and render children again
    if (prevState.error && prevState.error === this.state.error) {
      this.setState({error: null})
    }
  }
  render() {
    const {error} = this.state
    if (error) {
      return <this.props.FallbackComponent error={error} />
    }

    return this.props.children
  }
}

export {useAsync, ErrorBoundary}
