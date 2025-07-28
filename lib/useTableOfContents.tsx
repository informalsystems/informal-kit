'use client'

import debounce from 'lodash/debounce'
import throttle from 'lodash/throttle'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { twJoin } from 'tailwind-merge'
import { useInterval } from 'usehooks-ts'
import { CopyToClipboardButton } from '../components/CopyToClipboardButton'
import { Icon } from '../components/Icon'
import { slugify } from './slugify'

/**
 * Hook that extracts headings from a DOM element and returns them as navigation items.
 *
 * This hook handles:
 * - Finding headings in the specified element
 * - Generating unique slugs for each heading
 * - Portalling "copy to clipboard" buttons into each heading. A faded "#" with a tooltip
 * - Tracking which heading is currently active based on scroll position
 * - Adding necessary CSS classes and IDs to headings
 *
 * @param options.elementSelector - CSS selector for the container element
 * @param options.headingsSelector - CSS selector for headings (default: 'h1, h2, h3, h4, h5, h6')
 *
 * @returns Object containing items array, activeItemIndex, and portals array
 *
 * @example
 * ```tsx
 * const { items, activeItemIndex, portals } = useTableOfContents({
 *   elementSelector: '.blog-post',
 *   headingsSelector: 'h2, h3'
 * })
 *
 * return (
 *   <>
 *     {portals}
 *     <StickyNav
 *       items={items}
 *       activeItemIndex={activeItemIndex}
 *       variant="list"
 *       title="Table of Contents"
 *     />
 *   </>
 * )
 * ```
 */

interface TableOfContentsItem {
  label: string
  href: string
  level: number
  slug: string
}

interface UseTableOfContentsOptions {
  elementSelector: string
  headingsSelector?: string
}

interface UseTableOfContentsReturn {
  items: TableOfContentsItem[]
  activeItemIndex: number
  portals: React.ReactPortal[]
}

interface HeadingDescriptor {
  slug: string
  level: number
  text: string
  element: Element
}

function generateUniqueSlug(
  baseSlug: string,
  existingSlugs: Set<string>,
): string {
  if (!existingSlugs.has(baseSlug)) {
    return baseSlug
  }

  let counter = 1
  let uniqueSlug = `${baseSlug}-${counter}`

  while (existingSlugs.has(uniqueSlug)) {
    counter++
    uniqueSlug = `${baseSlug}-${counter}`
  }

  return uniqueSlug
}

function createClipboardButton(slug: string) {
  const fullUrl = `${window.location.origin}${window.location.pathname}#${slug}`

  return (
    <CopyToClipboardButton
      as="a"
      href={`#${slug}`}
      title="Click to copy link to this section"
      payload={fullUrl}
      variant="button.icon"
      className={twJoin(
        'inline-flex',
        'items-center justify-center align-middle',
        'size-10 rounded-full',
        'ml-2',
        'bg-gray-100 text-gray-600',
        'text-base',
        'transition-all',
        'opacity-0',
        'group-hover/toc-heading:scale-75',
        'group-hover/toc-heading:opacity-100',
        'hover:bg-gray-200',
        'hover:text-gray-800',
      )}
    >
      {({ isCopied }) => <Icon name={isCopied ? 'clipboard-check' : 'link'} />}
    </CopyToClipboardButton>
  )
}

