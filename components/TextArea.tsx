import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { classNames } from './Input'

interface TextAreaProps extends ComponentProps<'textarea'> {}

export function TextArea({
  children,
  className,
  placeholder,
  required,
  ...otherProps
}: TextAreaProps) {
  return (
    <textarea
      className={twMerge(classNames.container, className)}
      placeholder={`${placeholder}${required ? ' *' : ''}`}
      required={required}
      {...otherProps}
    >
      {children}
    </textarea>
  )
}
