'use client'

import { slugify } from '@/lib/slugify'
import { takeWhile } from 'lodash'
import Link from 'next/link'
import {
  ComponentProps,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'

export interface TableOfContentsProps
  extends Omit<ComponentProps<'nav'>, 'children'> {
  classNamesForButton?: string
  classNamesForChildrenContainer?: string
  classNamesForContainer?: string
  classNamesForItem?: string
  elementSelector: string
  headingsSelector?: string
  renderButton?: (renderProps: HeadingDescriptor) => ReactNode
  renderHeadingAnchor?: (renderProps: HeadingDescriptor) => ReactNode
  renderItem?: (
    renderProps: HeadingDescriptor & {
      children: ReactNode
    },
  ) => ReactNode
}

interface HeadingDescriptor {
  level: number
  slug: string
  text: string
}

export function TableOfContents({
  className,
  classNamesForButton,
  classNamesForChildrenContainer,
  classNamesForContainer,
  classNamesForItem,
  elementSelector,
  headingsSelector = 'h1, h2, h3, h4, h5, h6',
  renderButton,
  renderHeadingAnchor,
  renderItem,
  ...otherProps
}: TableOfContentsProps) {
  const [headingDescriptors, setHeadingDescriptors] = useState<
    HeadingDescriptor[]
  >([])

  const [portals, setPortals] = useState<ReactPortal[]>([])

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>

    function getHeadingDescriptors() {
      const element = document.querySelector(elementSelector)

      if (!element) return

      const newHeadingDescriptors = Array.from(
        element.querySelectorAll(`${headingsSelector}:not(.js-toc-heading)`),
      ).map(headingElement => {
        const text = headingElement.textContent?.trim() || ''
        const slug = headingElement.id || slugify(text)

        headingElement.classList.add(
          'js-toc-heading',
          'group/heading',
          'relative',
        )
        headingElement.id = slug

        return {
          slug,
          level: parseInt(headingElement.tagName.slice(1), 10),
          text,
        }
      })

      if (!newHeadingDescriptors.length) return

      setHeadingDescriptors(newHeadingDescriptors)

      clearInterval(interval)

      if (!renderHeadingAnchor) return

      setPortals(() =>
        newHeadingDescriptors.map(headingDescriptor =>
          createPortal(
            renderHeadingAnchor(headingDescriptor),
            document.querySelector(`#${headingDescriptor.slug}`)!,
          ),
        ),
      )
    }

    interval = setInterval(getHeadingDescriptors, 500)

    return () => clearInterval(interval)
  }, [elementSelector, headingsSelector])

  if (!headingDescriptors.length) return null

  const renderTocItems = (
    headings: HeadingDescriptor[],
    containerProps = {},
  ) => {
    if (!headings.length) return null

    const level = headings[0].level

    return (
      <ul {...containerProps}>
        {headings.map(({ level: headingLevel, slug, text }, index) => {
          if (headingLevel !== level) return null

          const childHeadings = takeWhile(
            headings.slice(index + 1),
            subsequentHeading => subsequentHeading.level > level,
          )

          const children = renderTocItems(childHeadings, {
            className: classNamesForChildrenContainer,
          })

          const itemContent = (
            <>
              {renderButton?.({ level, slug, text }) ?? (
                <Link
                  className={classNamesForButton}
                  href={`#${slug}`}
                >
                  {text}
                </Link>
              )}
              {children}
            </>
          )

          return (
            renderItem?.({ children: itemContent, level, slug, text }) ?? (
              <li
                className={classNamesForItem}
                key={slug}
              >
                {itemContent}
              </li>
            )
          )
        })}
      </ul>
    )
  }

  return (
    <>
      {portals}
      {renderTocItems(headingDescriptors, {
        className: twMerge(classNamesForContainer, className),
        ...otherProps,
      })}
    </>
  )
}
