import { EntrySkeletonType, createClient } from 'contentful'
import invariant from 'tiny-invariant'

invariant(process.env.CONTENTFUL_SPACE_ID, 'Missing CONTENTFUL_SPACE_ID')

if (process.env.NODE_ENV === 'development') {
  invariant(
    process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN,
    'Missing CONTENTFUL_PREVIEW_ACCESS_TOKEN',
  )
  invariant(
    process.env.CONTENTFUL_PREVIEW_HOST_NAME,
    'Missing process.env.CONTENTFUL_PREVIEW_HOST_NAME',
  )
} else {
  invariant(
    process.env.CONTENTFUL_ACCESS_TOKEN,
    'Missing CONTENTFUL_ACCESS_TOKEN',
  )
  invariant(
    process.env.CONTENTFUL_HOST_NAME,
    'Missing process.env.CONTENTFUL_HOST_NAME',
  )
}

export const contentfulClient = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken:
    process.env.NODE_ENV === 'development'
      ? process.env.CONTENTFUL_PREVIEW_ACCESS_TOKEN!
      : process.env.CONTENTFUL_ACCESS_TOKEN!,
  host:
    process.env.NODE_ENV === 'development'
      ? process.env.CONTENTFUL_PREVIEW_HOST_NAME!
      : process.env.CONTENTFUL_HOST_NAME!,
})

export async function getContentfulEntriesByType<T extends EntrySkeletonType>(
  contentType: string,
  query?: {
    [key: string]: unknown
  },
) {
  const { items } = await contentfulClient.getEntries<T>({
    content_type: contentType,
    limit: 1000,
    ...query,
  })

  return items
}
