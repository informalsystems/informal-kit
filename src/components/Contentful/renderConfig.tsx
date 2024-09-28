import { CodeSnippet } from '@/components/CodeSnippet'
import { ConditionalWrapper } from '@/components/ConditionalWrapper'
import { Contentful } from '@/components/Contentful'
import { FileDownloadButton } from '@/components/FileDownloadButton'
import { Icon } from '@/components/Icon'
import { OrphanController } from '@/components/OrphanController'
import { StyledText } from '@/components/StyledText'
import { ZoomableImage } from '@/components/ZoomableImage'
import { isExternalHref } from '@/lib/isExternalHref'
import { Options } from '@contentful/rich-text-react-renderer'
import { BLOCKS, INLINES, MARKS } from '@contentful/rich-text-types'
import Link from 'next/link'
import { Children, MouseEvent } from 'react'
import { twMerge } from 'tailwind-merge'

export const renderConfig: (context: {
  decorativeHeadings?: boolean
  headingLevel?: number
  headingsControlOrphans?: boolean
  paragraphsControlOrphans?: boolean
}) => Options = ({
  decorativeHeadings = false,
  headingLevel = 1,
  headingsControlOrphans = true,
  paragraphsControlOrphans = false,
}) => ({
  renderMark: {
    [MARKS.BOLD]: text => <strong>{text}</strong>,
    [MARKS.CODE]: text => {
      const isMultiLine = String(text).includes('\n')

      return (
        <code
          className={twMerge(
            `
              whitespace-pre-wrap
              font-mono
              text-sm
              text-orange-600
            `,
            isMultiLine &&
              `
                block
                overflow-x-auto
                rounded-md
                bg-orange-400/10
                p-3
              `,
          )}
        >
          {String(text ?? '').trim()}
        </code>
      )
    },
    [MARKS.ITALIC]: text => <em>{text}</em>,
  },
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: node => {
      const fileInfo = node.data.target.fields.file
      const {
        contentType,
        details: {
          image: { height, width },
        },
        fileName,
        url,
      } = fileInfo

      if (contentType.startsWith('image')) {
        return (
          <ZoomableImage
            height={height}
            alt={fileName}
            url={url}
            width={width}
          />
        )
      }

      return <div>Unsupported Asset Type: {contentType}</div>
    },
    [BLOCKS.EMBEDDED_ENTRY]: node => {
      const entryType = node.data.target.sys.contentType.sys.id

      switch (entryType) {
        case 'codeSnippet': {
          const { code, language } = node.data.target.fields

          return (
            <CodeSnippet
              code={code}
              language={language}
            />
          )
        }

        case 'downloadableFile': {
          const { title } = node.data.target.fields
          const {
            contentType,
            details: { size },
            url,
          } = node.data.target.fields.file.fields.file

          return (
            <FileDownloadButton
              contentType={contentType}
              size={size}
              title={title}
              url={url}
            />
          )
        }

        case 'embeddedHtml': {
          const { html } = node.data.target.fields

          return <div dangerouslySetInnerHTML={{ __html: html }} />
        }

        case 'embeddedTweet': {
          const { tweetUrl } = node.data.target.fields

          return (
            <div className="mx-auto w-96">
              <blockquote className="twitter-tweet">
                <a href={tweetUrl}></a>
              </blockquote>
            </div>
          )
        }

        case 'embeddedVideo': {
          const { title, videoId } = node.data.target.fields

          return (
            <iframe
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen={true}
              className="aspect-video w-full"
              src={`https://www.youtube.com/embed/${videoId}`}
              title={title}
              width="560"
            ></iframe>
          )
        }
      }

      return null
    },
    [BLOCKS.HEADING_1]: (node, children) => (
      <Contentful.Heading
        controlOrphans={headingsControlOrphans}
        decorated={decorativeHeadings}
        level={headingLevel}
        originalLevel={1}
      >
        {children}
      </Contentful.Heading>
    ),
    [BLOCKS.HEADING_2]: (node, children) => (
      <Contentful.Heading
        controlOrphans={headingsControlOrphans}
        decorated={decorativeHeadings}
        level={headingLevel + 1}
        originalLevel={2}
      >
        {children}
      </Contentful.Heading>
    ),
    [BLOCKS.HEADING_3]: (node, children) => (
      <Contentful.Heading
        controlOrphans={headingsControlOrphans}
        decorated={decorativeHeadings}
        level={headingLevel + 2}
        originalLevel={3}
      >
        {children}
      </Contentful.Heading>
    ),
    [BLOCKS.HEADING_4]: (node, children) => (
      <Contentful.Heading
        controlOrphans={headingsControlOrphans}
        decorated={decorativeHeadings}
        level={headingLevel + 3}
        originalLevel={4}
      >
        {children}
      </Contentful.Heading>
    ),
    [BLOCKS.HEADING_5]: (node, children) => (
      <Contentful.Heading
        controlOrphans={headingsControlOrphans}
        decorated={decorativeHeadings}
        level={headingLevel + 4}
        originalLevel={5}
      >
        {children}
      </Contentful.Heading>
    ),
    [BLOCKS.PARAGRAPH]: (_, children) => {
      const hasContent =
        children &&
        Array.isArray(children) &&
        children.some(child =>
          typeof child === 'string' ? child.trim() !== '' : true,
        )

      return hasContent ? (
        <ConditionalWrapper
          children={<p>{children}</p>}
          condition={paragraphsControlOrphans}
          wrapper={children => <OrphanController>{children}</OrphanController>}
        />
      ) : null
    },
    [BLOCKS.QUOTE]: (node, children) => {
      const hasIcon =
        node.content[0] &&
        node.content[0].nodeType === 'paragraph' &&
        node.content[0].content[0].nodeType === 'text' &&
        node.content[0].content[0].value.match(/^\p{Extended_Pictographic}/u)

      return (
        <blockquote
          className={twMerge(
            hasIcon &&
              `
                !pl-10
                [&>*:first-child]:-indent-5
              `,
          )}
        >
          {children}
        </blockquote>
      )
    },
    [INLINES.HYPERLINK]: (node, children) => {
      const childrenAsArray = Children.toArray(children)

      const linkContent = childrenAsArray[0]

      const isButton =
        typeof linkContent === 'string' &&
        linkContent.startsWith('[') &&
        linkContent.endsWith(']')

      const buttonType = isButton
        ? linkContent.startsWith('[[')
          ? 'secondary'
          : 'primary'
        : undefined

      const variant = isButton ? (`button.${buttonType!}` as const) : 'link'

      const isExternalLink = isExternalHref(node.data.uri)

      return (
        <StyledText
          as={Link}
          aria-disabled={node.data.uri === '#' ? 'true' : undefined}
          className="not-prose"
          href={node.data.uri}
          target={isExternalLink ? '_blank' : undefined}
          variant={variant}
          onClick={(event: MouseEvent) => event.stopPropagation()}
        >
          {isButton
            ? linkContent.replace(/^\[+\s*(.+?)\]+\s*$/, '$1')
            : linkContent}
          {isExternalLink && (
            <Icon
              name="arrow-up-right-from-square"
              variant="light"
            />
          )}
        </StyledText>
      )
    },
  },
})
