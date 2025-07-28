'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'
import { useIsClient, useMediaQuery } from 'usehooks-ts'
import { isExternalHref } from '../lib/isExternalHref'
import { useCSSVariables } from '../lib/useCSSVariables'
import { useIsDocumentScrolled } from '../lib/useIsDocumentScrolled'
import { Icon } from './Icon'

export type SiteNavigationDescriptor = {
  siteRoot: string
  headerMenuItems: HeaderMenuItemDescriptor[]
  footerMenuItems: FooterMenuItemDescriptor[]
}

type HeaderMenuItemDescriptor = [
  label: string,
  href: string | [label: string, href: string][],
]

type FooterMenuItemDescriptor = [label: string, href: string]

export interface SiteNavProps extends ComponentProps<'nav'> {
  isInverted?: boolean
  itemDescriptors: HeaderMenuItemDescriptor[]
  mediaQueryForMobileMode?: string
}

export function SiteNav({
  className,
  isInverted,
  itemDescriptors,
  mediaQueryForMobileMode = '(max-width: 1023px)',
  ...otherProps
}: SiteNavProps) {
  const isClient = useIsClient()
  const innerRef = useRef<HTMLDivElement>(null)
  const cssVariables = useCSSVariables(innerRef)
  const [isMobileNavOpen, setisMobileNavOpen] = useState(false)
  const isDocumentScrolled = useIsDocumentScrolled() && isClient
  const isMobileMode = useMediaQuery(mediaQueryForMobileMode) && isClient
  const pathname = usePathname()

  function handleClickPopupMenu() {
    ;(document.activeElement as HTMLDivElement)?.blur()
  }

  const renderedSiteMenu = (
    <nav
      className={twMerge(
        `
          font-display
          whitespace-nowrap
          transition-all
          duration-700
          has-[ul:empty]:hidden
        `,
        isMobileMode &&
          `
            fixed
            top-0
            right-0
            bottom-full
            left-0
            z-50
          `,
        isMobileMode &&
          isMobileNavOpen &&
          `
            bg-theme-text-color/30
            bottom-0
            backdrop-blur-sm
          `,
        isMobileNavOpen &&
          isInverted &&
          `
            bg-white/20
          `,
        className,
      )}
      style={cssVariables}
      {...otherProps}
    >
      <button
        className={twMerge(
          `
            absolute
            right-0
            z-10
            transition-all
          `,
          isDocumentScrolled &&
            !isMobileNavOpen &&
            `
              -top-2
              text-white
            `,
          !isDocumentScrolled &&
            !isMobileNavOpen &&
            `
              top-0
            `,
          isMobileMode &&
            isDocumentScrolled &&
            `
              -top-4
            `,
          isMobileMode
            ? `
                cursor-pointer
                p-5
                text-2xl
                opacity-100
              `
            : `
                pointer-events-none
                opacity-0
              `,
          (isInverted || isDocumentScrolled) &&
            `
              text-white
            `,
        )}
        onClick={() => setisMobileNavOpen(!isMobileNavOpen)}
      >
        <span className="sr-only">Toggle Site Navigation</span>
        <Icon name={isMobileNavOpen ? 'xmark' : 'bars'} />
      </button>

      <ul
        className={twMerge(
          `
            is-inverted:text-white/80
            flex
            text-xs
          `,
          isMobileMode
            ? `
              bg-theme-accent-color
              absolute
              top-0
              bottom-0
              -left-full
              flex-col
              gap-6
              py-6
              pr-12
              pl-6
              whitespace-nowrap
              transition-all
              duration-500
            `
            : `
              gap-4
              lg:gap-6
            `,
          isMobileNavOpen &&
            `
              is-inverted
              left-0
            `,
        )}
      >
        {itemDescriptors.map(([label, hrefOrChildren]) => {
          const hasChildren = Array.isArray(hrefOrChildren)
          const isActive =
            (!hasChildren && pathname.startsWith(hrefOrChildren)) ||
            (hasChildren &&
              hrefOrChildren.some(([, href]) => pathname === href))
          const isExternalLink =
            typeof hrefOrChildren === 'string' && isExternalHref(hrefOrChildren)

          return (
            <li
              key={label}
              className={twMerge(
                `
                  group/navItem
                  relative
                  flex
                  cursor-pointer
                  flex-col
                `,
                isActive &&
                  (isMobileMode
                    ? `
                      font-bold
                    `
                    : `
                      border-b-theme-accent-color
                      is-inverted:border-b-white
                      border-b-2
                      font-bold
                    `),
              )}
            >
              {hasChildren ? (
                <>
                  <span
                    className={twMerge(
                      `
                        text-theme-text-color/60
                        hover:text-theme-text-color
                        focus:text-theme-text-color
                        is-inverted:text-white/60
                        is-inverted:hover:text-white
                        is-inverted:focus:text-white
                        flex
                        items-center
                        gap-1
                        transition-all
                      `,
                      isActive &&
                        `
                          text-theme-text-color
                          is-inverted:text-white
                        `,
                    )}
                    tabIndex={0}
                  >
                    {label} <Icon name="chevron-down" />
                  </span>

                  <ul
                    className={twMerge(
                      `
                        flex
                        flex-col
                        transition-all
                      `,
                      isMobileMode
                        ? `
                            mt-3
                            gap-3
                            text-white
                          `
                        : `
                            not-inverted
                            bg-theme-bg-color
                            text-theme-text-color
                            shadow-theme-accent-color/20
                            pointer-events-none
                            absolute
                            top-full
                            left-1/2
                            mt-3
                            -translate-x-1/2
                            py-3
                            whitespace-nowrap
                            opacity-0
                            shadow-2xl
                            group-has-focus/navItem:pointer-events-auto
                            group-has-focus/navItem:opacity-100
                          `,
                    )}
                    onClick={handleClickPopupMenu}
                  >
                    {hrefOrChildren.map(([label, href]) => {
                      const isActive = pathname === href
                      const isExternalLink = isExternalHref(href)

                      return (
                        <li key={label}>
                          <Link
                            className={twMerge(
                              `
                                flex
                                w-full
                                gap-1
                              `,
                              isMobileMode
                                ? `
                                  pl-6
                                `
                                : `
                                  hover:bg-theme-accent-color/10
                                  focus:bg-theme-accent-color/10
                                  py-2
                                  pr-12
                                  pl-6
                                `,
                              !isActive &&
                                isMobileMode &&
                                `
                                  opacity-60
                                `,
                              isActive &&
                                (isMobileMode
                                  ? `
                                    opacity-100
                                  `
                                  : `
                                    bg-theme-accent-color/10
                                  `),
                            )}
                            href={href}
                            target={isExternalLink ? '_blank' : undefined}
                            onClick={() => setisMobileNavOpen(false)}
                          >
                            {label}
                            {isExternalLink && (
                              <Icon name="arrow-up-right-from-square" />
                            )}
                          </Link>
                        </li>
                      )
                    })}
                  </ul>
                </>
              ) : (
                <Link
                  className={twMerge(
                    `
                      text-theme-text-color/60
                      hover:text-theme-text-color
                      focus:text-theme-text-color
                      is-inverted:text-white/60
                      is-inverted:hover:text-white
                      is-inverted:focus:text-white
                      flex
                      items-center
                      gap-1
                      transition-all
                    `,
                    isActive &&
                      `
                        text-theme-text-color
                        is-inverted:text-white
                      `,
                  )}
                  href={hrefOrChildren}
                  target={isExternalLink ? '_blank' : undefined}
                  onClick={() => setisMobileNavOpen(false)}
                >
                  {label}
                  {isExternalLink && <Icon name="arrow-up-right-from-square" />}
                </Link>
              )}
            </li>
          )
        })}
      </ul>
    </nav>
  )

  return (
    <div ref={innerRef}>
      {typeof document !== 'undefined'
        ? isMobileMode
          ? createPortal(renderedSiteMenu, document.body)
          : renderedSiteMenu
        : renderedSiteMenu}
    </div>
  )
}
