'use client'

import { Icon } from '@/components'
import { SiteVariant } from '@/components/SiteHeader'
import { useIsDocumentScrolled } from '@/lib/useIsDocumentScrolled'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps, useState } from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'
import { useIsClient, useMediaQuery } from 'usehooks-ts'
import { getClassNames } from './classNames'

export type SiteNavItemDescriptor = [
  label: string,
  href: string | [label: string, href: string][],
]

export type FooterNavItemDescriptor = [
  heading: string,
  items: [label: string, href: string][],
]

export interface SiteNavProps extends ComponentProps<'nav'> {
  itemDescriptors: SiteNavItemDescriptor[]
  variant: SiteVariant
}

export function SiteNav({
  className,
  itemDescriptors,
  variant,
  ...otherProps
}: SiteNavProps) {
  const [isShowingMobileNav, setIsShowingMobileNav] = useState(false)

  const isClient = useIsClient()

  const isInPortraitMode = useMediaQuery('(orientation: portrait)') && isClient

  const pathName = usePathname()

  const isDocumentScrolled = useIsDocumentScrolled() && isClient

  const classNamesForOrientation = getClassNames({
    isInPortraitMode: isClient && isInPortraitMode,
    isShowingMobileNav: isClient && isInPortraitMode && isShowingMobileNav,
    variant,
  })

  function handleClickPopupMenu() {
    ;(document.activeElement as HTMLDivElement)?.blur()
  }

  const renderedSiteMenu = (
    <nav
      className={twMerge(classNamesForOrientation.container, className)}
      {...otherProps}
    >
      <button
        className={classNamesForOrientation.mobileNavToggleButton({
          isDocumentScrolled,
        })}
        onClick={() => setIsShowingMobileNav(!isShowingMobileNav)}
      >
        <Icon name={isShowingMobileNav ? 'xmark' : 'bars'} />
      </button>

      <ul className={classNamesForOrientation.topLevelItemsContainer}>
        {itemDescriptors.map(([label, hrefOrChildren]) => {
          const hasChildren = Array.isArray(hrefOrChildren)

          const isActive =
            (!hasChildren && pathName.startsWith(hrefOrChildren)) ||
            (hasChildren &&
              hrefOrChildren.some(([, href]) => pathName === href))

          return (
            <li
              className={classNamesForOrientation.topLevelItemContainer({
                isActive,
              })}
              key={label}
            >
              {hasChildren ? (
                <>
                  <span
                    className={classNamesForOrientation.topLevelButton({
                      isActive,
                    })}
                    tabIndex={0}
                  >
                    {label} <Icon name="chevron-down" />
                  </span>

                  <ul
                    className={classNamesForOrientation.popupMenu}
                    onClick={handleClickPopupMenu}
                  >
                    {hrefOrChildren.map(([label, href]) => {
                      const isActive = pathName === href

                      return (
                        <li
                          className={classNamesForOrientation.popupMenuItem({
                            isActive,
                          })}
                          key={label}
                        >
                          <Link
                            className={classNamesForOrientation.popupMenuButton(
                              { isActive },
                            )}
                            href={href}
                          >
                            {label}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </>
              ) : (
                <Link
                  className={classNamesForOrientation.topLevelButton({
                    isActive,
                  })}
                  href={hrefOrChildren}
                >
                  {label}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )

  return typeof document !== 'undefined'
    ? isInPortraitMode
      ? createPortal(renderedSiteMenu, document.body)
      : renderedSiteMenu
    : renderedSiteMenu
}
