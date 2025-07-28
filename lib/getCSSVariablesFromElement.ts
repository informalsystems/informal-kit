export function getCSSVariablesFromElement(element: HTMLElement) {
  const styles = getComputedStyle(element)
  const cssVariables: Record<string, string> = {}

  for (let i = 0; i < styles.length; i++) {
    const name = styles[i]
    if (name.startsWith('--')) {
      cssVariables[name] = styles.getPropertyValue(name).trim()
    }
  }

  return cssVariables
}