export function useTableOfContents({
  elementSelector,
  headingsSelector = 'h1, h2, h3, h4, h5, h6',
}: UseTableOfContentsOptions): UseTableOfContentsReturn {
  const [items, setItems] = useState<TableOfContentsItem[]>([])
  const [portals, setPortals] = useState<React.ReactPortal[]>([])
  const [activeItemIndex, setActiveItemIndex] = useState(0)
  const [hasFoundItems, setHasFoundItems] = useState(false)

  const observerRef = useRef<IntersectionObserver | null>(null)
  const lastProcessedHashRef = useRef<string>('')
  const currentElementSelectorRef = useRef<string>('')
  const currentHeadingsSelectorRef = useRef<string>('')

  const resetState = useCallback(() => {
    setItems([])
    setPortals([])
    setActiveItemIndex(0)
    setHasFoundItems(false)
    lastProcessedHashRef.current = ''
  }, [])

  const cleanupObservers = useCallback(() => {
    if (observerRef.current) {
      observerRef.current.disconnect()
      observerRef.current = null
    }
  }, [])

  const processExistingHeadings = useCallback(
    (element: Element): HeadingDescriptor[] => {
      const existingProcessedHeadings = element.querySelectorAll(
        `${headingsSelector}.js-toc-heading`,
      )

      return Array.from(existingProcessedHeadings).map(headingElement => ({
        slug: headingElement.id,
        level: parseInt(headingElement.tagName.slice(1), 10),
        text: headingElement.textContent?.trim() || '',
        element: headingElement,
      }))
    },
    [headingsSelector],
  )

  const processNewHeadings = useCallback(
    (element: Element): HeadingDescriptor[] => {
      const headingElements = Array.from(
        element.querySelectorAll(`${headingsSelector}:not(.js-toc-heading)`),
      )

      if (!headingElements.length) {
        return []
      }

      const currentHash = headingElements
        .map(el => `${el.tagName}:${el.textContent?.trim()}`)
        .join('|')

      if (currentHash === lastProcessedHashRef.current) {
        return []
      }

      lastProcessedHashRef.current = currentHash

      const existingSlugs = new Set<string>()
      return headingElements
        .map(headingElement => {
          const text = (headingElement.textContent?.trim() || '').replace(
            /\s/gm, // Find Non-breaking spaces
            ' ', // Make them sapces again
          )
          const baseSlug = slugify(text)

          if (!baseSlug) {
            console.warn('Skipping heading with empty slug:', text)
            return null
          }

          const uniqueSlug = generateUniqueSlug(baseSlug, existingSlugs)
          existingSlugs.add(uniqueSlug)

          return {
            slug: uniqueSlug,
            level: parseInt(headingElement.tagName.slice(1), 10),
            text,
            element: headingElement,
          }
        })
        .filter(
          (descriptor): descriptor is HeadingDescriptor => descriptor !== null,
        )
    },
    [headingsSelector],
  )

  const setupHeadings = useCallback((descriptors: HeadingDescriptor[]) => {
    descriptors.forEach(({ element: headingElement, slug }) => {
      headingElement.classList.add(
        'js-toc-heading',
        'group/toc-heading',
        'relative',
      )
      headingElement.id = slug
    })
  }, [])

  const createPortals = useCallback((descriptors: HeadingDescriptor[]) => {
    return descriptors.map(({ element, slug }) => {
      const button = createClipboardButton(slug)
      return createPortal(button, element)
    })
  }, [])

  const getHeadingDescriptors = useCallback(() => {
    const element = document.querySelector(elementSelector)

    if (!element) {
      return
    }

    let descriptors = processExistingHeadings(element)

    if (descriptors.length === 0) {
      descriptors = processNewHeadings(element)

      if (descriptors.length === 0) {
        return
      }

      setupHeadings(descriptors)
    }

    const newItems = descriptors.map(descriptor => ({
      label: descriptor.text,
      href: `#${descriptor.slug}`,
      level: descriptor.level,
      slug: descriptor.slug,
    }))

    const newPortals = createPortals(descriptors)

    setItems(newItems)
    setPortals(newPortals)
    setHasFoundItems(true)
  }, [
    elementSelector,
    processExistingHeadings,
    processNewHeadings,
    setupHeadings,
    createPortals,
  ])

  const debouncedGetHeadingDescriptors = useMemo(
    () => debounce(getHeadingDescriptors, 100),
    [getHeadingDescriptors],
  )

  const throttledSetActiveItemIndex = useMemo(
    () => throttle(setActiveItemIndex, 100),
    [],
  )

  useInterval(
    () => {
      if (!hasFoundItems) {
        debouncedGetHeadingDescriptors()
      }
    },
    hasFoundItems ? null : 200,
  )

  useEffect(() => {
    const selectorsChanged =
      currentElementSelectorRef.current !== elementSelector ||
      currentHeadingsSelectorRef.current !== headingsSelector

    if (selectorsChanged) {
      resetState()
      cleanupObservers()

      currentElementSelectorRef.current = elementSelector
      currentHeadingsSelectorRef.current = headingsSelector
    }
  }, [elementSelector, headingsSelector, resetState, cleanupObservers])

  useEffect(() => {
    if (!items.length) return

    cleanupObservers()

    observerRef.current = new IntersectionObserver(
      entries => {
        let newActiveIndex = -1
        let highestIntersectionRatio = 0

        entries.forEach(entry => {
          if (
            entry.isIntersecting &&
            entry.intersectionRatio > highestIntersectionRatio &&
            entry.intersectionRatio > 0.1
          ) {
            highestIntersectionRatio = entry.intersectionRatio
            const slug = entry.target.id
            const index = items.findIndex(item => item.slug === slug)
            if (index !== -1) {
              newActiveIndex = index
            }
          }
        })

        if (newActiveIndex !== -1) {
          throttledSetActiveItemIndex(prevIndex =>
            prevIndex !== newActiveIndex ? newActiveIndex : prevIndex,
          )
        }
      },
      {
        rootMargin: '-10% 0px -10% 0px',
        threshold: [0.2, 0.5, 0.8, 1],
      },
    )

    items.forEach(({ slug }) => {
      if (!slug) return
      const element = document.getElementById(slug)
      if (element) {
        observerRef.current!.observe(element)
      }
    })

    return cleanupObservers
  }, [items, cleanupObservers, throttledSetActiveItemIndex])

  return {
    items,
    activeItemIndex,
    portals,
  }
}
