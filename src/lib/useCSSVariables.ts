'use client'

import { getCSSVariablesFromElement } from '@/lib/getCSSVariablesFromElement'
import { RefObject } from 'react'

export function useCSSVariables(ref: RefObject<HTMLElement | null>) {
  const targetElement = ref.current

  if (!targetElement) return {}

  return getCSSVariablesFromElement(targetElement)
}
