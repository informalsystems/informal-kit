'use client'

import { ComponentProps, useEffect, useRef } from 'react'

interface ImageMarqueeProps extends ComponentProps<'div'> {
  pixelsPerSecond?: number
}

export function Marquee({
  children,
  pixelsPerSecond = 50,
  ...otherProps
}: ImageMarqueeProps) {
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = innerRef.current

    if (!container) return

    container.addEventListener('transitionend', handleTransitionEnd)
    container.style.transitionTimingFunction = 'linear'

    tick()

    function tick() {
      const container = innerRef.current!
      const firstChild = container.firstElementChild as HTMLDivElement
      const secondChild = firstChild.nextElementSibling as HTMLDivElement

      if (!(firstChild && secondChild)) return

      const secondChildOffsetLeft = secondChild.offsetLeft
      const durationMs = (secondChildOffsetLeft / pixelsPerSecond) * 1000

      container.style.transitionDuration = `${durationMs}ms`
      container.style.transitionProperty = 'transform'
      container.style.transform = `translateX(-${secondChildOffsetLeft}px)`
    }

    function handleTransitionEnd() {
      const container = innerRef.current!
      container.style.transitionProperty = 'none'
      container.style.transform = 'translateX(0)'
      container.appendChild(container.firstElementChild!)
      tick()
    }

    return () => {
      container.removeEventListener('transitionend', handleTransitionEnd)
    }
  }, [pixelsPerSecond])

  return (
    <div
      ref={innerRef}
      {...otherProps}
    >
      {children}
    </div>
  )
}
