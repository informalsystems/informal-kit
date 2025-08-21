'use client'

import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ReactNode, useRef } from 'react'
import { twMerge } from 'tailwind-merge'

gsap.registerPlugin(ScrollTrigger)

interface ParallaxProps {
  triggerElementRef?: React.RefObject<HTMLElement | null>
  children: ReactNode
  className?: string
}

export function Parallax({
  triggerElementRef,
  children,
  className,
}: ParallaxProps) {
  const parallaxContainerRef = useRef<HTMLDivElement | null>(null)

  useGSAP(
    () => {
      const parallaxContainer = parallaxContainerRef.current
      if (!parallaxContainer) return

      const childElement = parallaxContainer.firstElementChild as HTMLElement
      if (!childElement) return

      const triggerElement =
        triggerElementRef?.current || document.documentElement

      ScrollTrigger.create({
        trigger: triggerElement,
        start: 'top top',
        end: 'bottom bottom',
        scrub: true,
        onRefresh: () => {
          gsap.set(childElement, {
            position: 'relative',
            top: '0px',
          })
        },
        onUpdate: self => {
          const progress = self.progress
          const viewportHeight = window.innerHeight
          const childHeight = childElement.offsetHeight
          const maxOffset = viewportHeight - childHeight
          const top = maxOffset * progress
          gsap.set(childElement, { top: `${top}px` })
        },
      })

      // Ensure the child element is positioned so top property works
      gsap.set(childElement, {
        position: 'relative',
        top: '0px',
      })
    },
    { scope: parallaxContainerRef, dependencies: [triggerElementRef] },
  )

  return (
    <div
      ref={parallaxContainerRef}
      className={twMerge(
        'pointer-events-none',
        'fixed',
        'inset-0',
        'z-0',
        'overflow-hidden',
        className,
      )}
    >
      {children}
    </div>
  )
}
