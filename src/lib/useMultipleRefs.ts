import { MutableRefObject, Ref } from 'react'

const useMultipleRefs = <T = unknown>(
  ...refs: Array<Ref<T> | undefined>
): Ref<T> => {
  const combineRefs = (element: T) =>
    refs.forEach((ref) => {
      if (!ref) {
        return
      }

      if (typeof ref === 'function') {
        ref(element)
      } else {
        ;(ref as MutableRefObject<T>).current = element
      }
    })

  return combineRefs
}

export { useMultipleRefs }
