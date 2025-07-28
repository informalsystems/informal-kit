export function tw(strings: TemplateStringsArray, ...values: unknown[]) {
  return String.raw({ raw: strings }, ...values)
}
