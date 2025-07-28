'use client'

import { ContentfulSpotCopy } from '../components/Contentful'
import { GlobalTools } from '../components/Contentful/GlobalTools'
import { PopupMenu } from '../components/PopupMenu'
import { SiteContentContainer } from '../components/SiteContentContainer'
import { Tooltipped } from '../components/Tooltipped'

export default function Home() {
  return (
    <SiteContentContainer>
      <label className="label">Editable Content Demo</label>
      <ContentfulSpotCopy path="editable-content-demo" />

      <PopupMenu
        trigger={
          <Tooltipped tip="With a tooltip">
            <button className="button-primary">Menu Example</button>
          </Tooltipped>
        }
      >
        <button className="button-primary">Menu Item 1</button>
        <button className="button-primary">Menu Item 2</button>
        <button className="button-primary">Menu Item 3</button>
      </PopupMenu>

      <GlobalTools />
    </SiteContentContainer>
  )
}
