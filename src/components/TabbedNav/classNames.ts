import { tw } from '@/lib/tw'
import { twMerge } from 'tailwind-merge'

export const classNames = {
  container: tw`
    landscape:border-b-2
  `,

  tabsContainer: tw`
    flex
    gap-6
    portrait:flex-col
    portrait:gap-1
  `,

  tabContainer: tw`
  `,

  tabButton: ({ isActive = false }) =>
    twMerge(
      `
        -mb-[2px]
        block
        py-3
        font-display
        portrait:-mx-3
        portrait:border-none
        portrait:px-3
        landscape:border-b-4
      `,
      isActive
        ? tw`
            border-accent-teal
            text-accent-teal
            portrait:bg-accent-teal/10
          `
        : tw`
            border-transparent
            bg-transparent
            text-textColor
            hover:border-accent-teal
            hover:text-accent-teal
          `,
    ),
}
