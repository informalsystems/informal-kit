import { twMerge } from 'tailwind-merge'

export const classNames = {
  tracerAndButtonContainer: ({ isHovering = false }) =>
    twMerge(
      `
        pointer-events-none
        z-50
        rounded-[20px]
        transition-[background,opacity]
      `,
      isHovering
        ? `
            bg-accent-pink/5
            opacity-100
            duration-500
          `
        : `
            bg-accent-pink/0
            opacity-50
            duration-1000
          `,
    ),

  path: ({ isHovering = false }) =>
    twMerge(
      `
        stroke-accent-pink/30
        transition-all
        inverted:stroke-white
        dark:stroke-white
      `,
      isHovering
        ? `
            opacity-100
            duration-1000
          `
        : `
            opacity-0
            duration-500
          `,
    ),

  editButton: ({ buttonPosition = 'top right', isHovering = false }) =>
    twMerge(
      `
        pointer-events-none
        absolute
        flex
        gap-1
        whitespace-nowrap
        bg-accent-pink
        px-3
        py-1
        text-xs
        opacity-0
        transition-all
        hover:scale-105
        inverted:bg-white
        dark:bg-white
        **:text-white
        inverted:[&_*]:text-textColor
        dark:**:text-textColor
      `,
      buttonPosition === 'top right'
        ? `
            right-0
            top-0
            origin-top-right
            rounded-bl
          `
        : `
            left-1/2
            top-1/2
            -translate-x-1/2
            -translate-y-1/2
            rounded
          `,
      isHovering &&
        `
          pointer-events-auto
          opacity-100
        `,
    ),
}
