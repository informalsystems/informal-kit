'use client'

import { ComponentProps, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import { useReadLocalStorage } from 'usehooks-ts'
import { useAdvancedHover } from '../../lib/useAdvancedHover'
import { useIsInverted } from '../../lib/useIsInverted'
import { Icon } from '../Icon'
import { AnimatedOverlay } from './AnimatedOverlay'

const classNames = {
  tracerAndButtonContainer: ({ isHovering = false }) =>
    twMerge(
      'pointer-events-none',
      'z-50',
      'rounded-[20px]',
      'transition-[background,opacity]',
      isHovering
        ? ['bg-theme-accent-color/5', 'opacity-100', 'duration-500']
        : ['bg-theme-accent-color/0', 'opacity-50', 'duration-1000'],
    ),

  path: ({ isHovering = false }) =>
    twMerge(
      'stroke-theme-accent-color/30',
      'transition-all',
      'is-inverted:stroke-white',
      isHovering ? 'opacity-100 duration-1000' : 'opacity-0 duration-500',
    ),

  editButton: ({ buttonPosition = 'top right', isHovering = false }) =>
    twMerge(
      'bg-theme-accent-color',
      'text-theme-bg-color',
      'pointer-events-none',
      'absolute',
      'flex gap-1',
      'px-3 py-1',
      'text-xs',
      'whitespace-nowrap',
      'opacity-0',
      'transition-all',
      'hover:scale-105',

      buttonPosition === 'top right'
        ? ['top-0', 'right-0', 'origin-top-right', 'rounded-bl']
        : [
            'top-1/2',
            'left-1/2',
            '-translate-x-1/2',
            '-translate-y-1/2',
            'rounded',
          ],

      isHovering && ['cursor-pointer', 'pointer-events-auto', 'opacity-100'],
    ),
}

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

  const isInverted = useIsInverted(containerElementRef)

  function handleClickToEdit() {
    window.open(contentfulURL, '_blank')
  }

  return (
    <div
      className={twMerge('relative', isInverted && 'is-inverted', className)}
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
