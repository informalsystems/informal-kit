'use client'

import {
  ComponentProps,
  ElementType,
  ReactNode,
  useEffect,
  useState,
} from 'react'
import { useCopyToClipboard } from 'usehooks-ts'
import { Icon } from './Icon'

type CopyToClipboardButtonProps<T extends ElementType = 'button'> = Omit<
  ComponentProps<T>,
  'children'
> & {
  as?: T
  children?: (renderProps: { isCopied: boolean }) => ReactNode
  payload: string
}

export function CopyToClipboardButton<T extends ElementType = 'button'>({
  as,
  children,
  payload,
  className,
  ...otherProps
}: CopyToClipboardButtonProps<T>) {
  const [isCopied, setIsCopied] = useState(false)

  const [, copy] = useCopyToClipboard()

  useEffect(() => {
    setIsCopied(false)
  }, [payload])

  function handleClickCopy(text: string, event: MouseEvent) {
    event.preventDefault()

    copy(text)
      .then(() => {
        setIsCopied(true)
        setTimeout(() => setIsCopied(false), 2000)
      })
      .catch(error => {
        console.error('Failed to copy!', error)
      })
  }

  const Component = String(as || 'button') as ElementType

  return (
    <Component
      className={className}
      onClick={handleClickCopy.bind(null, payload)}
      {...otherProps}
    >
      {children?.({ isCopied }) ?? (
        <Icon name={isCopied ? 'clipboard-check' : 'clipboard'} />
      )}
    </Component>
  )
}
