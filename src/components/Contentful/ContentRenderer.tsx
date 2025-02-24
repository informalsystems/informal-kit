'use client'

import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import { BLOCKS, Document, INLINES, MARKS } from '@contentful/rich-text-types'
import { BoldText } from './renderers/BoldText'
import { CodeText } from './renderers/CodeText'
import { EmbeddedAsset } from './renderers/EmbeddedAsset'
import { EmbeddedEntry } from './renderers/EmbeddedEntry'
import { Heading } from './renderers/Heading'
import { Hyperlink } from './renderers/Hyperlink'
import { ItalicText } from './renderers/ItalicText'
import { Paragraph } from './renderers/Paragraph'
import { Quote } from './renderers/Quote'

interface ContentRendererProps {
  content?: Document
  decorativeHeadings?: boolean
  headingLevel?: number
  headingsControlOrphans?: boolean
  paragraphsControlOrphans?: boolean
}

export function ContentRenderer({
  content,
  decorativeHeadings = false,
  headingLevel = 1,
  headingsControlOrphans = true,
  paragraphsControlOrphans = false,
}: ContentRendererProps) {
  if (!content) return null

  function getHeadingProps(originalLevel: number) {
    return {
      controlOrphans: headingsControlOrphans,
      decorated: decorativeHeadings,
      headingLevel: headingLevel + (originalLevel - 1),
      originalLevel,
    }
  }

  return documentToReactComponents(content, {
    renderMark: {
      [MARKS.BOLD]: text => <BoldText text={text} />,
      [MARKS.CODE]: text => {
        return <CodeText text={text} />
      },
      [MARKS.ITALIC]: text => <ItalicText text={text} />,
    },
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: node => {
        return <EmbeddedAsset node={node} />
      },

      [BLOCKS.EMBEDDED_ENTRY]: node => {
        return <EmbeddedEntry node={node} />
      },
      [BLOCKS.HEADING_1]: (node, children) => (
        <Heading
          {...getHeadingProps(1)}
          children={children}
        />
      ),
      [BLOCKS.HEADING_2]: (node, children) => (
        <Heading
          {...getHeadingProps(2)}
          children={children}
        />
      ),
      [BLOCKS.HEADING_3]: (node, children) => (
        <Heading
          {...getHeadingProps(3)}
          children={children}
        />
      ),
      [BLOCKS.HEADING_4]: (node, children) => (
        <Heading
          {...getHeadingProps(4)}
          children={children}
        />
      ),
      [BLOCKS.HEADING_5]: (node, children) => (
        <Heading
          {...getHeadingProps(5)}
          children={children}
        />
      ),
      [BLOCKS.PARAGRAPH]: (_, children) => (
        <Paragraph
          children={children}
          paragraphsControlOrphans={paragraphsControlOrphans}
        />
      ),
      [BLOCKS.QUOTE]: (node, children) => {
        return (
          <Quote
            node={node}
            children={children}
          />
        )
      },
      [INLINES.HYPERLINK]: (node, children) => (
        <Hyperlink
          node={node}
          children={children}
        />
      ),
    },
  })
}
