'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export function useActiveSection(selectors: string[]): number {
  const [activeIndex, setActiveIndex] = useState(0)
  const elementsRef = useRef<Element[]>([])
  const rafRef = useRef<number>(undefined)

  const checkScrollPosition = useCallback(() => {
    if (elementsRef.current.length === 0) return

    const viewportHeight = window.innerHeight
    const viewportCenter = viewportHeight / 2

    let bestIndex = 0
    let bestScore = -Infinity

    elementsRef.current.forEach((element, index) => {
      const rect = element.getBoundingClientRect()
      const elementTop = rect.top
      const elementBottom = rect.bottom
      const elementHeight = rect.height

      const visibleTop = Math.max(
        0,
        Math.min(viewportHeight, elementBottom) - Math.max(0, elementTop),
      )
      const visibleHeight = Math.min(elementHeight, viewportHeight)
      const visibilityRatio = visibleTop / visibleHeight

      const elementCenter = (elementTop + elementBottom) / 2
      const distanceFromCenter = Math.abs(elementCenter - viewportCenter)
      const normalizedDistance = distanceFromCenter / viewportHeight

      const isFullyVisible = elementTop >= 0 && elementBottom <= viewportHeight

      const isAtTop = elementTop >= 0 && elementTop <= viewportHeight * 0.2

      let score = 0

      if (isFullyVisible) {
        score = 100 - normalizedDistance
      } else if (isAtTop) {
        score = 80 - normalizedDistance
      } else {
        score = visibilityRatio * 10 - normalizedDistance
      }

      console.log(`Section ${index}:`, {
        visibilityRatio: visibilityRatio.toFixed(2),
        distanceFromCenter: normalizedDistance.toFixed(2),
        isFullyVisible,
        isAtTop,
        score: score.toFixed(2),
      })

      if (score > bestScore) {
        bestScore = score
        bestIndex = index
      } else if (score === bestScore) {
        if (index < bestIndex) {
          bestIndex = index
        }
      }
    })

    console.log(
      `Selected section: ${bestIndex} with score: ${bestScore.toFixed(2)}`,
    )
    setActiveIndex(bestIndex)
  }, [])

  const throttledCheck = useCallback(() => {
    if (rafRef.current) return

    rafRef.current = requestAnimationFrame(() => {
      checkScrollPosition()
      rafRef.current = undefined
    })
  }, [checkScrollPosition])

  useEffect(() => {
    if (selectors.length === 0) return

    const elements = selectors.map(selector => document.querySelector(selector))
    const validElements = elements.filter(Boolean) as Element[]

    if (validElements.length === 0) return

    elementsRef.current = validElements
    checkScrollPosition()

    window.addEventListener('scroll', throttledCheck, { passive: true })

    return () => {
      window.removeEventListener('scroll', throttledCheck)
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current)
      }
    }
  }, [selectors, checkScrollPosition, throttledCheck])

  return activeIndex
}
