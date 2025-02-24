import { ConditionalWrapper } from '@/components/ConditionalWrapper'
import { OrphanController } from '@/components/OrphanController'
import { ReactNode } from 'react'

export function Paragraph({
  children,
  paragraphsControlOrphans,
}: {
  children: ReactNode
  paragraphsControlOrphans: boolean
}) {
  const hasContent =
    children &&
    Array.isArray(children) &&
    children.some(child =>
      typeof child === 'string' ? child.trim() !== '' : true,
    )

  return hasContent ? (
    <ConditionalWrapper
      children={<p>{children}</p>}
      condition={paragraphsControlOrphans}
      wrapper={children => <OrphanController>{children}</OrphanController>}
    />
  ) : null
}
