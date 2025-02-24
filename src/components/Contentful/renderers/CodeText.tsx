import { ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export function CodeText({ text }: { text: ReactNode }) {
  const isString = typeof text === 'string'
  const isMultiLine = isString && text.includes('\n')

  return (
    <code
      className={twMerge(
        `
          whitespace-pre-wrap
          font-mono
          text-sm
          text-orange-600
        `,
        isMultiLine &&
          `
            block
            overflow-x-auto
            rounded-md
            bg-orange-400/10
            p-3
          `,
      )}
    >
      {isString ? text.trim() : text}
    </code>
  )
}
