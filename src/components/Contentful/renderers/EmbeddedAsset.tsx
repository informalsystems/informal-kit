import { ZoomableImage } from '@/components/ZoomableImage'

export function EmbeddedAsset({ node }: { node: any }) {
  const { file, description } = node.data.target.fields

  const {
    contentType,
    details: {
      image: { height, width },
    },
    fileName,
    url,
  } = file

  if (contentType.startsWith('image')) {
    return (
      <ZoomableImage
        height={height}
        alt={fileName}
        caption={description}
        url={url}
        width={width}
      />
    )
  }

  return <div>Unsupported Asset Type: {contentType}</div>
}
