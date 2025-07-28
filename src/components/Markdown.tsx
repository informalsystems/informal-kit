import merge from 'lodash/merge'
import Link from 'next/link'
import { ComponentProps, ElementType } from 'react'
import ReactMarkdown, { Options } from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'
import { isExternalHref } from '../lib/isExternalHref'

type MarkdownProps<T extends ElementType = 'div'> = Omit<
  ComponentProps<T>,
  'children'
> & {
  as?: T
  children: string
  propsForReactMarkdown?: Omit<ComponentProps<typeof ReactMarkdown>, 'children'>
}

export function Markdown<T extends ElementType = 'div'>({
  as,
  children,
  propsForReactMarkdown,
  ...otherProps
}: MarkdownProps<T>) {
  const Component = as || 'div'

  const markdownProps = merge(
    {
      components: {
        a: ({ href, ...props }) => (
          <Link
            className="font-bold break-words underline"
            href={href ?? '#'}
            rel="noreferrer"
            target={isExternalHref(href) ? '_blank' : undefined}
            {...props}
          />
        ),
        code: ({ ...props }) => {
          return (
            <code
              className="text-blue-700"
              {...props}
            />
          )
        },
        em: ({ ...props }) => (
          <em
            className="italic"
            {...props}
          />
        ),
        h1: ({ ...props }) => (
          <h1
            className="mb-4 text-3xl font-bold"
            {...props}
          />
        ),
        h2: ({ ...props }) => (
          <h2
            className="mb-3 text-2xl font-bold"
            {...props}
          />
        ),
        h3: ({ ...props }) => (
          <h3
            className="mb-2 text-xl font-bold"
            {...props}
          />
        ),
        h4: ({ ...props }) => (
          <h4
            className="mb-2 text-lg font-bold"
            {...props}
          />
        ),
        h5: ({ ...props }) => (
          <h5
            className="mb-1 text-base font-bold"
            {...props}
          />
        ),
        h6: ({ ...props }) => (
          <h6
            className="mb-1 text-sm font-bold"
            {...props}
          />
        ),
        pre: ({ ...props }) => {
          return (
            <pre
              className="text-blue-700"
              {...props}
            />
          )
        },
        strong: ({ ...props }) => (
          <strong
            className="font-bold"
            {...props}
          />
        ),
      },
      rehypePlugins: [rehypeRaw],
      remarkPlugins: [remarkGfm],
    } as Options,
    propsForReactMarkdown,
  )

  return (
    <Component {...otherProps}>
      <ReactMarkdown {...markdownProps}>{children}</ReactMarkdown>
    </Component>
  )
}
