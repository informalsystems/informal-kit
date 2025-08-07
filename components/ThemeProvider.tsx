'use client'

import { usePathname } from 'next/navigation'
import { useEffect } from 'react'
import { getClassNameFromPathname } from '../lib/useRouteClassName'

interface ThemeProviderProps {
  routeClassNameMap: Record<string, string>
}

export function ThemeProvider({ routeClassNameMap }: ThemeProviderProps) {
  const pathname = usePathname()
  const routeClassName = getClassNameFromPathname(pathname, routeClassNameMap)

  useEffect(() => {
    document.documentElement.className = routeClassName
  }, [pathname, routeClassName])

  return null
}
