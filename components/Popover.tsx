'use client'

import {
  ComponentProps,
  FocusEvent,
  MouseEvent,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'
import { useIsClient } from 'usehooks-ts'

export interface PopoverProps extends Omit<ComponentProps<'div'>, 'content'> {
  children: ReactNode
  childrenForPopover: ReactNode
  disabled?: boolean
  classNamesForPopover?: string
  triggerType?: 'hover' | 'click'
  mouseEnterDelay?: number
  mouseLeaveDelay?: number
  popoverPosition?: 'above' | 'below'
  offset?: number
}

export function Popover({
  children,
  childrenForPopover,
  disabled,
  className,
  classNamesForPopover,
  triggerType = 'hover',
  mouseEnterDelay = 350,
  mouseLeaveDelay = 350,
  popoverPosition = 'above',
  offset = 8,
  ...otherProps
}: PopoverProps) {
  const isClient = useIsClient()
  const [position, setPosition] = useState({ x: 0, y: 0, maxHeight: 0 })
  const [isOpen, setIsOpen] = useState(false)
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null)
  const popoverRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && triggerRef.current) {
      const timeoutId = setTimeout(() => {
        updateCoords(triggerRef.current!)
        if (popoverRef.current) {
          popoverRef.current.scrollTop = 0
        }
      }, 0)
      return () => clearTimeout(timeoutId)
    }
  }, [isOpen])

  if (!isClient) return null

  if (disabled) {
    return (
      <div
        className={twMerge('inline-block w-min', className)}
        {...otherProps}
      >
        {children}
      </div>
    )
  }

  function updateCoords(element: HTMLDivElement) {
    const targetCoords = element.getBoundingClientRect()
    const popoverElement = popoverRef.current

    if (!popoverElement) {
      return
    }

    const popoverWidth = popoverElement.offsetWidth
    const popoverHeight = popoverElement.offsetHeight
    const viewportWidth = window.innerWidth
    const viewportHeight = window.innerHeight

    let xPosition = targetCoords.x + targetCoords.width / 2

    // Ensure the popover doesn't overflow left/right
    const minX = popoverWidth / 2
    const maxX = viewportWidth - popoverWidth / 2
    xPosition = Math.max(minX, Math.min(xPosition, maxX))

    // Calculate available space above and below
    const spaceAbove = targetCoords.y - window.scrollY
    const spaceBelow = viewportHeight - (targetCoords.bottom - window.scrollY)

    // Calculate positions
    const maxHeight = Math.max(spaceAbove, spaceBelow) - 16 // 16px padding
    const abovePosition =
      targetCoords.top - Math.min(popoverHeight, maxHeight) - offset
    const belowPosition = targetCoords.bottom + offset

    // Only override preferred position if there isn't enough space
    let finalPosition =
      popoverPosition === 'above' ? abovePosition : belowPosition

    if (popoverPosition === 'above' && spaceAbove < popoverHeight) {
      finalPosition = belowPosition
    } else if (popoverPosition === 'below' && spaceBelow < popoverHeight) {
      finalPosition = abovePosition
    }

    setPosition({
      x: xPosition,
      y: finalPosition,
      maxHeight,
    })
  }

  function handleMouseEnter(event: MouseEvent<HTMLDivElement>) {
    if (triggerType !== 'hover') return

    if (timer.current) {
      clearTimeout(timer.current)
    }

    updateCoords(event.currentTarget)

    timer.current = setTimeout(() => {
      setIsOpen(true)
    }, mouseEnterDelay)
  }

  function handleMouseLeave() {
    if (triggerType !== 'hover') return
    if (timer.current) clearTimeout(timer.current)
    timer.current = setTimeout(() => {
      setIsOpen(false)
    }, mouseLeaveDelay)
  }

  function handleFocus(event: FocusEvent<HTMLDivElement>) {
    updateCoords(event.currentTarget)
    setIsOpen(true)
  }

  function handleBlur() {
    timer.current = setTimeout(() => {
      setIsOpen(false)
    }, 200)
  }

  return (
    <div
      ref={triggerRef}
      className={twMerge(
        'group/popover relative z-10 inline-block w-min',
        className,
      )}
      tabIndex={0}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onFocus={handleFocus}
      onBlur={handleBlur}
      {...otherProps}
    >
      {children}

      {createPortal(
        <div
          ref={popoverRef}
          className={twMerge(
            'absolute left-1/2 z-50 -translate-x-1/2',
            'pointer-events-none overflow-auto opacity-0 transition-opacity',
            'scrollbar-thin scrollbar-thumb-bg-tertiary scrollbar-track-transparent',
            isOpen && 'pointer-events-auto opacity-100',
            classNamesForPopover,
          )}
          style={{
            top: position.y,
            left: position.x,
            maxHeight: position.maxHeight,
          }}
        >
          {childrenForPopover}
        </div>,
        document.body,
      )}
    </div>
  )
}
