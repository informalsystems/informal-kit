'use client'

import { ComponentProps, useEffect, useRef } from 'react'

interface ImageMarqueeProps extends ComponentProps<'div'> {
  duration?: number
}

export function Marquee({
  children,
  duration = 3000,
  ...otherProps
}: ImageMarqueeProps) {
  const innerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = innerRef.current!

    container.style.transition = `transform ${duration}ms linear`

    function tick() {
      const firstChild = container.firstElementChild as HTMLDivElement
      const secondChild = firstChild.nextElementSibling as HTMLDivElement

      if (!(firstChild && secondChild)) return

      const secondChildOffset = secondChild.offsetLeft

      container.style.transitionProperty = 'transform'
      container.style.transform = `translateX(-${secondChildOffset}px)`
    }

    function handleTransitionEnd() {
      container.style.transitionProperty = 'none'
      container.style.transform = 'translateX(0)'
      container.appendChild(container.firstElementChild!)
      tick()
    }

    container.addEventListener('transitionend', handleTransitionEnd)

    tick()

    return () => {
      container.removeEventListener('transitionend', handleTransitionEnd)
    }
  }, [])

  return (
    <div
      ref={innerRef}
      {...otherProps}
    >
      {children}
    </div>
  )
}
