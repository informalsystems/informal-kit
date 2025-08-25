'use client'

import { ComponentProps } from 'react'
import { useTableOfContents } from '../lib/useTableOfContents'
import { StickyNav } from './StickyNav'

interface StickyTableOfContentsProps extends ComponentProps<'div'> {
  elementSelector: string
  headingsSelector: string
  bottomBoundary?: string | number
}

export function StickyTableOfContents({
  elementSelector,
  headingsSelector,
  bottomBoundary = elementSelector,
  ...otherProps
}: StickyTableOfContentsProps) {
  const { items, activeItemIndex, portals } = useTableOfContents({
    elementSelector,
    headingsSelector,
  })

  if (items.length === 0) return null

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
        bottomBoundary={bottomBoundary}
        {...otherProps}
      />
    </>
  )
}
