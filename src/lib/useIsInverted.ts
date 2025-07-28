'use client'

import throttle from 'lodash/throttle'
import { RefObject, useEffect, useState } from 'react'

export function useIsInverted(ref: RefObject<HTMLElement | null>) {
  const [isInverted, setisInverted] = useState(false)

  useEffect(() => {
    function checkIfInverted() {
      const targetElement = ref.current

      if (!targetElement) return

      const newIsInverted =
        targetElement.matches('.dark') ||
        (targetElement.closest('.light') === null &&
          targetElement.closest('.dark') !== null) ||
        targetElement.matches('.is-inverted') ||
        (targetElement.closest('.not-inverted') === null &&
          targetElement.closest('.is-inverted') !== null)

      setisInverted(newIsInverted)
    }

    const throttledCheckIfInverted = throttle(checkIfInverted, 100)

    checkIfInverted()

    const timer = setInterval(throttledCheckIfInverted, 500)

    window.addEventListener('resize', throttledCheckIfInverted)
    window.addEventListener('scroll', throttledCheckIfInverted)

    return () => {
      clearInterval(timer)
      window.removeEventListener('resize', throttledCheckIfInverted)
      window.removeEventListener('scroll', throttledCheckIfInverted)
    }
    // ref is a stable object; ref.current is intentionally not a dependency
  }, [ref])

  return isInverted
}
