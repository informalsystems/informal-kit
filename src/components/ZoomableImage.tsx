'use client'

import { ModalWindow } from '@/components'
import { Icon } from '@/components/Icon'
import Image from 'next/image'
import { forwardRef, HTMLAttributes, useState } from 'react'

interface ZoomableImageProps extends HTMLAttributes<HTMLElement> {
  height: number
  alt: string
  url: string
  width: number
}

const ZoomableImage = forwardRef<HTMLElement, ZoomableImageProps>(
  ({ height, alt, url, width, ...otherProps }, ref) => {
    const [isZoomed, setIsZoomed] = useState(false)

    return (
      <>
        <figure
          className="
            group
            relative
            flex
            cursor-pointer
            items-center
            justify-center
            overflow-hidden
            rounded-2xl
            border
            bg-transparent
            transition-all
            duration-500
          "
          ref={ref}
          onClick={() => setIsZoomed(true)}
          {...otherProps}
        >
          <Image
            alt={alt}
            className="h-auto w-auto"
            height={0}
            sizes="(max-width: 768px) 100vw, 70vw"
            src={`https:${url}`}
            width={0}
          />

          <div
            className="
              absolute
              right-3
              top-3
              opacity-0
              transition-opacity
              group-hover:opacity-100
            "
          >
            <Icon name="magnifying-glass-plus" />
          </div>
        </figure>

        <ModalWindow
          className="h-screen w-screen"
          isOpen={isZoomed}
          onClose={() => setIsZoomed(false)}
        >
          <div className="relative h-full w-full">
            <Image
              alt={alt}
              fill={true}
              src={`https:${url}`}
              sizes="100vw"
              style={{ objectFit: 'contain' }}
            />
          </div>
        </ModalWindow>
      </>
    )
  },
)

ZoomableImage.displayName = 'ZoomableImage'

export { ZoomableImage }
