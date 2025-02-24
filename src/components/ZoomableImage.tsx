'use client'

import { ModalWindow } from '@/components'
import { Icon } from '@/components/Icon'
import Image from 'next/image'
import { ComponentProps, HTMLAttributes, ReactNode, useState } from 'react'

interface ZoomableImageProps extends HTMLAttributes<HTMLElement> {
  height: number
  alt: string
  url: string
  width: number
}

export function ZoomableImage({
  height,
  alt,
  url,
  width,
  ...otherProps
}: ZoomableImageProps) {
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

        <CloseButton>
          <Icon name="magnifying-glass-plus" />
        </CloseButton>
      </figure>

      <ModalWindow
        className="
          group
          h-[90vh]
          w-[90vw]
          cursor-pointer
          border-4
          border-white
          bg-white
        "
        isOpen={isZoomed}
        propsForBackdrop={{
          className: `
            bg-brand-500/50
          `,
        }}
        onClick={() => setIsZoomed(false)}
        onClose={() => setIsZoomed(false)}
      >
        <CloseButton>
          <Icon name="xmark" />
        </CloseButton>

        <div
          className="
            absolute
            inset-0
          "
        >
          <Image
            alt={alt}
            className="object-contain"
            fill={true}
            src={`https:${url}`}
            sizes="100vw"
          />
        </div>
      </ModalWindow>
    </>
  )
}

function CloseButton({
  children,
}: ComponentProps<'div'> & { children: ReactNode }) {
  return (
    <div
      className="
        absolute
        right-0
        top-0
        z-10
        flex
        size-16
        cursor-pointer
        justify-end
        bg-linear-to-bl
        from-transparent
        via-transparent
        to-transparent
        pr-1
        pt-1
        text-xs
        text-white
        opacity-0
        transition-all
        group-hover:from-brand-500
        group-hover:via-transparent
        group-hover:to-transparent
        group-hover:opacity-100
        hover:group-hover:size-24
        hover:group-hover:pr-2
        hover:group-hover:pt-2
        hover:group-hover:text-lg
      "
    >
      {children}
    </div>
  )
}
