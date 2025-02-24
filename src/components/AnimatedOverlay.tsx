'use client'

import { useIsInverted } from '@/lib/useIsInverted'
import { ComponentProps, RefObject, useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { twMerge } from 'tailwind-merge'

interface AnimatedOverlayProps extends ComponentProps<'div'> {
  borderRadius?: number
  classNamesForPath?: string
  isTracing: boolean
  padding?: number
  strokeWidth?: number
  targetElementRef: RefObject<HTMLElement | null>
}

export function AnimatedOverlay({
  borderRadius = 0,
  children,
  className,
  classNamesForPath,
  isTracing,
  padding = 20,
  strokeWidth = 1,
  targetElementRef,
  ...otherProps
}: AnimatedOverlayProps) {
  const isInverted = useIsInverted(targetElementRef)

  const [targetElementBoundingBox, setTargetElementBoundingBox] =
    useState<DOMRect>()

  useEffect(() => {
    function updateTargetElementPosition() {
      const targetElement = targetElementRef.current

      if (!targetElement) return

      const boundingBox = targetElement.getBoundingClientRect()

      setTargetElementBoundingBox(boundingBox)
    }

    updateTargetElementPosition()

    window.addEventListener('resize', updateTargetElementPosition)
    window.addEventListener('scroll', updateTargetElementPosition)

    return () => {
      window.removeEventListener('resize', updateTargetElementPosition)
      window.removeEventListener('scroll', updateTargetElementPosition)
    }
  }, [isTracing, targetElementRef])

  if (!(targetElementRef.current && targetElementBoundingBox)) return null

  const { height, left, top, width } = targetElementBoundingBox

  const heightWithPadding = height + padding * 2
  const widthWithPadding = width + padding * 2
  const leftWithPadding = left - padding
  const topWithPadding = top + window.scrollY - padding

  const perimeter =
    2 * (widthWithPadding + heightWithPadding - 4 * borderRadius) +
    2 * Math.PI * borderRadius

  return createPortal(
    <div
      className={twMerge(
        `
          absolute
          duration-700
        `,
        isInverted && 'dark',
        className,
      )}
      style={{
        height: heightWithPadding,
        left: leftWithPadding,
        top: topWithPadding,
        width: widthWithPadding,
      }}
      {...otherProps}
    >
      <svg
        width={widthWithPadding}
        height={heightWithPadding}
        viewBox={`0 0 ${widthWithPadding} ${heightWithPadding}`}
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect
          className={twMerge(
            `
              transition-[stroke-dashoffset]
              duration-700
              ease-in-out
            `,
            classNamesForPath,
          )}
          strokeDashoffset={isTracing ? 0 : perimeter}
          strokeDasharray={perimeter}
          height={heightWithPadding - strokeWidth}
          strokeWidth={strokeWidth}
          rx={20}
          ry={20}
          width={widthWithPadding - strokeWidth}
          x={strokeWidth / 2}
          y={strokeWidth / 2}
        />
      </svg>

      {children}
    </div>,
    document.body,
  )
}
