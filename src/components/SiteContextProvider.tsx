'use client'

import { Document } from '@contentful/rich-text-types'
import { ReactNode, createContext } from 'react'

export interface SiteContextObject {
  editableContent: EditableContent
}

export interface MediaDescriptor {
  description: string
  height: number
  title: string
  url: string
  width: number
}

export interface EditableContent {
  [path: string]: {
    attachedMedia: MediaDescriptor[]
    content?: Document
    json?: any
    contentfulURL: string
  }
}

export const SiteContext = createContext<SiteContextObject>({
  editableContent: {},
})

export function SiteContextProvider({
  children,
  editableContent,
}: {
  children: ReactNode
  editableContent: EditableContent
}) {
  return (
    <SiteContext.Provider value={{ editableContent }}>
      {children}
    </SiteContext.Provider>
  )
}
