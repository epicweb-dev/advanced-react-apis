// useDebugValue: useMedia
// http://localhost:3000/isolated/final-ts/06.tsx

import * as React from 'react'

function useMedia(query: string, initialState: boolean = false): boolean {
  const [state, setState] = React.useState(initialState)
  React.useDebugValue(`\`${query}\` => ${state}`)

  React.useEffect(() => {
    let mounted = true
    const mql: MediaQueryList = window.matchMedia(query)
    function onChange(): void {
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

function Box(): JSX.Element {
  const isBig = useMedia('(min-width: 1000px)')
  const isMedium = useMedia('(max-width: 999px) and (min-width: 700px)')
  const isSmall = useMedia('(max-width: 699px)')
  const color = isBig
    ? 'green'
    : isMedium
    ? 'yellow'
    : isSmall
    ? 'red'
    : 'inherit'

  return <div style={{width: 200, height: 200, backgroundColor: color}} />
}

function App(): JSX.Element {
  return <Box />
}

export default App
