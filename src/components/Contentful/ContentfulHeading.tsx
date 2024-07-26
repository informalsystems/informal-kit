'use client'

import { ConditionalWrapper, OrphanController } from '@/components'
import { clamp } from 'lodash'
import { ReactElement, ReactNode, useEffect, useState } from 'react'
import { twJoin } from 'tailwind-merge'

const firstTextNode = (nodeOrNodes: any): any => {
  if (Array.isArray(nodeOrNodes) || nodeOrNodes.nodeType !== 'text') {
    return firstTextNode(nodeOrNodes)
  }

  if (nodeOrNodes.nodeType === 'text') {
    return nodeOrNodes.value
  }

  return 'no text'
}

export function ContentfulHeading({
  children,
  controlOrphans = true,
  decorated = false,
  level,
}: {
  children: ReactNode
  controlOrphans?: boolean
  decorated?: boolean
  level: number
  originalLevel: number
}) {
  const [isClient, setIsClient] = useState(false)

  const H = `h${clamp(level, 1, 6)}` as ReactElement['type']

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <H className={twJoin(decorated && 'is-decorated')}>
      <ConditionalWrapper
        condition={isClient && controlOrphans}
        wrapper={(children) => <OrphanController>{children}</OrphanController>}
      >
        {children}
      </ConditionalWrapper>
    </H>
  )
}
