import { ContentfulContentRenderer } from './ContentfulContentRenderer'
import { ContentfulHeading } from './ContentfulHeading'
import { ContentfulHotspot } from './ContentfulHotspot'
import { ContentfulSpotCopyBody } from './ContentfulSpotCopyBody'
import { ContentfulSpotCopyJSON } from './ContentfulSpotCopyJSON'
import { ContentfulSpotCopyMedia } from './ContentfulSpotCopyMedia'

export const Contentful = {
  ContentRenderer: ContentfulContentRenderer,
  Heading: ContentfulHeading,
  Hotspot: ContentfulHotspot,
  SpotCopy: {
    Body: ContentfulSpotCopyBody,
    JSON: ContentfulSpotCopyJSON,
    Media: ContentfulSpotCopyMedia,
  },
}
