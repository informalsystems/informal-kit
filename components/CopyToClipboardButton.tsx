'use client'

import {
  ComponentProps,
  ElementType,
  ReactNode,
  useEffect,
  useState,
} from 'react'
import { twMerge } from 'tailwind-merge'
import { useCopyToClipboard } from 'usehooks-ts'
import { Icon } from './Icon'

// Map variants to utility classes
const variantToClassName = {
  'button.primary': 'button-primary',
  'button.secondary': 'button-secondary',
  'button.icon': 'button-icon',
  'link': 'link',
  'link.subtle': 'link-subtle',
  'footnote': 'footnote',
  'h1': 'h1',
  'h2': 'h2',
  'h3': 'h3',
  'h4': 'h4',
  'superHeading': 'super-heading',
  'headingDecoratorCentered': 'heading-decorator-centered',
  'headingDecoratorLeft': 'heading-decorator-left',
  'importantValue': 'important-value',
  'importantValueLabel': 'important-value-label',
  'label': 'label',
  'counter': 'counter',
} as const

type CopyToClipboardButtonProps<T extends ElementType = 'button'> = Omit<
  ComponentProps<T>,
  'children'
> & {
  as?: T
  children?: (renderProps: { isCopied: boolean }) => ReactNode
  payload: string
  variant?: keyof typeof variantToClassName
}

export function CopyToClipboardButton<T extends ElementType = 'button'>({
  as,
  children,
  payload,
  variant = 'button.icon',
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
  const variantClassName = variant ? variantToClassName[variant] : ''

  return (
    <Component
      className={twMerge(variantClassName, className)}
      onClick={handleClickCopy.bind(null, payload)}
      {...otherProps}
    >
      {children?.({ isCopied }) ?? (
        <Icon name={isCopied ? 'clipboard-check' : 'clipboard'} />
      )}
    </Component>
  )
}
