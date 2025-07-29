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
      className={twMerge(
        'prose',
        'prose-h1:text-5xl',
        'prose-h2:text-4xl',
        'prose-h3:text-3xl',
        'prose-h4:text-lg',
        'prose-blockquote:overflow-x-auto',
        'prose-blockquote:whitespace-pre-wrap',
        'prose-blockquote:bg-theme-text-color-faded/5',
        'prose-blockquote:py-3',
        'prose-blockquote:font-normal',
        'prose-blockquote:not-italic',
        '[&_:is(h1,h2,h3)]:font-display',
        '[&_:is(h1,h2,h3,h4)]:leading-[1.2]',
        '[&_:is(h1,h2,h3,h4)]:font-bold',
        '[&_:is(h1,h2,h3,h4):first-child]:mt-0',
        '[&_:is(h3,h4)]:mb-2.5',
        '[&_:last-child]:mb-0',
        '[&_blockquote_p::after]:content-none',
        '[&_blockquote_p::before]:content-none',
        '[&*p]:mt-0',
        className,
      )}
      {...otherProps}
    >
      {children}
    </Component>
  )
}
