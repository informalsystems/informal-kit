'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { getClassNameFromPathname } from '../lib/useRouteClassName'

interface ThemeProviderProps {
  routeClassNameMap: Record<string, Record<string, string>>
}

export function ThemeProvider({ routeClassNameMap }: ThemeProviderProps) {
  const pathname = usePathname()

  useEffect(() => {
    Object.entries(routeClassNameMap).forEach(([selector, routeClassMap]) => {
      const nextClassName = getClassNameFromPathname(pathname, routeClassMap)
      const element = document.querySelector(selector) as HTMLElement | null
      if (!element) return

      const allRouteClasses = Object.values(routeClassMap)
      allRouteClasses.forEach(classToken => {
        if (classToken) element.classList.remove(classToken)
      })
      if (nextClassName) element.classList.add(nextClassName)
    })
  }, [pathname, routeClassNameMap])

  return null
}
