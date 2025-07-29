'use client'

import Image from 'next/image'
import { ComponentProps, ReactNode, useContext } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'
import { ContentfulContentRenderer } from '.'
import { ErrorBoundary } from '../ErrorBoundary'
import { Icon } from '../Icon'
import { ProseBox } from '../ProseBox'
import { HoverTools, HoverToolsProps } from './HoverTools'
import { MediaDescriptor, SpotCopyContext } from './SpotCopyProvider'

interface SpotCopyProps<JSONShape>
  extends Omit<HoverToolsProps, 'children' | 'contentfulURL'> {
  children?: (renderProps: RenderProps<JSONShape>) => ReactNode
  classNameForProseBox?: string
  classNameForImageContainer?: string
  classNameForImage?: string
  decorativeHeadings?: boolean
  headingLevel?: number
  headingsControlOrphans?: boolean
  paragraphsControlOrphans?: boolean
  path: string
  imageSizes?: string
  propsForProseContainer?: ComponentProps<typeof ProseBox>
}

interface MediaEntryWithNode extends MediaDescriptor {
  node: ReactNode
}

interface RenderProps<JSONShape> {
  body: ReactNode
  contentfulURL: string
  json: JSONShape
  media?: MediaEntryWithNode[]
}

export function SpotCopy<JSONShape>({
  children,
  classNameForProseBox,
  classNameForImageContainer,
  classNameForImage,
  decorativeHeadings = false,
  headingLevel = 1,
  headingsControlOrphans = true,
  imageSizes,
  propsForProseContainer,
  paragraphsControlOrphans = false,
  path,
  ...otherProps
}: SpotCopyProps<JSONShape>) {
  const { spotCopy } = useContext(SpotCopyContext)

  if (!(path in spotCopy)) {
    console.error('SpotCopy path not found:', path)

    return process.env.NODE_ENV === 'development' ? (
      <div
        className={twJoin(
          'relative z-50',
          'flex w-fit items-center justify-center gap-3',
          'text-red-500',
          'border-2 border-red-400',
          'rounded-md px-3 py-1',
        )}
      >
        <Icon name="solid:fire" />
        <span>
          SpotCopy path not found: <code>{path}</code>
        </span>
      </div>
    ) : null
  }

  const { content, contentfulURL, json, attachedMedia } = spotCopy[path]

  const media = attachedMedia.map(({ description, url, ...rest }) => ({
    description,
    node: (
      <div
        className={twMerge(
          `relative h-full w-full`,
          classNameForImageContainer,
        )}
        key={url}
      >
        <Image
          alt={description}
          className={twMerge(`object-contain`, classNameForImage)}
          fill={true}
          sizes={imageSizes}
          src={url}
        />
      </div>
    ),
    url,
    ...rest,
  })) as MediaEntryWithNode[]

  const renderProps = {
    contentfulURL,
    json: json as JSONShape,
    media,
    body: (
      <ProseBox
        className={twMerge(`prose-headings:mb-3`, classNameForProseBox)}
        {...propsForProseContainer}
      >
        <ContentfulContentRenderer
          {...{
            content,
            decorativeHeadings,
            headingLevel,
            headingsControlOrphans,
            paragraphsControlOrphans,
          }}
        />
      </ProseBox>
    ),
  }

  return (
    <ErrorBoundary>
      <HoverTools
        contentfulURL={contentfulURL}
        {...otherProps}
      >
        {typeof children === 'function'
          ? children(renderProps)
          : renderProps.body}
      </HoverTools>
    </ErrorBoundary>
  )
}
