// useDebugValue: useMedia
// 💯 use the format function
// http://localhost:3000/isolated/final/06.extra-1.tsx

import * as React from 'react'

const formatDebugValue = ({query, state}) => `\`${query}\` => ${state}`

function useMedia(query: string, initialState = false) {
  const [state, setState] = React.useState(initialState)
  React.useDebugValue({query, state}, formatDebugValue)

  React.useEffect(() => {
    let current = true
    const mql = window.matchMedia(query)
    function onChange() {
      if (!current) {
        return
      }
      setState(Boolean(mql.matches))
    }

    // unfortunately, there's no polyfill for addEventListener on media queries
    // which we need for our jsdom-based tests. So we're using addListener here
    mql.addListener(onChange)
    setState(mql.matches)

    return () => {
      current = false
      // same issue with the removeListener as well
      mql.removeListener(onChange)
    }
  }, [query])

  return state
}

function Box() {
  const isBig = useMedia('(min-width: 1000px)')
  const isMedium = useMedia('(max-width: 999px) and (min-width: 700px)')
  const isSmall = useMedia('(max-width: 699px)')
  const color = isBig ? 'green' : isMedium ? 'yellow' : isSmall ? 'red' : null

  return <div style={{width: 200, height: 200, backgroundColor: color}} />
}

function App() {
  return <Box />
}

export default App
