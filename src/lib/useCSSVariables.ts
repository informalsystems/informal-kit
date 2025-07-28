'use client'

import { RefObject } from 'react'
import { getCSSVariablesFromElement } from './getCSSVariablesFromElement'

export function useCSSVariables(ref: RefObject<HTMLElement | null>) {
  const targetElement = ref.current

  if (!targetElement) return {}

  return getCSSVariablesFromElement(targetElement)
}
