'use client'

import { Contentful, SiteContentContainer } from '@/components'

export default function Home() {
  return (
    <>
      <SiteContentContainer className="py-40">
        <Contentful.SpotCopy.Body path="informal/homepage/hero" />
      </SiteContentContainer>

      <SiteContentContainer>Woo</SiteContentContainer>
    </>
  )
}
