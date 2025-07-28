import sortBy from 'lodash/sortBy'
import { headers } from 'next/headers'

interface RouteClassNameOptions {
  routeClassMap: Record<string, string>
}

// Shared logic for getting class name from pathname
function getClassNameFromPathname(
  pathname: string,
  routeClassMap: Record<string, string>,
): string {
  const sortedRoutes = sortBy(
    Object.keys(routeClassMap),
    (route) => -route.length,
  )
  const matchingRoute = sortedRoutes.find((route) => pathname.startsWith(route))

  if (matchingRoute) {
    return routeClassMap[matchingRoute]
  }

  // Use shortest path as default
  const shortestRoute = sortBy(Object.keys(routeClassMap), 'length')[0]
  return routeClassMap[shortestRoute]
}

// Server-side function that reads pathname from headers
export async function getRouteClassName({
  routeClassMap,
}: RouteClassNameOptions): Promise<string> {
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || '/'

  return getClassNameFromPathname(pathname, routeClassMap)
}
