'use client'

import { MediaDescriptor, SiteContext } from '@/components/SiteContextProvider'
import Image from 'next/image'
import { ComponentProps, ReactNode, useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import invariant from 'tiny-invariant'
import { Contentful } from '.'

interface EditableMediaProps extends Omit<ComponentProps<'div'>, 'children'> {
  children?: ({ media }: { media: MediaEntryWithNode[] }) => ReactNode
  classNameForImageContainer?: string
  classNameForImage?: string
  disableEditing?: boolean
  path: string
  sizes?: string
}

export interface MediaEntryWithNode extends MediaDescriptor {
  node: ReactNode
}

export function ContentfulSpotCopyMedia({
  children,
  className,
  classNameForImageContainer,
  classNameForImage,
  disableEditing,
  path,
  sizes,
  ...otherProps
}: EditableMediaProps) {
  const { spotCopy } = useContext(SiteContext)

  invariant(path in spotCopy, `SpotCopy not found: ${path}`)

  const { attachedMedia, contentfulURL } = spotCopy[path]

  const media = attachedMedia.map(({ description, url, ...rest }) => ({
    description,
    node: (
      <div
        className={twMerge(
          `
            relative
            h-full
            w-full
          `,
          classNameForImageContainer,
        )}
        key={url}
      >
        <Image
          alt={description}
          className={twMerge(
            `
              object-contain
            `,
            classNameForImage,
          )}
          fill={true}
          sizes={sizes}
          src={url}
        />
      </div>
    ),
    url,
    ...rest,
  })) as MediaEntryWithNode[]

  return (
    <Contentful.Hotspot
      buttonPosition="center"
      className={twMerge(
        `
          h-full
        `,
        className,
      )}
      contentfulURL={contentfulURL}
      disableEditing={disableEditing}
      {...otherProps}
    >
      {typeof children === 'function'
        ? children({ media })
        : media.map(image => image.node)}
    </Contentful.Hotspot>
  )
}
