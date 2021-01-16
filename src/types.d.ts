declare module '@kentcdodds/react-workshop-app/test-utils' {
  declare function alfredTip(
    shouldThrow: unknown | ((...args: unknown[]) => unknown),
    tip: string,
  ): void

  export {alfredTip}
}

declare module 'mq-polyfill' {
  declare function matchMediaPolyfill(window: Window): void

  export default matchMediaPolyfill
}
