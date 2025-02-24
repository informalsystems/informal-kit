import { ReactNode } from 'react'

export function ItalicText({ text }: { text: ReactNode }) {
  return <em>{text}</em>
}
