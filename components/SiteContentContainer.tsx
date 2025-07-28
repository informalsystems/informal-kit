import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'

export function SiteContentContainer({
  children,
  className,
  ...otherProps
}: ComponentProps<'section'>) {
  return (
    <section
      className={twMerge(
        `
          container
          mx-auto
          px-6
          py-20
          xl:max-w-(--breakpoint-lg)
          xl:px-0
          2xl:max-w-(--breakpoint-xl)
        `,
        className,
      )}
      {...otherProps}
    >
      {children}
    </section>
  )
}
