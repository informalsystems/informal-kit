'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'
import { useMediaQuery } from 'usehooks-ts'
import { isExternalHref } from '../lib/isExternalHref'
import { Icon } from './Icon'
import { IconString } from './Icon/types'
import { PopupMenu } from './PopupMenu'

interface NavItemProps {
  iconLeft?: IconString
  iconRight?: IconString
  label: ReactNode
  href?: string
  className?: string
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void
  preventDefault?: boolean
}

function NavItem({
  iconLeft,
  iconRight,
  label,
  href,
  className,
  onClick,
  preventDefault = false,
  ...otherProps
}: NavItemProps & React.ComponentProps<'a'>) {
  const showExternalIcon = isExternalHref(href)

  return (
    <Link
      href={href ?? '#'}
      tabIndex={0}
      target={showExternalIcon ? '_blank' : undefined}
      className={twJoin(
        'nav-item',
        'flex items-center gap-2',
        'w-full justify-between',
        className,
      )}
      onClick={event => {
        if (preventDefault) {
          event.preventDefault()
        }
        onClick?.(event)
      }}
      {...otherProps}
    >
      <span className="flex items-center gap-2">
        {iconLeft && <Icon name={iconLeft} />}
        <span>{label}</span>
      </span>
      {showExternalIcon ? (
        <Icon name="arrow-up-right-from-square" />
      ) : (
        iconRight && <Icon name={iconRight} />
      )}
    </Link>
  )
}

export interface MenuItem extends React.ComponentProps<'a'> {
  disabled?: boolean
  href?: string
  iconLeft?: IconString
  iconRight?: IconString
  label: ReactNode
  menuItems?: MenuItem[]
  target?: string
  tooltip?: ReactNode
}

