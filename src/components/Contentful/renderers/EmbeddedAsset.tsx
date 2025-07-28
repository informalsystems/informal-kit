import { Block, Inline, Node } from '@contentful/rich-text-types'
import { ZoomableImage } from '../../ZoomableImage'

export function EmbeddedAsset({ node }: { node: Block | Inline }) {
  const assetNode = node as Node
  const { file, description } = assetNode.data.target.fields

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
