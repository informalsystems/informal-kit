'use client'

import { Document } from '@contentful/rich-text-types'
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react'

export interface SiteContextObject {
  isShowingContactModal: boolean
  setIsShowingContactModal: Dispatch<SetStateAction<boolean>>
  isShowingNewsletterModal: boolean
  setIsShowingNewsletterModal: Dispatch<SetStateAction<boolean>>
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
    json?: unknown
    contentfulURL: string
  }
}

const initialSiteContext = {
  isShowingContactModal: false,
  spotCopy: {},
  setIsShowingContactModal: () => false,
  isShowingNewsletterModal: false,
  setIsShowingNewsletterModal: () => false,
}

export const SiteContext = createContext<SiteContextObject>(initialSiteContext)

export function useSiteContext() {
  return useContext(SiteContext)
}

export function SiteContextProvider({
  children,
  ...rest
}: Partial<SiteContextObject> & { children: ReactNode }) {
  const [isShowingContactModal, setIsShowingContactModal] = useState(false)
  const [isShowingNewsletterModal, setIsShowingNewsletterModal] =
    useState(false)
  return (
    <SiteContext
      value={{
        ...initialSiteContext,
        isShowingContactModal,
        setIsShowingContactModal,
        isShowingNewsletterModal,
        setIsShowingNewsletterModal,
        ...rest,
      }}
    >
      {children}
    </SiteContext>
  )
}
