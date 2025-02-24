'use client'

import { Contentful, SiteContentContainer } from '@/components'

export default function Home() {
  return (
    <SiteContentContainer>
      <h1>Editable Content Demo</h1>
      <Contentful.EditableContent.Body path="editable-content-demo" />
    </SiteContentContainer>
  )
}
