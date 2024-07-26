'use client'

import { Contentful, ProseBox } from '@/components'
import { SiteContext } from '@/components/SiteContextProvider'
import { ComponentProps, useContext, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import invariant from 'tiny-invariant'

interface EditableBodyProps extends Omit<ComponentProps<'div'>, 'children'> {
  decorativeHeadings?: boolean
  disableEditing?: boolean
  headingLevel?: number
  headingsControlOrphans?: boolean
  paragraphsControlOrphans?: boolean
  path: string
}

export function ContentfulSpotCopyBody({
  className,
  decorativeHeadings = false,
  disableEditing,
  headingLevel = 1,
  headingsControlOrphans = true,
  paragraphsControlOrphans = false,
  path,
  ...otherProps
}: EditableBodyProps) {
  const [isClient, setIsClient] = useState(false)

  const { spotCopy } = useContext(SiteContext)

  useEffect(() => {
    setIsClient(true)
  }, [])

  invariant(path in spotCopy, `SpotCopy not found: ${path}`)

  const { content, contentfulURL } = spotCopy[path]

  return !(isClient && content) ? null : (
    <Contentful.Hotspot
      disableEditing={disableEditing}
      contentfulURL={contentfulURL}
      {...otherProps}
    >
      <ProseBox
        className={twMerge(
          `
            [&_:is(h1,h2,h3,h4)]:mb-2.5
          `,
          className,
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
    </Contentful.Hotspot>
  )
}
