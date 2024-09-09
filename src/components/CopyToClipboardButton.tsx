'use client'

import { Icon } from '@/components/Icon'
import { StyledText, StyledTextProps } from '@/components/StyledText'
import {
  ComponentProps,
  ElementType,
  ReactNode,
  useEffect,
  useState,
} from 'react'
import { useCopyToClipboard } from 'usehooks-ts'

type CopyToClipboardButtonProps<T extends ElementType = 'button'> = Omit<
  ComponentProps<T>,
  'children'
> & {
  as?: T
  children?: (isCopied: boolean) => ReactNode
  payload: string
  variant?: StyledTextProps<T>['variant']
}

export function CopyToClipboardButton<T extends ElementType = 'button'>({
  as,
  children,
  payload,
  variant = 'button.icon',
  ...otherProps
}: CopyToClipboardButtonProps<T>) {
  const [isCopied, setIsCopied] = useState(false)

  const [copiedText, copy] = useCopyToClipboard()

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
    <StyledText
      as={Component}
      variant={variant}
      onClick={handleClickCopy.bind(null, payload)}
      {...otherProps}
    >
      {children?.(isCopied) ?? (
        <Icon name={isCopied ? 'clipboard-check' : 'clipboard'} />
      )}
    </StyledText>
  )
}
