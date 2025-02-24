import { twJoin, twMerge } from 'tailwind-merge'

export const classNames = {
  container: twJoin(`
    relative
  `),

  descriptionAndButtonsContainer: twJoin(`
    portrait:mb-12
    landscape:absolute
    landscape:-top-6
    landscape:left-[26rem]
    landscape:right-0
    landscape:z-10
    landscape:ml-6
    landscape:flex
    landscape:h-64
    landscape:flex-col
    landscape:justify-between
    landscape:pb-6
  `),

  description: ({ isActive = false }) =>
    twMerge(
      `
        mb-3
        opacity-0
        transition-opacity
      `,
      isActive &&
        `
          opacity-100
        `,
    ),

  slideControlsContainer: twJoin(`
    relative
    flex
    items-center
    justify-center
    gap-3
    overflow-hidden
    rounded-full
    border-2
    border-brandColor/5
    p-2
    lowercase
  `),

  progressBarContainer: ({ isAutoPlaying = false }) =>
    twMerge(
      `
        pointer-events-none
        absolute
        inset-0.5
        opacity-0
        transition-opacity
      `,
      isAutoPlaying &&
        `
          opacity-100
        `,
    ),

  progressBar: twJoin(`
    h-full
    w-0
    rounded-l-full
    bg-brandColor/5
    transition-all
    ease-linear
  `),

  playPauseIcon: ({ isAutoPlaying = false }) =>
    twMerge(
      isAutoPlaying
        ? `
            *:text-accent-pink
          `
        : `
            *:text-accent-teal
          `,
    ),

  progressText: ({ isTransitioning = false }) =>
    twMerge(
      `
        whitespace-nowrap
        text-xs
        opacity-100
        transition-opacity
      `,
      isTransitioning &&
        `
          opacity-50
          transition-none
        `,
    ),

  imagesContainer: twJoin(`
    relative
    flex
    h-96
    w-full
    items-end
    transition-all
  `),

  imageContainer: ({ isActive = false }) =>
    twMerge(
      `
        relative
        mr-6
        size-32
        flex-shrink-0
        flex-grow-0
        overflow-hidden
        rounded
        shadow-inner
        transition-[width,height,margin,opacity]
        ease-in-out
      `,

      isActive &&
        `
          size-96
        `,
    ),
}
