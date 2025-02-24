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

  const headersList = await headers()

  const requestURL =
    headersList.get('x-url') ?? process.env.NEXT_PUBLIC_METADATA_BASE_URL

  const { pathname } = new URL(requestURL)

  const { baseRouteMetadata, matchingRouteMetadata } =
    await getContentfulRouteMetadata({
      routePattern: pathname,
    })

  const { pageDescription, keywords, pageTitle } = matchingRouteMetadata ?? {}

  const pathSegments = pathname
    .replace(baseRouteMetadata?.routePattern ?? '/', '')
    .split('/')
    .filter(Boolean)

  const finalTitle = matchingRouteMetadata
    ? [baseRouteMetadata?.pageTitle, pageTitle].filter(Boolean).join(' - ')
    : pathSegments.length
      ? [baseRouteMetadata?.pageTitle, ...pathSegments]
          .filter(Boolean)
          .map(startCase)
          .join(' - ')
      : baseRouteMetadata?.pageTitle

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_METADATA_BASE_URL),
    title: finalTitle,
    description: pageDescription ?? baseRouteMetadata?.pageDescription,
    keywords: keywords ?? baseRouteMetadata?.keywords ?? [],
  }
}
