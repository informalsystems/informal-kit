import { ConditionalWrapper, OrphanController } from '@/components'
import { clamp } from 'lodash'
import { ElementType, ReactNode, useEffect, useState } from 'react'
import { twJoin } from 'tailwind-merge'

export function Heading({
  children,
  controlOrphans,
  decorated,
  headingLevel,
}: {
  children: ReactNode
  controlOrphans: boolean
  decorated: boolean
  headingLevel: number
}) {
  const [isClient, setIsClient] = useState(false)

  const H = `h${clamp(headingLevel, 1, 6)}` as ElementType

  useEffect(() => {
    setIsClient(true)
  }, [])

  return (
    <H className={twJoin(decorated && 'is-decorated')}>
      <ConditionalWrapper
        condition={isClient && controlOrphans}
        wrapper={children => <OrphanController>{children}</OrphanController>}
      >
        {children}
      </ConditionalWrapper>
    </H>
  )
}
