export function isExternalHref(
  href: unknown,
  pathsToTreatAsExternal: string[] = [],
): boolean {
  if (typeof href !== 'string') return false

  if (href.startsWith('http')) return true

  if (typeof window === 'undefined') {
    return pathsToTreatAsExternal.some(p => href.startsWith(p))
  }

  const { pathname } = new URL(window.location.href)

  return pathsToTreatAsExternal.some(
    path =>
      (pathname.startsWith(path) && href === '/') ||
      (!pathname.startsWith(path) && href.startsWith(path)) ||
      (pathname.startsWith(path) && !href.startsWith(path)),
  )
}
