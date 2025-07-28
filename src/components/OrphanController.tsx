'use client'

import { ComponentPropsWithoutRef, ElementType, useEffect, useRef } from 'react'
import { useIsClient, useMediaQuery } from 'usehooks-ts'

const NonBreakingSpace = String.fromCharCode(160)

type OrphanControllerProps<T extends ElementType> = {
  as?: T
  disabledInPortrait?: boolean
  children: React.ReactNode
} & ComponentPropsWithoutRef<T>

export function OrphanController<T extends ElementType = 'div'>({
  as,
  children,
  disabledInPortrait = true,
  ...otherProps
}: OrphanControllerProps<T>) {
  const Component = as || 'div'
  const isClient = useIsClient()
  const isMobile =
    useMediaQuery('(max-width: 1023px)') && isClient && disabledInPortrait
  const innerRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const element = innerRef.current

    if (!element) return

    const containsNonBreakingSpace = element.innerHTML.includes('&nbsp;')

    if (isMobile || containsNonBreakingSpace) {
      if (isMobile) {
        element.innerHTML = element.innerHTML.replaceAll('&nbsp;', ' ')
      }
      return
    }

    const words = element.innerHTML.split(' ')

    if (words.length < 2) {
      return
    }

    const allWordsExceptLast = words.slice(0, words.length - 1).join(' ')
    const lastWord = words.slice(-1)

    element.innerHTML = `${allWordsExceptLast}${NonBreakingSpace}${lastWord}`
  }, [children, disabledInPortrait, isMobile])

  return (
    <Component
      ref={innerRef as React.ComponentPropsWithRef<T>['ref']}
      {...otherProps}
    >
      {children}
    </Component>
  )
}
