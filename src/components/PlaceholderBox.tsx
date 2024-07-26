import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface PlaceholderBoxProps extends ComponentProps<'div'> {}

export function PlaceholderBox({
  children,
  className,
  ...otherProps
}: PlaceholderBoxProps) {
  return (
    <div
      className={twMerge(
        `
          flex
          w-full
          items-center
          justify-center
          rounded-xl
          bg-shadedBgColor
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
