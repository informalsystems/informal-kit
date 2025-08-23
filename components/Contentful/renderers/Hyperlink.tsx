import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import Link from 'next/link'
import { MouseEvent } from 'react'
import { isExternalHref } from '../../../lib/isExternalHref'
import { Icon } from '../../Icon'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Hyperlink({ node }: { node: any }) {
  const childrenAsHtml = documentToHtmlString(node)

  const isButton =
    childrenAsHtml.startsWith('[') && childrenAsHtml.endsWith(']')

  const buttonType = isButton
    ? childrenAsHtml.startsWith('[[')
      ? 'button-secondary'
      : 'button-primary'
    : undefined

  const variant = isButton ? buttonType : 'link'

  const isExternalLink = isExternalHref(node.data.uri)

  return (
    <Link
      aria-disabled={node.data.uri === '#' ? 'true' : undefined}
      className="not-prose no-underline"
      href={node.data.uri}
      target={isExternalLink ? '_blank' : undefined}
      onClick={(event: MouseEvent) => event.stopPropagation()}
    >
      <span
        className={variant}
        dangerouslySetInnerHTML={{
          __html: isButton
            ? childrenAsHtml.replace(/^\[+\s*(.+?)\]+\s*$/, '$1')
            : childrenAsHtml,
        }}
      />
      {isExternalLink && !isButton && (
        <Icon name="light:arrow-up-right-from-square" />
      )}
    </Link>
  )
}
