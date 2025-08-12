'use client'

import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { useTableOfContents } from '../lib/useTableOfContents'
import { StickyNav } from './StickyNav'

interface StickyTableOfContentsProps extends ComponentProps<'div'> {
  classNamesForTableOfContents?: string
  elementSelector: string
  headingsSelector?: string
  bottomBoundary?: string | number
}

export function StickyTableOfContents({
  className,
  classNamesForTableOfContents,
  elementSelector,
  headingsSelector = 'h2:not(.skip)',
  bottomBoundary = elementSelector,
  ...otherProps
}: StickyTableOfContentsProps) {
  const { items, activeItemIndex, portals } = useTableOfContents({
    elementSelector,
    headingsSelector,
  })

  return (
    <>
      {portals}

      <StickyNav
        items={items.map(({ label, href, level }) => ({
          label,
          href,
          iconLeft: level && level > 2 ? 'light:circle-small' : undefined,
          iconRight: 'light:arrow-down',
        }))}
        activeItemIndex={activeItemIndex}
        variant="list"
        title="Table of Contents"
        className={twMerge(classNamesForTableOfContents, className)}
        bottomBoundary={bottomBoundary}
        {...otherProps}
      />
    </>
  )
}
