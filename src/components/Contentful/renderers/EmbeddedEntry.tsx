import { CodeSnippet } from '@/components/CodeSnippet'
import { FileDownloadButton } from '@/components/FileDownloadButton'

export function EmbeddedEntry({ node }: { node: any }) {
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
}
