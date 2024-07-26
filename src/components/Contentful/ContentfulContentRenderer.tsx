'use client'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { Document } from '@contentful/rich-text-types'
import { renderConfig } from './renderConfig'

interface ContentfulContentProps {
  content: Document
  decorativeHeadings?: boolean
  headingLevel?: number
  headingsControlOrphans?: boolean
  paragraphsControlOrphans?: boolean
}

export function ContentfulContentRenderer({
  content,
  decorativeHeadings = false,
  headingLevel = 1,
  headingsControlOrphans = true,
  paragraphsControlOrphans = false,
}: ContentfulContentProps) {
  return documentToReactComponents(
    content,
    renderConfig({
      decorativeHeadings,
      headingLevel,
      headingsControlOrphans,
      paragraphsControlOrphans,
    }),
  )
}
