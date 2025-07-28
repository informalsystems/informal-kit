export function slugify(text: string) {
  return text
    ? text
        .toLowerCase()
        .trim()
        .replace(/[^a-z0-9]/g, '-')
        .replace(/^[^a-z]+/, '')
        .replace(/-+$/, '')
    : ''
}
