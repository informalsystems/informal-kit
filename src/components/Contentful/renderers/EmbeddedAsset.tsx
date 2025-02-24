import { ZoomableImage } from '@/components/ZoomableImage'

export function EmbeddedAsset({ node }: { node: any }) {
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
}
