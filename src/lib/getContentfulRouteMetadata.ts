'use server'

import { getContentfulEntriesByType } from '@/lib/contentfulClient'
import { TypeRouteMetadataSkeleton } from '@/lib/contentfulTypes'
import { sortBy } from 'lodash'

export async function getContentfulRouteMetadata({
  routePattern,
}: {
  routePattern: string
}) {
  const allRouteMetadata =
    await getContentfulEntriesByType<TypeRouteMetadataSkeleton>('routeMetadata')

  const sanitizedRouteMetadata = allRouteMetadata.map(item => ({
    ...item.fields,
    contentfulURL: `https://app.contentful.com/spaces/${item.sys.space.sys.id}/entries/${item.sys.id}`,
    keywords: item.fields.keywords ?? [],
  }))

  // Sort by length of routePattern, so that the longest (more specific) routes
  // are checked first
  const sortedRouteMetadata = sortBy(
    sanitizedRouteMetadata,
    item => item.routePattern.length,
  )
  sortedRouteMetadata.reverse()

  const baseRouteMetadata = sortedRouteMetadata.find(
    item => item.isBaseRoute && routePattern.startsWith(item.routePattern),
  )

  const matchingRouteMetadata = sortedRouteMetadata.find(item =>
    routePattern.startsWith(item.routePattern),
  )

  return {
    baseRouteMetadata,
    matchingRouteMetadata: Object.is(matchingRouteMetadata, baseRouteMetadata)
      ? undefined
      : matchingRouteMetadata,
  }
}
