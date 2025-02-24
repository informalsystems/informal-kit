'use client'

import { AnimatedOverlay, Icon } from '@/components'
import { useAdvancedHover } from '@/lib/useAdvancedHover'
import { ComponentProps, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { useReadLocalStorage } from 'usehooks-ts'
import { classNames } from './classNames'

export interface HoverToolsProps extends ComponentProps<'div'> {
  buttonPosition?: 'top right' | 'center'
  disableEditing?: boolean
  contentfulURL: string
}

export function HoverTools({
  buttonPosition = 'top right',
  children,
  className,
  disableEditing = false,
  contentfulURL,
  ...otherProps
}: HoverToolsProps) {
  const isHoverToEditEnabled =
    useReadLocalStorage<boolean>('isHoverToEditEnabled') ?? true

  const containerElementRef = useRef<HTMLDivElement>(null)

  const isEnabled = isHoverToEditEnabled === true && disableEditing === false

  const isHovering =
    useAdvancedHover({
      hoverDelay: 1000,
      unHoverDelay: 500,
      margin: 20,
      targetElementRef: containerElementRef,
    }) && isEnabled

  function handleClickToEdit() {
    window.open(contentfulURL, '_blank')
  }

  return (
    <div
      className={twMerge(`relative`, className)}
      ref={containerElementRef}
      {...otherProps}
    >
      {isEnabled &&
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
