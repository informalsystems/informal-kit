'use client'

import { Document } from '@contentful/rich-text-types'
import { ReactNode, createContext } from 'react'

export interface SiteContextObject {
  spotCopy: SpotCopy
}

export interface MediaDescriptor {
  description: string
  height: number
  title: string
  url: string
  width: number
}

export interface SpotCopy {
  [codeName: string]: {
    attachedMedia: MediaDescriptor[]
    content?: Document
    json?: any
    contentfulURL: string
  }
}

export const SiteContext = createContext<SiteContextObject>({
  spotCopy: {},
})

export function SiteContextProvider({
  children,
  spotCopy,
}: {
  children: ReactNode
  spotCopy: SpotCopy
}) {
  return (
    <SiteContext.Provider value={{ spotCopy }}>{children}</SiteContext.Provider>
  )
}
