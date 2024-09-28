'use client'

import { throttle } from 'lodash'
import { RefObject, useEffect, useState } from 'react'

export function useAdvancedHover({
  targetElementRef,
  delay = 0,
  hoverDelay = delay,
  unHoverDelay = delay,
  margin = 0,
}: {
  targetElementRef: RefObject<HTMLElement | null>
  delay?: number
  hoverDelay?: number
  unHoverDelay?: number
  margin?: number
}) {
  const [isHovering, setIsHovering] = useState(false)
  const [isActuallyHovering, setIsActuallyHovering] = useState(false)

  useEffect(() => {
    function handleMouseMove(event: MouseEvent) {
      const targetElement = targetElementRef.current

      if (!targetElement) return

      const refElementBoundingBox = targetElement.getBoundingClientRect()

      const { left, top, width, height } = refElementBoundingBox

      const scrolledLeft = window.scrollX + left
      const scrolledTop = window.scrollY + top

      const isMouseOverElement =
        event.pageX > scrolledLeft - margin &&
        event.pageX < scrolledLeft + width + margin &&
        event.pageY > scrolledTop - margin &&
        event.pageY < scrolledTop + height + margin

      setIsHovering(isMouseOverElement)
    }

    const throttledHandleMouseMove = throttle(handleMouseMove, 50)

    window.addEventListener('mousemove', throttledHandleMouseMove)

    return () =>
      window.removeEventListener('mousemove', throttledHandleMouseMove)
  }, [margin, targetElementRef])

  useEffect(() => {
    const timer = setTimeout(
      () => setIsActuallyHovering(isHovering),
      isHovering ? hoverDelay : unHoverDelay,
    )

    return () => clearTimeout(timer)
  }, [isHovering, hoverDelay, unHoverDelay])

  return isActuallyHovering
}
