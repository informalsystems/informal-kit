import { ReactNode } from 'react'

interface AppendNonWrappingContentProps {
  children: string
  appendix: ReactNode
}

export function AppendNonWrappingContent({
  children,
  appendix,
}: AppendNonWrappingContentProps) {
  const words = children.split(' ')
  const lastWord = words.pop()
  const firstWords = words.join(' ')

  return (
    <>
      {firstWords && `${firstWords} `}
      <span style={{ whiteSpace: 'nowrap' }}>
        {lastWord}
        {'\u00A0'}
        {appendix}
      </span>
    </>
  )
}
