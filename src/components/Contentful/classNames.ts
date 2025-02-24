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
        inverted:stroke-white
        transition-all
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
        bg-accent-pink
        inverted:bg-white
        inverted:[&_*]:text-text-color
        dark:**:text-text-color
        pointer-events-none
        absolute
        flex
        gap-1
        px-3
        py-1
        text-xs
        whitespace-nowrap
        opacity-0
        transition-all
        **:text-white
        hover:scale-105
        dark:bg-white
      `,
      buttonPosition === 'top right'
        ? `
            top-0
            right-0
            origin-top-right
            rounded-bl
          `
        : `
            top-1/2
            left-1/2
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
