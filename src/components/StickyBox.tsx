'use client'

import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { useIntersectionObserver } from 'usehooks-ts'

export { StickyBox }

interface StickyBoxProps extends Omit<ComponentProps<'div'>, 'children'> {
  children: ReactNode | ((renderProps: { isStuck: boolean }) => ReactNode)
  stickyClasses?: string | string[]
}

const StickyBox = ({
  children,
  className,
  stickyClasses,
  ...otherProps
}: StickyBoxProps) => {
  const { isIntersecting, ref } = useIntersectionObserver({
    threshold: 1,
  })

  const isStuck = isIntersecting

  return (
    <div
      className={twMerge(
        `
          group/sticky-box
          sticky
          -top-px
        `,
        className,
        isStuck && 'is-stuck',
        isStuck && stickyClasses,
      )}
      ref={ref}
      {...otherProps}
    >
      {typeof children === 'function' ? children({ isStuck }) : children}
    </div>
  )
}
