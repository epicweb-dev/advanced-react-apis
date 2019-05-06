# Advanced React Hooks

You should already have experience with these hooks:

- `useState`
- `useRef`
- `useEffect`

Those hooks will get you far with building React apps. The more advanced hooks
you'll learn about in this workshop are awesome and will solve some real
problems with maintainability and performance in your apps.

## `useReducer`

- Simple Counter
- `useAsync`

## `useContext`

- Simple Shared Counter
- Cache `useAsync` result

TODO: Make sure to write tests that ensure there are no unnecessary rerenders

## `useLayoutEffect`

- Scrolling
- DOM measurement that makes visually observable changes to the DOM.
- Calculate the height of the textarea based on the text it contains.

## `useMemo`

- Covered in the `useContext` example

## `useCallback`

- Covered in the `useAsync` exercise

`useCallback` makes your code more complex 100% of the time and it _can_
actually make performance worse. There are literally only three situations where
it's useful:

1. When you're passing the function in the dependencies array for `useEffect` or
   `useLayoutEffect` (which you would need to do if you plan to use the function
   in the `useEffect` callback.)
2. When you're passing the function to a component that implements
   `React.memo`/`shouldComponentUpdate`/`PureComponent`
3. Debounce (leading)/Throttle...
   [Learn more](https://twitter.com/ryanecogswell/status/1123317802960601089)

You should really only use it when you _know_ that's how it'll be used and/or
you're building a reusable hook/component and you're not sure how your callback
will be used.

## `useImperativeHandle`

- Quickie to basically tell you never use it...
- Input focus

One way to think about refs/imperative handles:

```javascript
function Counter({counterRef}) {
  const [count, setCount] = React.useState(0)
  const increment = () => setCount(c => c + 1)
  counterRef.increment = increment
  return <button onClick={increment}>{count}</button>
}

function App() {
  const counterRef = {}
  return (
    <>
      <button onClick={() => counterRef.increment())}>
        Increment from the outside
      </button>
      <Counter counterRef={counterRef} />
    </>
  )
}
```

## `useDebugValue`

- Quickie with React DevTools.
