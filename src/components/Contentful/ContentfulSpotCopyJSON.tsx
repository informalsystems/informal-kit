'use client'

import { SiteContext } from '@/components/SiteContextProvider'
import { ComponentProps, ReactNode, useContext } from 'react'
import invariant from 'tiny-invariant'
import { Contentful } from '.'

interface EditableJSONProps<T extends Object>
  extends Omit<ComponentProps<'div'>, 'children'> {
  children?: ({ json }: { json: T }) => ReactNode
  disableEditing?: boolean
  path: string
}

export function ContentfulSpotCopyJSON<T extends Object>({
  children,
  disableEditing,
  path,
  ...otherProps
}: EditableJSONProps<T>) {
  const { spotCopy } = useContext(SiteContext)

  invariant(path in spotCopy, `SpotCopy not found: ${path}`)

  const { contentfulURL, json } = spotCopy[path]

  return (
    <Contentful.Hotspot
      contentfulURL={contentfulURL}
      disableEditing={disableEditing}
      {...otherProps}
    >
      {children?.({ json })}
    </Contentful.Hotspot>
  )
}
