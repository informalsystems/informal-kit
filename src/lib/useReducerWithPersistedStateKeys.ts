import { pick } from 'lodash'
import { Dispatch, Reducer, useEffect, useReducer } from 'react'
import { useIsClient } from 'usehooks-ts'

export const useReducerWithPersistedStateKeys = <T, A>({
  initialState,
  localStorageKeyName,
  persistedKeys,
  reducer,
}: {
  initialState: T
  localStorageKeyName: string
  persistedKeys: (keyof T)[]
  reducer: Reducer<T, A>
}): [state: T, dispatch: Dispatch<A>] => {
  const isClient = useIsClient()

  const [state, dispatch] = useReducer(reducer, initialState, () => {
    if (!isClient) return initialState

    const rawSavedState = window.localStorage.getItem(localStorageKeyName)

    const savedState = rawSavedState
      ? pick(JSON.parse(rawSavedState), persistedKeys)
      : {}

    return {
      ...initialState,
      ...savedState,
    }
  })

  useEffect(() => {
    const updatedSavedState = pick(state, persistedKeys)

    window.localStorage.setItem(
      localStorageKeyName,
      JSON.stringify(updatedSavedState),
    )
  }, [localStorageKeyName, persistedKeys, state])

  return [state, dispatch]
}
