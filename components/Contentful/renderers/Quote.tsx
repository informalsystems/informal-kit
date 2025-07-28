import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function Quote({ children, node }: { children: ReactNode; node: any }) {
  const hasIcon = Boolean(
    node.content[0] &&
      node.content[0].nodeType === 'paragraph' &&
      node.content[0].content &&
      node.content[0].content[0] &&
      node.content[0].content[0].nodeType === 'text' &&
      node.content[0].content[0].value &&
      node.content[0].content[0].value.match(/^\p{Extended_Pictographic}/u),
  )

  return (
    <blockquote
      className={twMerge(
        hasIcon &&
          `
            pl-10!
            [&>*:first-child]:-indent-5
          `,
      )}
    >
      {children}
    </blockquote>
  )
}
