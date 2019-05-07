import React from 'react'

// if there have been 20 calls of a given effect in 3 seconds then that's probably a runaway
const RECORDS = 20
const TIME_LIMIT = 3000

throttleEffectHook('useEffect')
throttleEffectHook('useLayoutEffect')

function throttleEffectHook(hookName) {
  const originalHook = React[hookName]
  let useEffectCalls = {}
  React[hookName] = function useThrottledHook(...args) {
    const [fn] = args
    const fnDef = fn.toString()
    useEffectCalls[fnDef] = useEffectCalls[fnDef] || {calls: []}
    const oldestCall = useEffectCalls[fnDef].calls.slice(-1)[0]
    const currentCall = {time: Date.now(), args}
    const pastTime = Date.now() - TIME_LIMIT
    if (
      useEffectCalls[fnDef].calls.length >= RECORDS - 1 &&
      oldestCall.time > pastTime
    ) {
      const allRecentCallDependencies = [
        currentCall,
        ...useEffectCalls[fnDef].calls,
      ].map(c => c.args[1])
      const messages = [
        `The following effect callback was invoked ${RECORDS} times in ${TIME_LIMIT}ms`,
        '\n',
        fnDef,
      ]
      if (allRecentCallDependencies.some(Boolean)) {
        messages.push(
          '\n',
          `Here are the arguments this effect was called with recently:`,
          allRecentCallDependencies,
        )
        if (allRecentCallDependencies.some(deps => !deps.every(isPrimitive))) {
          messages.push(
            '\n',
            `It looks like some of these values are not primitive values. If those objects/arrays/functions are initialized during rendering, you need to memoize them using React.useMemo or React.useCallback`,
          )
        }
      } else {
        messages.push(
          '\n',
          `This effect is not called with a dependencies argument and probably should. Start by adding \`[]\` as a second argument to the ${hookName} call, then add any other dependencies as elements to that array.`,
        )
      }
      console.warn(...messages)
      throw new Error(
        `Uh oh... Looks like we've got a runaway ${hookName}. Check the console for more info. Make sure the ${hookName} is being passed the right dependencies. (Note, this error message is from Kent, not React 👋)`,
      )
    }
    useEffectCalls[fnDef].calls = useEffectCalls[fnDef].calls.slice(0, RECORDS)
    useEffectCalls[fnDef].calls.push(currentCall)
    return originalHook.apply(React, args)
  }
}

function isPrimitive(val) {
  return val == null || /^[sbn]/.test(typeof val)
}
