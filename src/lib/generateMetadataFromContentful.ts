import { getContentfulRouteMetadata } from '@/lib/getContentfulRouteMetadata'
import { startCase } from 'lodash'
import { headers } from 'next/headers'
import invariant from 'tiny-invariant'

// Assumes middleware: requestHeaders.set('x-url', request.url)
export async function generateMetadataFromContentful() {
  invariant(
    process.env.NEXT_PUBLIC_METADATA_BASE_URL,
    'Missing NEXT_PUBLIC_METADATA_BASE_URL',
  )

  const headersList = headers()
  const requestURL =
    headersList.get('x-url') ?? process.env.NEXT_PUBLIC_METADATA_BASE_URL

  const { pathname } = new URL(requestURL)

  const { baseRouteMetadata, matchingRouteMetadata } =
    await getContentfulRouteMetadata({
      routePattern: pathname,
    })

  const { description, keywords, title } = matchingRouteMetadata ?? {}

  const pathSegments = pathname
    .replace(baseRouteMetadata?.routePattern ?? '/', '')
    .split('/')
    .filter(Boolean)

  const finalTitle = matchingRouteMetadata
    ? [baseRouteMetadata?.title, title].filter(Boolean).join(' - ')
    : pathSegments.length
      ? [baseRouteMetadata?.title, ...pathSegments]
          .filter(Boolean)
          .map(startCase)
          .join(' - ')
      : baseRouteMetadata?.title

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_METADATA_BASE_URL),
    icons: `/favicon-${baseRouteMetadata?.favicon ?? 'blue-500'}.svg`,
    title: finalTitle,
    description: description ?? baseRouteMetadata?.description,
    keywords: keywords ?? baseRouteMetadata?.keywords ?? [],
  }
}
