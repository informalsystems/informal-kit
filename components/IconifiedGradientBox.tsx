import { ComponentProps, ElementType, ReactNode } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'
import { GradientBox } from './GradientBox'

type IconifiedGradientBoxProps<T extends ElementType = 'div'> =
  ComponentProps<T> & {
    as?: T
    icon: ReactNode
  }

export function IconifiedGradientBox<T extends ElementType = 'div'>({
  as,
  children,
  className,
  icon,
  ...otherProps
}: IconifiedGradientBoxProps<T>) {
  return (
    <GradientBox
      as={as}
      className={twMerge('pt-20', className)}
      {...otherProps}
    >
      <div
        className={twJoin(
          'absolute',
          'top-0',
          'size-20',
          '-translate-y-1/2',
          'rounded-xl',
          'bg-white',
          'p-3',
          'shadow-2xl',
        )}
      >
        {icon}
      </div>

      {children}
    </GradientBox>
  )
}
