'use client'

import debounce from 'lodash/debounce'
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import { twJoin } from 'tailwind-merge'
import { useInterval } from 'usehooks-ts'
import { CopyToClipboardButton } from '../components/CopyToClipboardButton'
import { Icon } from '../components/Icon'
import { Tooltipped } from '../components/Tooltipped'
import { slugify } from './slugify'
import { useActiveSection } from './useActiveSection'

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
    <Tooltipped
      tip="Copy a link to this section"
      className={twJoin(
        'absolute',
        'top-1/2 right-full -translate-y-1/2',
        'mr-2',
      )}
    >
      <CopyToClipboardButton
        as="a"
        href={`#${slug}`}
        title="Click to copy link to this section"
        payload={fullUrl}
        className={twJoin(
          'button-icon',
          'size-10 rounded-full',
          'flex',
          'items-center justify-center align-middle',
          'text-base',
          'transition-all',
          'opacity-0',
          'group-hover/toc-heading:scale-75',
          'group-hover/toc-heading:opacity-100',
        )}
      >
        {({ isCopied }) => (
          <Icon name={isCopied ? 'clipboard-check' : 'link'} />
        )}
      </CopyToClipboardButton>
    </Tooltipped>
  )
}

export function useTableOfContents({
  elementSelector,
  headingsSelector = 'h1, h2, h3, h4, h5, h6',
}: UseTableOfContentsOptions): UseTableOfContentsReturn {
  const [items, setItems] = useState<TableOfContentsItem[]>([])
  const [portals, setPortals] = useState<React.ReactPortal[]>([])
  const [hasFoundItems, setHasFoundItems] = useState(false)

  const lastProcessedHashRef = useRef<string>('')
  const currentElementSelectorRef = useRef<string>('')
  const currentHeadingsSelectorRef = useRef<string>('')

  const activeItemIndex = useActiveSection(
    items.map(item => `#${item.slug}`).filter(Boolean),
  )

  const resetState = useCallback(() => {
    setItems([])
    setPortals([])
    setHasFoundItems(false)
    lastProcessedHashRef.current = ''
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
            /\s/gm,
            ' ',
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
    const portals: React.ReactPortal[] = []

    descriptors.forEach(({ element: headingElement, slug }) => {
      headingElement.classList.add('js-toc-heading', 'group/toc-heading')
      headingElement.id = slug

      // Create portal for clipboard button
      const span = document.createElement('span')
      span.classList.add('relative')
      headingElement.prepend(span)

      const button = createClipboardButton(slug)
      portals.push(createPortal(button, span))
    })

    return portals
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
    }

    const newItems = descriptors.map(descriptor => ({
      label: descriptor.text,
      href: `#${descriptor.slug}`,
      level: descriptor.level,
      slug: descriptor.slug,
    }))

    const newPortals = setupHeadings(descriptors)

    setItems(newItems)
    setPortals(newPortals)
    setHasFoundItems(true)
  }, [
    elementSelector,
    processExistingHeadings,
    processNewHeadings,
    setupHeadings,
  ])

  const debouncedGetHeadingDescriptors = useMemo(
    () => debounce(getHeadingDescriptors, 100),
    [getHeadingDescriptors],
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

      currentElementSelectorRef.current = elementSelector
      currentHeadingsSelectorRef.current = headingsSelector
    }
  }, [elementSelector, headingsSelector, resetState])

  return {
    items,
    activeItemIndex,
    portals,
  }
}
