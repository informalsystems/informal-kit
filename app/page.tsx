'use client'

import { ContentfulSpotCopy } from '../components/Contentful'
import { GlobalTools } from '../components/Contentful/GlobalTools'
import { PopupMenu } from '../components/PopupMenu'
import { SiteContentContainer } from '../components/SiteContentContainer'
import { Tooltipped } from '../components/Tooltipped'

export default function Home() {
  return (
    <SiteContentContainer>
      <ul className="flex flex-col gap-6">
        <li className="flex flex-col gap-3">
          <p>Install:</p>
          <pre>npm install github:aaronmw/informal-kit</pre>
        </li>

        <li className="flex flex-col gap-3">
          <p>
            Add to <code>next.config.mjs</code>:
          </p>
          <pre>{[`"transpilePackages": ['informal-kit']`].join('\n')}</pre>
        </li>

        <li className="flex flex-col gap-3">
          <p>
            Add to <code>tsconfig.json</code>:
          </p>
          <pre>
            {[
              `"compilerOptions": {`,
              `  "paths": {`,
              `    "informal-kit/*": ["./node_modules/informal-kit/*"]`,
              `  }`,
              `}`,
            ].join('\n')}
          </pre>
        </li>
      </ul>

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
