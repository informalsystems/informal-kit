import { twJoin, twMerge } from 'tailwind-merge'

const baseButtonClassNames = twJoin(`
  inline-flex
  cursor-pointer
  items-center
  justify-center
  gap-1.5
  transition-all
  hover:scale-105
  disabled:pointer-events-none
  disabled:opacity-40
  aria-[disabled]:pointer-events-none
  aria-[disabled]:opacity-40
`)

const baseHeadingClassNames = twJoin(`
  font-display
  font-normal
`)

const classNames: Record<string, string> = {}

classNames['button.primary'] = twMerge(
  baseButtonClassNames,
  `
    js-button-primary
    border-text-color
    bg-text-color
    inverted:border-white
    inverted:bg-white
    inverted:text-text-color
    dark:text-text-color
    rounded-md
    border-2
    px-6
    py-3
    text-center
    text-xs
    leading-none
    font-semibold
    tracking-widest
    text-white
    uppercase
    sm:whitespace-nowrap
    dark:border-white
    dark:bg-white
  `,
)

classNames['button.secondary'] = twMerge(
  baseButtonClassNames,
  `
    js-button-secondary
    border-text-color
    text-text-color
    inverted:border-white
    inverted:text-white
    relative
    z-10
    rounded-md
    border-2
    px-6
    py-3
    text-center
    text-xs
    leading-none
    font-semibold
    tracking-widest
    uppercase
    backdrop-blur-xs
    sm:whitespace-nowrap
    dark:border-white
    dark:text-white
  `,
)

classNames['button.icon'] = twMerge(
  baseButtonClassNames,
  `
    bg-shaded-bg-color
    hover:bg-text-color
    inverted:bg-white
    inverted:text-brand-color
    dark:text-brand-color
    size-10
    rounded-full
    hover:text-white
    dark:bg-white
  `,
)

classNames['h1'] = twMerge(
  baseHeadingClassNames,
  `
    *:strong:text-text-color/60
    *:strong:font-normal
    text-5xl
  `,
)

classNames['h2'] = twMerge(
  baseHeadingClassNames,
  `
    *:strong:text-text-color/60
    *:strong:font-normal
    text-4xl
  `,
)

classNames['h3'] = twMerge(
  baseHeadingClassNames,
  `
    *:strong:text-text-color/60
    *:strong:font-normal
    text-3xl
  `,
)

classNames['label'] = twJoin(`
  text-faded-text-color
  inverted:text-faded-text-colorInDarkMode
  dark:text-faded-text-colorInDarkMode
  text-sm
`)

classNames['link'] = twMerge(
  baseButtonClassNames,
  `
    inverted:text-[var(--tw-prose-invert-links)]
    inline
    text-[var(--tw-prose-links)]
    underline
    underline-offset-4
    hover:scale-100
    hover:underline-offset-8
    dark:text-[var(--tw-prose-invert-links)]
    [&_span]:ml-1
  `,
)

classNames['link.subtle'] = twMerge(
  baseButtonClassNames,
  `
    inline
    hover:underline
    [&_span]:ml-1
  `,
)

classNames['popover'] = twJoin(
  'dark',
  'w-max max-w-60 px-4 py-2',
  'rounded-2xl bg-black/90 text-white',
  'text-left text-sm font-normal',
)

export { classNames }
