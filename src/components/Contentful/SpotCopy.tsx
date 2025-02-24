'use client'

import { ProseBox } from '@/components'
import { ErrorBoundary } from '@/components/ErrorBoundary'
import { MediaDescriptor, SiteContext } from '@/components/SiteContextProvider'
import Image from 'next/image'
import { ReactNode, useContext } from 'react'
import { twMerge } from 'tailwind-merge'
import invariant from 'tiny-invariant'
import { ContentfulContentRenderer } from '.'
import { HoverTools, HoverToolsProps } from './HoverTools'

interface SpotCopyProps<JSONShape>
  extends Omit<HoverToolsProps, 'children' | 'contentfulURL'> {
  children?: (renderProps: RenderProps<JSONShape>) => ReactNode
  classNamesForProseContainer?: string
  classNameForImageContainer?: string
  classNameForImage?: string
  decorativeHeadings?: boolean
  headingLevel?: number
  headingsControlOrphans?: boolean
  paragraphsControlOrphans?: boolean
  path: string
  imageSizes?: string
}

interface MediaEntryWithNode extends MediaDescriptor {
  node: ReactNode
}

interface RenderProps<JSONShape extends unknown> {
  body: ReactNode
  contentfulURL: string
  json: JSONShape
  media?: MediaEntryWithNode[]
}

export function SpotCopy<JSONShape extends unknown>({
  children,
  classNamesForProseContainer,
  classNameForImageContainer,
  classNameForImage,
  decorativeHeadings = false,
  headingLevel = 1,
  headingsControlOrphans = true,
  imageSizes,
  paragraphsControlOrphans = false,
  path,
  ...otherProps
}: SpotCopyProps<JSONShape>) {
  const { editableContent } = useContext(SiteContext)

  invariant(
    path in editableContent,
    `editableContent not found at path ${path}`,
  )

  const { content, contentfulURL, json, attachedMedia } = editableContent[path]

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
    json,
    media,
    body: (
      <ProseBox
        className={twMerge(`prose-headings:mb-3`, classNamesForProseContainer)}
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
