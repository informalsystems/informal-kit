'use client'

import { useEffect, useRef, useState } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'
import type { BlogPost } from '../lib/types'
import { BlogPostHero } from './BlogPostHero'
interface BlogPostCarouselProps {
  posts: BlogPost[]
}

export const BlogPostCarousel = ({ posts }: BlogPostCarouselProps) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const [containerHeight, setContainerHeight] = useState(0)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const updateHeight = () => {
      const element = document.querySelector(
        '.js-post-feature-image',
      ) as HTMLElement
      if (element) {
        setContainerHeight(element.offsetTop + element.offsetHeight)
      }
    }

    updateHeight()
    const interval = setInterval(updateHeight, 500)
    return () => clearInterval(interval)
  }, [])

  useEffect(() => {
    if (!containerRef.current) return

    const handleScroll = () => {
      const container = containerRef.current
      if (!container) return

      const containerRect = container.getBoundingClientRect()
      const containerCenter = containerRect.left + containerRect.width / 2

      let bestIndex = 0
      let bestVisibility = 0

      posts.forEach((post, index) => {
        const isExternalPost = 'link' in post && post.link
        const id = isExternalPost ? `external-${index}` : post.slug
        const element = container.querySelector(`#${id}`)

        if (element) {
          const elementRect = element.getBoundingClientRect()
          const elementCenter = elementRect.left + elementRect.width / 2
          const distance = Math.abs(containerCenter - elementCenter)
          const visibility = Math.max(
            0,
            1 - distance / (containerRect.width / 2),
          )

          if (visibility > bestVisibility) {
            bestVisibility = visibility
            bestIndex = index
          }
        }
      })

      setActiveIndex(bestIndex)
    }

    containerRef.current.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => {
      containerRef.current?.removeEventListener('scroll', handleScroll)
    }
  }, [posts])

  return (
    <div className="relative">
      <div
        ref={containerRef}
        className={twJoin(
          'flex w-full overflow-x-auto overflow-y-hidden',
          'bg-theme-brand-color/10',
          'snap-x snap-mandatory scroll-smooth',
        )}
        tabIndex={0}
        aria-label="Featured blog posts carousel"
        role="region"
      >
        {posts.map((post, index) => {
          const isExternalPost = 'link' in post && post.link
          const id = isExternalPost ? `external-${index}` : post.slug

          return (
            <div
              key={`${id}-${index}`}
              id={id}
              className={twJoin(
                'h-full w-full shrink-0 grow-0',
                'transition-all ease-in-out',
                'snap-start',
              )}
              tabIndex={-1}
              aria-label={`Featured post ${index + 1}`}
              role="group"
            >
              <BlogPostHero post={post} />
            </div>
          )
        })}
      </div>

      <div
        className={twJoin(
          'static',
          'transition-opacity',
          'bg-theme-brand-color/10',
          'lg:absolute',
          'lg:bg-transparent',
          'lg:inset-x-0',
          'lg:translate-y-6',
        )}
        style={{
          top: `${containerHeight}px`,
          opacity: containerHeight > 0 ? 1 : 0,
        }}
      >
        <section
          className={twJoin(
            'site-content-container',
            'h-12',
            'flex items-center justify-center',
            'relative',
            'gap-2',
            'py-0',
            'lg:justify-end',
          )}
        >
          {posts.map((post, index) => {
            const isExternalPost = 'link' in post && post.link
            const id = isExternalPost ? `external-${index}` : post.slug

            return (
              <a
                href={`#${id}`}
                className={twMerge(
                  'size-3 overflow-hidden rounded-full',
                  'border-theme-brand-color border-2',
                  'transition-all',
                  index === activeIndex
                    ? 'bg-theme-brand-color'
                    : 'bg-transparent',
                )}
                key={`${id}-${index}`}
                tabIndex={0}
                aria-label={`Go to post ${index + 1}: ${post.title}`}
              >
                <span className="sr-only">{index + 1}</span>
              </a>
            )
          })}
        </section>
      </div>
    </div>
  )
}