export function ResponsiveSiteNav({
  menuItems,
  className,
  ...otherProps
}: React.ComponentProps<'nav'> & {
  menuItems: MenuItem[]
  className?: string
}) {
  const pathname = usePathname()
  const isMobile = useMediaQuery('(max-width: 1023px)')

  function blurActiveElement() {
    ;(document.activeElement as HTMLDivElement)?.blur()
  }

  // Helper function to create NavItem props with common logic
  function createNavItemProps(
    item: MenuItem,
    index: number,
    additionalClassName?: string,
    additionalOnClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void,
  ) {
    const {
      label,
      href,
      disabled,
      iconLeft,
      iconRight,
      onClick,
      ...otherProps
    } = item

    return {
      iconLeft,
      iconRight,
      label,
      href,
      'data-active': pathname?.startsWith(href ?? '') ? '' : undefined,
      'className': twJoin(
        additionalClassName,
        disabled && 'pointer-events-none opacity-60',
      ),
      'onClick': (event: React.MouseEvent<HTMLAnchorElement>) => {
        onClick?.(event)
        additionalOnClick?.(event)
        blurActiveElement()
      },
      ...otherProps,
    }
  }

  // Helper function to render a NavItem with common props
  function renderNavItem(
    item: MenuItem,
    index: number,
    additionalClassName?: string,
    additionalOnClick?: (event: React.MouseEvent<HTMLAnchorElement>) => void,
  ) {
    return (
      <NavItem
        key={item.href ?? index}
        {...createNavItemProps(
          item,
          index,
          additionalClassName,
          additionalOnClick,
        )}
      />
    )
  }

  // Helper function to render submenu items
  function renderSubmenuItems(subMenuItems: MenuItem[]) {
    return subMenuItems.map((item, subIndex) =>
      renderNavItem(item, subIndex, 'nav-sub-item'),
    )
  }

  // Helper function to render a menu item with submenu
  function renderMenuItemWithSubmenu(item: MenuItem, index: number) {
    const { label, href, iconLeft, iconRight, menuItems: subMenuItems } = item

    return (
      <span
        className={twJoin(
          'nav-item-with-submenu',
          'group/nav-item',
          'relative',
          'cursor-pointer',
        )}
        key={index}
      >
        {isMobile ? (
          // Mobile: Simple link with inline submenu
          <>
            <NavItem
              key={`mobile-${index}`}
              iconLeft={iconLeft}
              iconRight={iconRight}
              label={label}
              href={href}
              preventDefault={true}
            />
            <span className={twJoin('nav-sub-items', 'flex flex-col')}>
              {renderSubmenuItems(subMenuItems!)}
            </span>
          </>
        ) : (
          // Desktop: PopupMenu component
          <PopupMenu
            trigger={
              <NavItem
                key={`desktop-${index}`}
                iconLeft={iconLeft}
                iconRight={iconRight}
                label={label}
                href={href}
                className="is-desktop:w-auto"
                preventDefault={true}
              />
            }
          >
            {renderSubmenuItems(subMenuItems!)}
          </PopupMenu>
        )}
      </span>
    )
  }

  return (
    <nav
      tabIndex={0}
      className={twMerge(
        'group/navbar z-40',
        'bg-transparent',
        'pointer-events-none',
        'fixed top-0 left-0 h-screen w-screen',
        'transition-all',
        'focus-within:pointer-events-auto',
        'is-desktop:pointer-events-auto',
        'is-desktop:relative',
        'is-desktop:flex',
        'is-desktop:w-auto',
        'is-desktop:h-auto',
        className,
      )}
      {...otherProps}
    >
      <button
        className={twJoin(
          'z-40 size-12',
          'absolute top-0 right-0',
          'text-theme-text-color',
          'cursor-pointer',
          'transition-all',
          'pointer-events-auto',
          'group-focus-within/navbar:rotate-180',
          'is-desktop:hidden',
        )}
      >
        <span
          className={twJoin(
            'absolute inset-0 flex items-center justify-center',
            'text-2xl',
            'opacity-100 transition-all',
            'group-focus-within/navbar:opacity-0',
          )}
        >
          <Icon name="solid:bars" />
        </span>

        <span
          className={twJoin(
            'pointer-events-none',
            'absolute inset-0',
            'flex items-center justify-center',
            'text-2xl',
            'opacity-0',
            'transition-all',
            'group-focus-within/navbar:pointer-events-auto',
            'group-focus-within/navbar:opacity-100',
          )}
          onClick={blurActiveElement}
        >
          <Icon name="solid:xmark" />
        </span>
      </button>

      {/* Backdrop */}
      <div
        className={twJoin(
          'nav-backdrop',
          'pointer-events-none',
          'fixed inset-0 z-10',
          'opacity-0',
          'transition-all',
          'is-desktop:hidden',
          'group-focus-within/navbar:pointer-events-auto',
          'group-focus-within/navbar:opacity-100',
        )}
        onClick={blurActiveElement}
      />

      {/* Mobile Menu Background */}
      <div
        className={twJoin(
          'nav-bg',
          'absolute inset-0 z-20',
          '-translate-x-full opacity-0',
          'pointer-events-none',
          'transition-all',
          'bg-theme-accent-color',
          'group-focus-within/navbar:translate-x-0',
          'group-focus-within/navbar:opacity-100',
          'is-desktop:hidden',
        )}
      />

      {/* Menu Items */}
      <div
        className={twJoin(
          'nav-items',
          'flex flex-col',
          'relative z-30',
          '-translate-x-full',
          'transition-all',
          'opacity-0',
          'is-desktop:opacity-100',
          'is-desktop:flex-row!',
          'is-desktop:translate-x-0',
          'group-focus-within/navbar:translate-x-0',
          'group-focus-within/navbar:opacity-100',
        )}
      >
        {menuItems.map((item, index) => {
          const hasSubMenuItems = !!item.menuItems?.length

          return !hasSubMenuItems
            ? renderNavItem(item, index)
            : renderMenuItemWithSubmenu(item, index)
        })}
      </div>
    </nav>
  )
}
