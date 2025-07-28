import Link from 'next/link'
import { ComponentProps } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'

type TabbedNavProps = ComponentProps<'nav'>

export function TabbedNav({
  children,
  className,
  ...otherProps
}: TabbedNavProps) {
  return (
    <nav
      className={twMerge(
        '@container/tabbed-nav',
        'border-theme-bg-color-shaded border-b',
        'pb-0',
        className,
      )}
      {...otherProps}
    >
      <ul
        className={twJoin('flex flex-row justify-center', 'gap-1', 'lg:-mb-px')}
      >
        {children}
      </ul>
    </nav>
  )
}

type TabProps = ComponentProps<'a'>

TabbedNav.Tab = function TabbedNavTab({
  children,
  className,
  href = '#',
  ...otherProps
}: TabProps) {
  return (
    <li className={className}>
      <Link
        className={twMerge(
          'block w-full',
          'p-3',
          'border-0 border-y-4 border-transparent',
          'font-display text-center text-xs',
          'whitespace-nowrap',
          'hover:border-b-accent-teal',
          'hover:text-accent-teal',
          'is-active:border-b-accent-teal',
          'is-active:text-accent-teal',
          'is-active:bg-transparent',
          'xl:px-6',
        )}
        href={href}
        {...otherProps}
      >
        {children}
      </Link>
    </li>
  )
}
