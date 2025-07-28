'use client'

import { Atom, ContentfulSpotCopy, SiteContentContainer } from '../components'
import { MenuButton } from '../components/MenuButton'

export default function Home() {
  return (
    <SiteContentContainer>
      <Atom variant="label">Editable Content Demo</Atom>
      <ContentfulSpotCopy path="editable-content-demo" />

      <MenuButton
        items={[
          {
            icon: 'arrow-right-long',
            label: 'Editable Content Demo',
            onClick: () => {
              console.log('Editable Content Demo')
            },
          },
        ]}
      >
        <Atom
          variant="button.primary"
          tooltip="Optional tooltip prop"
        >
          Editable Content Demo
        </Atom>
      </MenuButton>
    </SiteContentContainer>
  )
}
