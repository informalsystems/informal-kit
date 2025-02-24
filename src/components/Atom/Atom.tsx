import { ConditionalWrapper } from '@/components/ConditionalWrapper'
import { ComponentProps, ElementType, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { Tooltip } from '../Tooltip'
import { classNames } from './classNames'

type AtomVariant = keyof typeof classNames

export type AtomProps<T extends ElementType = 'span'> = Omit<
  ComponentProps<T>,
  'variant'
> & {
  as?: T
  variant?: AtomVariant | AtomVariant[]
  tooltip?: ReactNode
}

export function Atom<T extends ElementType = 'span'>({
  as,
  className,
  variant,
  tooltip = null,
  ...otherProps
}: AtomProps<T>) {
  const Component = as || 'span'

  const classNamesForVariant = Array.isArray(variant)
    ? variant.map(v => classNames[v])
    : variant
      ? classNames[variant]
      : ``

  return (
    <ConditionalWrapper
      condition={tooltip !== null}
      wrapper={children => <Tooltip tipContents={tooltip}>{children}</Tooltip>}
    >
      <Component
        className={twMerge(classNamesForVariant, className)}
        {...otherProps}
      />
    </ConditionalWrapper>
  )
}
