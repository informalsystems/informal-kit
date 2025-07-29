'use client'

import { ComponentProps, ElementType, useEffect, useRef } from 'react'
import { twMerge } from 'tailwind-merge'

type CollapsibleBoxProps<T extends ElementType = 'div'> = ComponentProps<T> & {
  as?: T
  isCollapsed?: boolean
  onCollapseStart?: () => void
  onCollapseEnd?: () => void
}

export function CollapsibleBox<T extends ElementType = 'div'>({
  as,
  children,
  className,
  isCollapsed,
  onCollapseStart,
  onCollapseEnd,
  ...otherProps
}: CollapsibleBoxProps<T>) {
  const Component = String(as || 'div') as ElementType
  const prevCollapsedRef = useRef(isCollapsed)
  const isTransitioningRef = useRef(false)

  useEffect(() => {
    const prevCollapsed = prevCollapsedRef.current
    const currentCollapsed = isCollapsed

    if (prevCollapsed !== currentCollapsed && !isTransitioningRef.current) {
      isTransitioningRef.current = true
      onCollapseStart?.()
    }

    prevCollapsedRef.current = currentCollapsed
  }, [isCollapsed, onCollapseStart])

  const handleTransitionEnd = () => {
    isTransitioningRef.current = false
    onCollapseEnd?.()
  }

  return (
    <Component
      className={twMerge(
        `
          grid
          grid-rows-[0fr]
          transition-all
        `,
        !isCollapsed &&
          `
            grid-rows-[1fr]
          `,
        className,
      )}
      onTransitionEnd={handleTransitionEnd}
      {...otherProps}
    >
      <div className="overflow-hidden">{children}</div>
    </Component>
  )
}
