'use client'

import Image from 'next/image'
import { ComponentProps, HTMLAttributes, ReactNode, useState } from 'react'
import { twJoin } from 'tailwind-merge'
import { Icon } from './Icon'
import { ModalWindow } from './ModalWindow'

interface ZoomableImageProps extends HTMLAttributes<HTMLElement> {
  alt: string
  caption?: ReactNode
  url: string
  width: number
  height: number
}

export function ZoomableImage({
  alt,
  caption,
  url,
  width,
  height,
  ...otherProps
}: ZoomableImageProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  const resolvedUrl = url.startsWith('https:') ? url : `https:${url}`
  const aspectRatio = width / height
  const isPortrait = aspectRatio < 1

  return (
    <>
      <figure
        className="group relative break-inside-avoid"
        onClick={() => setIsZoomed(true)}
        {...otherProps}
      >
        <HiddenCornerButton>
          <Icon name="solid:up-right-and-down-left-from-center" />
        </HiddenCornerButton>

        <div
          className={twJoin(
            'relative w-full',
            'p-3',
            'flex items-center justify-center',
            'rounded-xl',
            'bg-white',
            'overflow-hidden',
            'cursor-pointer',
            'transition-all',
            'duration-500',
          )}
        >
          <Image
            alt={alt}
            className="m-0! h-auto w-full"
            height={0}
            sizes="(max-width: 768px) 100vw, 70vw"
            src={resolvedUrl}
            width={0}
          />
        </div>

        {caption && (
          <figcaption
            className={twJoin(
              'mt-1 flex items-start gap-1',
              'text-accent-teal text-xs italic',
            )}
          >
            <Icon
              name="solid:triangle"
              className="scale-50"
            />
            <span>{caption}</span>
          </figcaption>
        )}
      </figure>

      <ModalWindow
        className={twJoin(
          'group',
          'flex flex-col p-6',
          'cursor-pointer',
          'overflow-visible',
          'rounded bg-white shadow-2xl',
        )}
        isOpen={isZoomed}
        propsForBackdrop={{
          className: `
            bg-theme-brand-color/10
          `,
        }}
        style={{
          aspectRatio,
          height: isPortrait ? '90vh' : 'auto',
          width: isPortrait ? 'auto' : '90vw',
        }}
        onClick={() => setIsZoomed(false)}
        onClose={() => setIsZoomed(false)}
      >
        <HiddenCornerButton>
          <Icon name="solid:down-left-and-up-right-to-center" />
        </HiddenCornerButton>

        <div
          className={twJoin(
            'relative',
            'h-full',
            'w-full',
            'overflow-hidden',
            caption ? 'rounded-t' : 'rounded',
          )}
        >
          <Image
            alt={alt}
            className="object-cover"
            fill={true}
            src={resolvedUrl}
            sizes="100vw"
          />
        </div>

        {caption && (
          <div
            className={twJoin(
              'px-3 py-2',
              'text-xs font-bold',
              'bg-theme-bg-color-shaded',
              'rounded-b',
            )}
          >
            {caption}
          </div>
        )}
      </ModalWindow>
    </>
  )
}

function HiddenCornerButton({
  children,
}: ComponentProps<'div'> & { children: ReactNode }) {
  return (
    <div
      className={twJoin(
        'absolute z-10 size-8',
        'top-0 right-0',
        'translate-x-1/2 -translate-y-1/2',
        'flex items-center justify-center',
        'border-theme-brand-color',
        'text-theme-brand-color',
        'rounded-full border-2',
        'bg-theme-bg-color',
        'text-xs',
        'cursor-pointer opacity-0 transition-all',
        'group-hover:opacity-100',
        'group-hover:hover:scale-105',
      )}
    >
      {children}
    </div>
  )
}
