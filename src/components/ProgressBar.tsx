import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

type ProgressBarProps = ComponentProps<'div'>

export function ProgressBar({
  children,
  className,
  ...otherProps
}: ProgressBarProps) {
  return (
    <div
      className={twMerge(``, className)}
      {...otherProps}
    >
      {children}
    </div>
  )
}

ProgressBar.Bar = function ProgressBarBar({
  children,
  className,
  ...otherProps
}: ProgressBarProps) {
  return (
    <div
      className={twMerge(``, className)}
      {...otherProps}
    >
      {children}
    </div>
  )
}
