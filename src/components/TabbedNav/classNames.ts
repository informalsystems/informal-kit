import { twJoin, twMerge } from 'tailwind-merge'

export const classNames = {
  container: twJoin(`
    landscape:border-b-2
  `),

  tabsContainer: twJoin(`
    flex
    gap-6
    portrait:flex-col
    portrait:gap-1
  `),

  tabContainer: twJoin(`
  `),

  tabButton: ({ isActive = false }) =>
    twMerge(
      twJoin(`
        -mb-[2px]
        block
        py-3
        font-display
        portrait:-mx-3
        portrait:border-none
        portrait:px-3
        landscape:border-b-4
      `),
      isActive
        ? twJoin(`
            border-accent-teal
            text-accent-teal
            portrait:bg-accent-teal/10
          `)
        : twJoin(`
            border-transparent
            bg-transparent
            text-textColor
            hover:border-accent-teal
            hover:text-accent-teal
          `),
    ),
}
