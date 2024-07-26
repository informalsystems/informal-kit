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
        `
          prose
          prose-branded
          dark:prose-invert

          prose-h1:text-5xl
          prose-h2:text-4xl
          prose-h3:text-3xl
          prose-h4:text-lg

          [&.text-center_.is-decorated]:after:left-1/2
          [&.text-center_.is-decorated]:after:-translate-x-1/2
          [&_.is-decorated]:relative
          [&_.is-decorated]:mb-6
          [&_.is-decorated]:pb-6
          [&_.is-decorated]:after:absolute
          [&_.is-decorated]:after:left-0
          [&_.is-decorated]:after:top-full
          [&_.is-decorated]:after:h-[4px]
          [&_.is-decorated]:after:w-16
          [&_.is-decorated]:after:bg-accent-fuchsia

          [&_:is(h1,h2,h3)]:font-display
          [&_:is(h1,h2,h3,h4):first-child]:mt-0
          [&_:is(h1,h2,h3,h4)]:font-bold
          [&_:is(h1,h2,h3,h4)]:leading-[1.2]
          [&_:is(h3,h4)]:mb-2.5

          [&_h1_strong]:text-fadedTextColor
          [&_li]:my-0.5
          [&_li_p]:my-1
        `,
        className,
      )}
      {...otherProps}
    >
      {children}
    </Component>
  )
}
