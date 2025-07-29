'use client'

import { Document } from '@contentful/rich-text-types'
import { ReactNode, createContext } from 'react'

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
    json?: unknown
    contentfulURL: string
  }
}

export interface SpotCopyContextObject {
  spotCopy: SpotCopy
}

export const SpotCopyContext = createContext<SpotCopyContextObject>({
  spotCopy: {},
})

export function SpotCopyProvider({
  children,
  spotCopy,
}: {
  children: ReactNode
  spotCopy: SpotCopy
}) {
  return (
    <SpotCopyContext.Provider value={{ spotCopy }}>
      {children}
    </SpotCopyContext.Provider>
  )
}
