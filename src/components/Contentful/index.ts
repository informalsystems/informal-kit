import { ContentfulContentRenderer } from './ContentfulContentRenderer'
import { ContentfulEditMetadataButton } from './ContentfulEditMetadataButton'
import { ContentfulHotspot } from './ContentfulHotspot'
import { ContentfulSpotCopyBody } from './ContentfulSpotCopyBody'
import { ContentfulSpotCopyJSON } from './ContentfulSpotCopyJSON'
import { ContentfulSpotCopyMedia } from './ContentfulSpotCopyMedia'

export const Contentful = {
  ContentRenderer: ContentfulContentRenderer,
  Hotspot: ContentfulHotspot,
  EditMetadataButton: ContentfulEditMetadataButton,
  SpotCopy: {
    Body: ContentfulSpotCopyBody,
    JSON: ContentfulSpotCopyJSON,
    Media: ContentfulSpotCopyMedia,
  },
}
