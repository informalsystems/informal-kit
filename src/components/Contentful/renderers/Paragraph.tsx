import { ReactNode } from 'react'
import { ConditionalWrapper } from '../../ConditionalWrapper'
import { OrphanController } from '../../OrphanController'

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
      condition={paragraphsControlOrphans}
      wrapper={children => (
        <OrphanController disabledInPortrait={false}>
          {children}
        </OrphanController>
      )}
    >
      <p>{children}</p>
    </ConditionalWrapper>
  ) : null
}
