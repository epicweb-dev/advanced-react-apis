// useDebugValue: useMedia
// 💯 use the format function
// http://localhost:3000/isolated/final/06.extra-1.js

import * as React from 'react'

const formatDebugValue = ({query, state}) => `\`${query}\` => ${state}`

function useMedia(query) {
  const mql = React.useMemo(() => window.matchMedia(query), [query])
  const [state, setState] = React.useState(() => mql.matches)
  React.useDebugValue({query, state}, formatDebugValue)

  React.useEffect(() => {
    let mounted = true
    function onChange() {
      if (!mounted) {
        return
      }
      setState(Boolean(mql.matches))
    }

    mql.addListener(onChange)

    return () => {
      mounted = false
      mql.removeListener(onChange)
    }
  }, [mql])

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
