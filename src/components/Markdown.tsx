import merge from 'lodash/merge'
import Link from 'next/link'
import { ComponentProps } from 'react'
import ReactMarkdown, { Options } from 'react-markdown'
import rehypeRaw from 'rehype-raw'
import remarkGfm from 'remark-gfm'

interface MarkdownProps extends Omit<ComponentProps<'div'>, 'children'> {
  children: string
  propsForReactMarkdown?: Omit<ComponentProps<typeof ReactMarkdown>, 'children'>
}

export function Markdown({
  children,
  propsForReactMarkdown,
  ...otherProps
}: MarkdownProps) {
  return (
    <div {...otherProps}>
      <ReactMarkdown
        children={children}
        {...merge(
          {
            components: {
              a: ({ href, node, className, ...props }) => (
                <Link
                  className="break-words font-bold underline"
                  href={href}
                  rel="noreferrer"
                  target={href?.startsWith('http') ? '_blank' : undefined}
                  {...props}
                />
              ),
              code: ({ node, className, ...props }) => {
                return (
                  <code
                    className="text-blue-700"
                    {...props}
                  />
                )
              },
              em: ({ node, className, ...props }) => (
                <em
                  className="italic"
                  {...props}
                />
              ),
              pre: ({ node, className, ...props }) => {
                return (
                  <pre
                    className="text-blue-700"
                    {...props}
                  />
                )
              },
              strong: ({ node, className, ...props }) => (
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
        )}
      />
    </div>
  )
}
