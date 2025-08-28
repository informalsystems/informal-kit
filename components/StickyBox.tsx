'use client'

import { useEffect, useRef, useState } from 'react'
import Sticky from 'react-stickynode'

interface StickyBoxProps {
  children: React.ReactNode
  top?: string
  enabled?: boolean
  innerZ?: number
  className?: string
  bottomBoundary?: string | number
}

export function StickyBox({
  children,
  top = '.site-header',
  enabled = true,
  innerZ = 30,
  className,
  bottomBoundary,
}: StickyBoxProps) {
  const [dynamicTop, setDynamicTop] = useState<string>(top)
  const stickyRef = useRef<Sticky>(null)
  const resizeObserverRef = useRef<ResizeObserver | null>(null)

  useEffect(() => {
    if (top.startsWith('.')) {
      const headerElement = document.querySelector(top)
      if (!headerElement) return

      const updateTop = () => {
        const rect = headerElement.getBoundingClientRect()
        const height = rect.height
        setDynamicTop(`${height}px`)
      }

      updateTop()

      resizeObserverRef.current = new ResizeObserver(updateTop)
      resizeObserverRef.current.observe(headerElement)

      return () => {
        resizeObserverRef.current?.disconnect()
      }
    }
  }, [top])

  return (
    <Sticky
      ref={stickyRef}
      activeClass="is-stuck"
      innerZ={innerZ}
      top={dynamicTop}
      enabled={enabled}
      bottomBoundary={bottomBoundary}
      className={className}
    >
      {children}
    </Sticky>
  )
}
