import Link from 'next/link'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { classNames } from './classNames'

interface TabbedNavProps extends ComponentProps<'nav'> {}

export function TabbedNav({
  children,
  className,
  ...otherProps
}: TabbedNavProps) {
  return (
    <nav
      className={twMerge(classNames.container, className)}
      {...otherProps}
    >
      <ul className={classNames.tabsContainer}>{children}</ul>
    </nav>
  )
}

interface TabProps extends ComponentProps<'a'> {
  isActive?: boolean
}

TabbedNav.Tab = function TabbedNavTab({
  children,
  className,
  href = '#',
  isActive,
  ...otherProps
}: TabProps) {
  return (
    <li className={twMerge(classNames.tabContainer, className)}>
      <Link
        className={classNames.tabButton({ isActive })}
        href={href}
        {...otherProps}
      >
        {children}
      </Link>
    </li>
  )
}
