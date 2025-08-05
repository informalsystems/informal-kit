import { ComponentProps, ElementType } from 'react'
import { twMerge } from 'tailwind-merge'

type ProseBoxProps<E extends ElementType = 'div'> = ComponentProps<E> & {
  as?: E
}

export function ProseBox<E extends ElementType = 'div'>({
  as,
  children,
  className,
  ...otherProps
}: ProseBoxProps<E>) {
  const Component = (as || 'div') as ElementType

  return (
    <Component
      className={twMerge('prose', className)}
      {...otherProps}
    >
      {children}
    </Component>
  )
}
