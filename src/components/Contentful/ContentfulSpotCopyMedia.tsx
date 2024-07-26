'use client'

import { MediaDescriptor, SiteContext } from '@/components/SiteContextProvider'
import Image from 'next/image'
import { ComponentProps, ReactNode, useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import invariant from 'tiny-invariant'
import { Contentful } from '.'

interface EditableMediaProps extends Omit<ComponentProps<'div'>, 'children'> {
  children?: ({ media }: { media: MediaEntryWithNode[] }) => ReactNode
  classNameForImage?: string
  disableEditing?: boolean
  path: string
}

interface MediaEntryWithNode extends MediaDescriptor {
  node: ReactNode
}

export function ContentfulSpotCopyMedia({
  children,
  className,
  classNameForImage,
  disableEditing,
  path,
  ...otherProps
}: EditableMediaProps) {
  const { spotCopy } = useContext(SiteContext)

  invariant(path in spotCopy, `SpotCopy not found: ${path}`)

  const { attachedMedia, contentfulURL } = spotCopy[path]

  const media = attachedMedia.map(({ url, ...rest }) => ({
    node: (
      <div
        className={twMerge(
          `
            relative
            h-full
            w-full
          `,
          className,
        )}
        key={url}
        {...otherProps}
      >
        <Image
          alt="Image from Contentful"
          className={twMerge(`object-contain`, classNameForImage)}
          fill={true}
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
      className="h-full"
      contentfulURL={contentfulURL}
      disableEditing={disableEditing}
    >
      {typeof children === 'function'
        ? children({ media })
        : media.map((image) => image.node)}
    </Contentful.Hotspot>
  )
}
