'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

export function useActiveSection(selectors: string[]): number {
  const [activeIndex, setActiveIndex] = useState(0)
  const elementsRef = useRef<Element[]>([])
  const lastPositionsRef = useRef<number[]>([])
  const indexOfMostVisibleRef = useRef(activeIndex)

  useEffect(() => {
    indexOfMostVisibleRef.current = activeIndex
  }, [activeIndex])

  const updateActiveIndex = useCallback((newIndex: number) => {
    if (newIndex !== -1 && newIndex !== indexOfMostVisibleRef.current) {
      setActiveIndex(newIndex)
      indexOfMostVisibleRef.current = newIndex
    }
  }, [])

  const checkScrollPosition = useCallback(() => {
    if (elementsRef.current.length === 0) return

    const viewportHeight = window.innerHeight
    const viewportCenter = viewportHeight / 2

    elementsRef.current.forEach((element, index) => {
      const rect = element.getBoundingClientRect()
      const currentTop = rect.top
      const currentBottom = rect.bottom
      const lastTop = lastPositionsRef.current[index * 2] ?? currentTop
      const lastBottom =
        lastPositionsRef.current[index * 2 + 1] ?? currentBottom

      const wasAboveCenter = lastTop <= viewportCenter
      const isAboveCenter = currentTop <= viewportCenter

      if (!wasAboveCenter && isAboveCenter) {
        updateActiveIndex(index)
      }

      const wasBelowCenter = lastBottom >= viewportCenter
      const isBelowCenter = currentBottom >= viewportCenter

      if (!wasBelowCenter && isBelowCenter) {
        updateActiveIndex(index)
      }

      lastPositionsRef.current[index * 2] = currentTop
      lastPositionsRef.current[index * 2 + 1] = currentBottom
    })
  }, [updateActiveIndex])

  useEffect(() => {
    if (selectors.length === 0) return

    const elements = selectors.map(selector => document.querySelector(selector))
    const validElements = elements.filter(Boolean) as Element[]

    if (validElements.length === 0) return

    elementsRef.current = validElements

    lastPositionsRef.current = validElements.flatMap(element => {
      const rect = element.getBoundingClientRect()
      return [rect.top, rect.bottom]
    })

    checkScrollPosition()

    window.addEventListener('scroll', checkScrollPosition, { passive: true })

    return () => {
      window.removeEventListener('scroll', checkScrollPosition)
    }
  }, [selectors, checkScrollPosition])

  return activeIndex
}
