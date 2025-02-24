import { Icon } from '@/components/Icon'
import { StyledText } from '@/components/StyledText'
import { isExternalHref } from '@/lib/isExternalHref'
import Link from 'next/link'
import { Children, MouseEvent, ReactNode } from 'react'

export function Hyperlink({
  node,
  children,
}: {
  node: any
  children: ReactNode
}) {
  const childrenAsArray = Children.toArray(children)
  const linkContent = childrenAsArray[0]

  const isButton =
    typeof linkContent === 'string' &&
    linkContent.startsWith('[') &&
    linkContent.endsWith(']')

  const buttonType = isButton
    ? linkContent.startsWith('[[')
      ? 'secondary'
      : 'primary'
    : undefined

  const variant = isButton ? (`button.${buttonType!}` as const) : 'link'

  const isExternalLink = isExternalHref(
    node.data.uri,
    typeof window !== 'undefined',
  )

  return (
    <StyledText
      as={Link}
      aria-disabled={node.data.uri === '#' ? 'true' : undefined}
      className="not-prose"
      href={node.data.uri}
      target={isExternalLink ? '_blank' : undefined}
      variant={variant}
      onClick={(event: MouseEvent) => event.stopPropagation()}
    >
      {isButton
        ? String(linkContent).replace(/^\[+\s*(.+?)\]+\s*$/, '$1')
        : linkContent}
      {isExternalLink && (
        <Icon
          name="arrow-up-right-from-square"
          variant="light"
        />
      )}
    </StyledText>
  )
}
