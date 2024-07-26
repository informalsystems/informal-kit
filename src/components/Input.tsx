import { tw } from '@/lib/tw'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface InputProps extends Omit<ComponentProps<'input'>, 'children'> {}

export const classNames = {
  container: tw`
    rounded-sm
    border-borderColor
    px-6
    py-2
    text-textColor
    placeholder:text-fadedTextColor
  `,
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
