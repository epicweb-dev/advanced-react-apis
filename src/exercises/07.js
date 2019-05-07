// useMedia: useDebugValue
import React from 'react'

function useMedia(query, initialState = false) {
  const [state, setState] = React.useState(initialState)

  React.useEffect(() => {
    let mounted = true
    const mql = window.matchMedia(query)
    function onChange() {
      if (!mounted) {
        return
      }
      setState(Boolean(mql.matches))
    }

    mql.addListener(onChange)
    setState(mql.matches)

    return () => {
      mounted = false
      mql.removeListener(onChange)
    }
  }, [query])

  return state
}

function Box() {
  const isBig = useMedia('(min-width: 500px)')
  const isMedium = useMedia('(max-width: 499px) and (min-width: 300px)')
  const isSmall = useMedia('(max-width: 299px)')
  const color = isBig ? 'green' : isMedium ? 'yellow' : isSmall ? 'red' : null

  return <div style={{width: 200, height: 200, backgroundColor: color}} />
}

function Usage() {
  return <Box />
}
Usage.title = 'useMedia: useDebugValue'

export default Usage
