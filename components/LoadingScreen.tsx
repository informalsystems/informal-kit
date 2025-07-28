import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { Icon } from './Icon'

type LoadingScreenProps = Omit<ComponentProps<'div'>, 'children'>

export function LoadingScreen({
  className,
  ...otherProps
}: LoadingScreenProps) {
  return (
    <div
      className={twMerge(
        `
          bg-theme-bg-color
          text-theme-accent-color
          fixed
          inset-0
          z-1000
          flex
          items-center
          justify-center
        `,
        className,
      )}
      {...otherProps}
    >
      <Icon
        className="animate-spin"
        name="loader"
      />
    </div>
  )
}
