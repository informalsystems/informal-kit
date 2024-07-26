'use client'

import { AnimatedOverlay, Icon } from '@/components'
import { useAdvancedHover } from '@/lib/useAdvancedHover'
import { ComponentProps, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { classNames } from './classNames'

interface ContentfulHotspotProps extends ComponentProps<'div'> {
  buttonPosition?: 'top right' | 'center'
  disableEditing?: boolean
  contentfulURL: string
}

export function ContentfulHotspot({
  buttonPosition = 'top right',
  children,
  className,
  disableEditing = false,
  contentfulURL,
}: ContentfulHotspotProps) {
  const containerElementRef = useRef<HTMLDivElement>(null)

  const isHovering =
    useAdvancedHover({
      hoverDelay: 1000,
      unHoverDelay: 500,
      margin: 20,
      targetElementRef: containerElementRef,
    }) && !disableEditing

  function handleClickToEdit() {
    window.open(contentfulURL, '_blank')
  }

  return (
    <div
      className={twMerge(
        `
          relative
          w-full
        `,
        className,
      )}
      ref={containerElementRef}
    >
      {disableEditing !== true &&
        process.env.NEXT_PUBLIC_SHOW_CONTENTFUL_HOTSPOTS?.toLowerCase() ===
          'true' && (
          <AnimatedOverlay
            className={classNames.tracerAndButtonContainer({ isHovering })}
            classNamesForPath={classNames.path({ isHovering })}
            isTracing={isHovering}
            strokeWidth={2}
            targetElementRef={containerElementRef}
          >
            <button
              className={classNames.editButton({
                buttonPosition,
                isHovering,
              })}
              onClick={handleClickToEdit}
            >
              <span>Edit in Contentful</span>
              <Icon name="arrow-up-right-from-square" />
            </button>
          </AnimatedOverlay>
        )}

      {children}
    </div>
  )
}
