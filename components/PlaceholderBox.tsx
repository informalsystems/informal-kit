import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type PlaceholderBoxProps = ComponentProps<'div'>

export function PlaceholderBox({
  children,
  className,
  ...otherProps
}: PlaceholderBoxProps) {
  return (
    <div
      className={twMerge(
        `
          bg-theme-bg-color-shaded
          flex
          w-full
          items-center
          justify-center
          rounded-xl
          p-6
        `,
        className,
      )}
      {...otherProps}
    >
      {children}
    </div>
  )
}
