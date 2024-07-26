import { tw } from '@/lib/tw'
import { twMerge } from 'tailwind-merge'

export const classNames = {
  backdrop: ({ hasMessages = false }) =>
    twMerge(
      `
        pointer-events-none
        fixed
        bottom-0
        right-0
        z-10
        h-[20vh]
        w-[50vw]
        bg-gradient-to-tl
        from-brand-100
        via-transparent
        to-transparent
        opacity-0
        transition-opacity
        duration-500
      `,
      hasMessages &&
        `
          opacity-100
        `,
    ),

  container: tw`
    fixed
    bottom-0
    right-0
    z-20
    flex
    flex-col-reverse
    gap-2
    p-6
  `,

  closeButton: tw`
    block
  `,

  notificationContainer: ({ state = 'entering' }) =>
    twMerge(
      `
        relative
        w-[20rem]
        transition-all
        [&:nth-child(n+3)]:opacity-75
        [&:nth-child(n+4)]:opacity-50
        [&:nth-child(n+5)]:opacity-25
        [&:nth-child(n+6)]:opacity-5
        [&:nth-child(n+7)]:opacity-0
      `,
      state === 'entering' &&
        `
          animate-animateInX
        `,
      state === 'entered' &&
        `
        `,
      state === 'exiting' &&
        `
          animate-animateOutX
        `,
      state === 'exited' &&
        `
          hidden
        `,
    ),

  notificationSurface: ({ success = false }) =>
    twMerge(
      `
        dark
        grid
        w-full
        grid-cols-[auto,1fr,auto]
        gap-2
        rounded-md
        border-2
        px-3
        py-2
        text-sm
        text-white
        shadow-md
        transition-all
      `,
      success
        ? `
            border-accent-lavender
            bg-accent-lavender/90
          `
        : `
            border-accent-rust
            bg-accent-rust/90
          `,
    ),
}
