'use client'

import { Icon } from '@/components'
import { isExternalHref } from '@/lib/isExternalHref'
import { useCSSVariables } from '@/lib/useCSSVariables'
import { useIsDocumentScrolled } from '@/lib/useIsDocumentScrolled'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ComponentProps, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'
import { useIsClient, useMediaQuery } from 'usehooks-ts'

export type SiteNavigationDescriptor = {
  siteRoot: string
  headerMenuItems: HeaderMenuItemDescriptor[]
  footerMenuItems: FooterMenuItemDescriptor[]
}

type HeaderMenuItemDescriptor = [
  label: string,
  href: string | [label: string, href: string][],
]

type FooterMenuItemDescriptor = [
  heading: string,
  items: [label: string, href: string][],
]

export interface SiteNavProps extends ComponentProps<'nav'> {
  isInverted?: boolean
  itemDescriptors: HeaderMenuItemDescriptor[]
  mediaQueryForMobileMode?: string
}

export function SiteNav({
  className,
  isInverted,
  itemDescriptors,
  mediaQueryForMobileMode = '(orientation: portrait)',
  ...otherProps
}: SiteNavProps) {
  const isClient = useIsClient()
  const innerRef = useRef<HTMLDivElement>(null)
  const cssVariables = useCSSVariables(innerRef)
  const [isMobileNavOpen, setisMobileNavOpen] = useState(false)
  const isDocumentScrolled = useIsDocumentScrolled() && isClient
  const isMobileMode = useMediaQuery(mediaQueryForMobileMode) && isClient
  const pathName = usePathname()

  function handleClickPopupMenu() {
    ;(document.activeElement as HTMLDivElement)?.blur()
  }

  const renderedSiteMenu = (
    <nav
      className={twMerge(
        `
          whitespace-nowrap
          font-display
          transition-all
          duration-700
          has-[ul:empty]:hidden
        `,
        isMobileMode &&
          `
            fixed
            bottom-full
            left-0
            right-0
            top-0
            z-50
          `,
        isMobileMode &&
          isMobileNavOpen &&
          `
            bottom-0
            bg-textColor/30
            backdrop-blur-xs
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
            inverted:text-white/80
            flex
            text-xs
            dark:text-white/80
          `,
          isMobileMode
            ? `
                absolute
                -left-full
                bottom-0
                top-0
                flex-col
                gap-6
                whitespace-nowrap
                bg-brandColor
                py-6
                pl-6
                pr-12
                transition-all
                duration-500
              `
            : `
                gap-4
                lg:gap-6
              `,
          isMobileNavOpen &&
            `
              inverted
              left-0
            `,
        )}
      >
        {itemDescriptors.map(([label, hrefOrChildren]) => {
          const hasChildren = Array.isArray(hrefOrChildren)
          const isActive =
            (!hasChildren && pathName.startsWith(hrefOrChildren)) ||
            (hasChildren &&
              hrefOrChildren.some(([, href]) => pathName === href))
          const isExternalLink =
            typeof hrefOrChildren === 'string' && isExternalHref(hrefOrChildren)

          return (
            <li
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
                      inverted:border-b-white
                      border-b-2
                      border-b-brandColor
                      font-bold
                      dark:border-b-white
                    `),
              )}
              key={label}
            >
              {hasChildren ? (
                <>
                  <span
                    className={twMerge(
                      `
                        inverted:text-white/60
                        inverted:hover:text-white
                        inverted:focus:text-white
                        flex
                        items-center
                        gap-1
                        text-textColor/60
                        transition-all
                        hover:text-textColor
                        focus:text-textColor
                        dark:text-white/60
                        dark:hover:text-white
                        dark:focus:text-white
                      `,
                      isActive &&
                        `
                          inverted:text-white
                          text-textColor
                          dark:text-white
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
                            pointer-events-none
                            absolute
                            left-0
                            top-full
                            -mx-6
                            mt-3
                            whitespace-nowrap
                            bg-bgColor
                            py-3
                            text-textColor
                            opacity-0
                            shadow-2xl
                            shadow-brandColor/20
                            group-has-focus/navItem:pointer-events-auto
                            group-has-focus/navItem:opacity-100
                          `,
                    )}
                    onClick={handleClickPopupMenu}
                  >
                    {hrefOrChildren.map(([label, href]) => {
                      const isActive = pathName === href
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
                                  py-2
                                  pl-6
                                  pr-12
                                  hover:bg-brandColor/10
                                  focus:bg-brandColor/10
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
                                    bg-brandColor/10
                                  `),
                            )}
                            href={href}
                            target={isExternalLink ? '_blank' : undefined}
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
                      inverted:text-white/60
                      inverted:hover:text-white
                      inverted:focus:text-white
                      flex
                      items-center
                      gap-1
                      text-textColor/60
                      transition-all
                      hover:text-textColor
                      focus:text-textColor
                      dark:text-white/60
                      dark:hover:text-white
                      dark:focus:text-white
                    `,
                    isActive &&
                      `
                        inverted:text-white
                        text-textColor
                        dark:text-white
                      `,
                  )}
                  href={hrefOrChildren}
                  target={isExternalLink ? '_blank' : undefined}
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
