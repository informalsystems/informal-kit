export function isExternalHref(href: unknown): boolean {
  if (typeof href !== 'string') return false
  return href.startsWith('http')
}
