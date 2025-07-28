import { ComponentProps, ElementType } from 'react'
import { twMerge } from 'tailwind-merge'

export type GradientBoxProps<T extends ElementType = 'div'> =
  ComponentProps<T> & {
    as?: T
  }

export function GradientBox<T extends ElementType = 'div'>({
  as,
  children,
  className,
  ...otherProps
}: GradientBoxProps<T>) {
  const Component = String(as || 'div') as ElementType

  return (
    <Component
      className={twMerge(
        `
          from-theme-bg-color-shaded
          relative
          flex
          flex-col
          gap-6
          rounded-xl
          bg-linear-to-b
          to-transparent
          p-6
        `,
        className,
      )}
      {...otherProps}
    >
      {children}
    </Component>
  )
}
