'use client'

import { AnimatedOverlay, Contentful, Icon, ProseBox } from '@/components'
import { MediaEntryWithNode } from '@/components/Contentful/ContentfulSpotCopyMedia'
import { SiteContext } from '@/components/SiteContextProvider'
import { useAdvancedHover } from '@/lib/useAdvancedHover'
import Image from 'next/image'
import { ReactNode, useContext, useRef } from 'react'
import { twMerge } from 'tailwind-merge'
import invariant from 'tiny-invariant'
import { classNames } from './classNames'

interface ContentfulAreaProps<JSONShape> {
  buttonPosition?: 'top right' | 'center'
  children?: (renderProps: RenderProps<JSONShape>) => ReactNode | ReactNode
  classNamesForProseContainer?: string
  classNameForImageContainer?: string
  classNameForImage?: string
  decorativeHeadings?: boolean
  disableEditing?: boolean
  headingLevel?: number
  headingsControlOrphans?: boolean
  paragraphsControlOrphans?: boolean
  path: string
  sizes?: string
}

interface RenderProps<JSONShape extends unknown> {
  body: ReactNode
  contentfulURL: string
  json: JSONShape
  media?: MediaEntryWithNode[]
}

export function ContentfulArea<JSONShape extends unknown>({
  buttonPosition = 'top right',
  children,
  classNamesForProseContainer,
  classNameForImageContainer,
  classNameForImage,
  decorativeHeadings = false,
  disableEditing = false,
  headingLevel = 1,
  headingsControlOrphans = true,
  paragraphsControlOrphans = false,
  path,
  sizes,
}: ContentfulAreaProps<JSONShape>) {
  const { spotCopy } = useContext(SiteContext)
  const containerElementRef = useRef<HTMLDivElement>(null)

  const isHovering =
    useAdvancedHover({
      hoverDelay: 1000,
      unHoverDelay: 500,
      margin: 20,
      targetElementRef: containerElementRef,
    }) && !disableEditing

  invariant(path in spotCopy, `SpotCopy not found: ${path}`)

  function handleClickToEdit() {
    window.open(contentfulURL, '_blank')
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
          sizes={sizes}
          src={url}
        />
      </div>
    ),
    url,
    ...rest,
  })) as MediaEntryWithNode[]

  return (
    <div className="relative">
      {disableEditing !== true &&
        process.env.NEXT_PUBLIC_SHOW_CONTENTFUL_HOTSPOTS?.toLowerCase() ===
          'true' && (
          <AnimatedOverlay
            className={classNames.tracerAndButtonContainer({ isHovering })}
            classNamesForPath={classNames.path({ isHovering })}
            isTracing={isHovering}
            strokeWidth={2}
            targetElementRef={containerElementRef}
          >
            <button
              className={classNames.editButton({
                buttonPosition,
                isHovering,
              })}
              onClick={handleClickToEdit}
            >
              <span>Edit in Contentful</span>
              <Icon name="arrow-up-right-from-square" />
            </button>
          </AnimatedOverlay>
        )}
      {typeof children === 'function'
        ? children({
            contentfulURL,
            json,
            media,
            body: (
              <ProseBox
                className={twMerge(
                  `prose-headings:mb-3`,
                  classNamesForProseContainer,
                )}
              >
                <Contentful.ContentRenderer
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
          })
        : children}
    </div>
  )
}
