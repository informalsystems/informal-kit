import sortBy from 'lodash/sortBy'

interface RouteClassNameOptions {
  routeClassMap: Record<string, string>
}

export function getClassNameFromPathname(
  pathname: string,
  routeClassMap: Record<string, string>,
): string {
  const sortedRoutes = sortBy(
    Object.keys(routeClassMap),
    route => -route.length,
  )
  const matchingRoute = sortedRoutes.find(route => pathname.startsWith(route))
  if (matchingRoute) {
    return routeClassMap[matchingRoute]
  }
  const shortestRoute = sortBy(Object.keys(routeClassMap), 'length')[0]
  return routeClassMap[shortestRoute]
}
