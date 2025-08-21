'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { getClassNameFromPathname } from '../lib/useRouteClassName'

type Selector = string
type RoutePrefix = string
type ClassNames = string

interface ThemeProviderProps {
  routeClassNameMap: Record<Selector, Record<RoutePrefix, ClassNames>>
}

export function ThemeProvider({ routeClassNameMap }: ThemeProviderProps) {
  const pathname = usePathname()

  useEffect(() => {
    Object.entries(routeClassNameMap).forEach(([selector, routeClassMap]) => {
      const element = document.querySelector(selector) as HTMLElement | null
      if (!element) return

      Object.values(routeClassMap).forEach(classToken => {
        if (classToken) {
          const classes = classToken.split(' ').filter(Boolean)
          classes.forEach(className => element.classList.remove(className))
        }
      })

      const nextClassName = getClassNameFromPathname(pathname, routeClassMap)
      if (nextClassName) {
        const classes = nextClassName.split(' ').filter(Boolean)
        classes.forEach(className => element.classList.add(className))
      }
    })
  }, [pathname, routeClassNameMap])

  return null
}
