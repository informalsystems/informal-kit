// Main barrel export
export * from 'lodash'

// Individual function exports for tree-shaking
export { default as debounce } from 'lodash/debounce'
export { default as throttle } from 'lodash/throttle'
export { default as isEmpty } from 'lodash/isEmpty'
// ... add the most commonly used functions
