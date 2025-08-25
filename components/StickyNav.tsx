'use client'

import { twJoin } from 'tailwind-merge'
import { IconString } from './Icon/types'
import { ListNav } from './ListNav'
import { StickyBox } from './StickyBox'
import { TabbedNav } from './TabbedNav'

interface StickyNavItem {
  label: string | React.ReactNode
  href: string
  icon?: IconString
  iconLeft?: IconString
  iconRight?: IconString
}

interface StickyNavProps {
  items: StickyNavItem[]
  activeItemIndex: number
  variant: 'list' | 'tabs'
  title?: React.ReactNode
  disabled?: boolean
  top?: string
  className?: string
  classNamesForItem?: string
  bottomBoundary?: string | number
}

export function StickyNav({
  items,
  activeItemIndex,
  variant,
  title = <>Jump to&hellip;</>,
  disabled,
  top = '.site-header',
  className,
  classNamesForItem,
  bottomBoundary,
}: StickyNavProps) {
  const isDisabled = disabled ?? false

  if (variant === 'list') {
    return (
      <StickyBox
        top={top}
        enabled={!isDisabled}
        className={className}
        bottomBoundary={bottomBoundary}
      >
        <ListNav navTitle={title}>
          {items.length === 0 ? (
            <ListNav.Item className="italic">(no items)</ListNav.Item>
          ) : (
            items.map((item, index) => (
              <ListNav.Item
                key={item.href}
                href={item.href}
                className={classNamesForItem}
                icon={item.icon}
                iconLeft={item.iconLeft}
                iconRight={item.iconRight}
                {...(index === activeItemIndex && {
                  'data-active': '',
                })}
              >
                {item.label}
              </ListNav.Item>
            ))
          )}
        </ListNav>
      </StickyBox>
    )
  }

  return (
    <StickyBox
      enabled={!isDisabled}
      top={top}
      className={className}
      bottomBoundary={bottomBoundary}
    >
      <section className="site-content-container py-0 lg:hidden">
        <ListNav navTitle={title}>
          {items.length === 0 ? (
            <ListNav.Item className="italic">(no items)</ListNav.Item>
          ) : (
            items.map((item, index) => (
              <ListNav.Item
                key={item.href}
                href={item.href}
                className={classNamesForItem}
                icon={item.icon}
                iconLeft={item.iconLeft}
                iconRight={item.iconRight}
                {...(index === activeItemIndex && {
                  'data-active': '',
                })}
              >
                {item.label}
              </ListNav.Item>
            ))
          )}
        </ListNav>
      </section>

      <div
        className={twJoin(
          'relative hidden cursor-auto',
          'border-theme-bg-color-shaded',
          'lg:block',
          'lg:is-stuck:bg-theme-bg-color/95',
          'lg:is-stuck:backdrop-blur-md',
          'lg:is-stuck:border-b',
        )}
      >
        <section className="site-content-container py-0">
          <TabbedNav className="is-stuck:border-b-0">
            {items.length === 0 ? (
              <TabbedNav.Tab className="italic">(no items)</TabbedNav.Tab>
            ) : (
              items.map((item, index) => (
                <TabbedNav.Tab
                  key={item.href}
                  href={item.href}
                  className={classNamesForItem}
                  {...(index === activeItemIndex && { 'data-active': '' })}
                >
                  {item.label}
                </TabbedNav.Tab>
              ))
            )}
          </TabbedNav>
        </section>
      </div>
    </StickyBox>
  )
}
