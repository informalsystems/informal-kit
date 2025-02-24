import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

interface SiteContentContainerProps extends ComponentProps<'section'> {}

export function SiteContentContainer({
  children,
  className,
  ...otherProps
}: SiteContentContainerProps) {
  return (
    <section
      className={twMerge(
        `
          container
          mx-auto
          px-6
        `,
        className,
      )}
      {...otherProps}
    >
      {children}
    </section>
  )
}
