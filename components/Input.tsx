import { ComponentProps } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'

interface InputProps extends Omit<ComponentProps<'input'>, 'children'> {}

export const classNames = {
  container: twJoin(`
    rounded-sm
    border-borderColor
    px-6
    py-2
    text-textColor
    placeholder:text-fadedTextColor
  `),
}

export function Input({
  className,
  placeholder,
  required,
  ...otherProps
}: InputProps) {
  return (
    <input
      className={twMerge(classNames.container, className)}
      placeholder={`${placeholder}${required ? ' *' : ''}`}
      required={required}
      {...otherProps}
    />
  )
}
