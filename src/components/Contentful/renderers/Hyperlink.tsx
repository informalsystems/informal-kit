import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import Link from 'next/link'
import { MouseEvent } from 'react'
import { twMerge } from 'tailwind-merge'
import { isExternalHref } from '../../../lib/isExternalHref'
import { Icon } from '../../Icon'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Hyperlink({ node }: { node: any }) {
  const childrenAsHtml = documentToHtmlString(node)

  const isButton =
    childrenAsHtml.startsWith('[') && childrenAsHtml.endsWith(']')

  const buttonType = isButton
    ? childrenAsHtml.startsWith('[[')
      ? 'secondary'
      : 'primary'
    : undefined

  const variant = isButton ? (`button-${buttonType!}` as const) : 'link'

  const isExternalLink = isExternalHref(node.data.uri)

  return (
    <Link
      aria-disabled={node.data.uri === '#' ? 'true' : undefined}
      className={twMerge('not-prose', variant)}
      href={node.data.uri}
      target={isExternalLink ? '_blank' : undefined}
      onClick={(event: MouseEvent) => event.stopPropagation()}
    >
      <span
        dangerouslySetInnerHTML={{
          __html: isButton
            ? childrenAsHtml.replace(/^\[+\s*(.+?)\]+\s*$/, '$1')
            : childrenAsHtml,
        }}
      />
      {isExternalLink && (
        <Icon
          name="arrow-up-right-from-square"
          variant="light"
        />
      )}
    </Link>
  )
}
