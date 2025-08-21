import { twJoin, twMerge } from 'tailwind-merge'

export const classNames = {
  container: twJoin('relative'),

  descriptionAndButtonsContainer: twJoin(
    'mb-12',
    'lg:absolute',
    'lg:-top-6',
    'lg:right-0',
    'lg:left-104',
    'lg:z-10',
    'lg:mb-0',
    'lg:ml-6',
    'lg:flex',
    'lg:h-64',
    'lg:flex-col',
    'lg:justify-between',
    'lg:pb-6',
  ),

  description: ({ isActive = false }) =>
    twMerge(
      'mt-6',
      'mb-3',
      'opacity-0',
      'transition-opacity',
      isActive && 'opacity-100',
    ),

  slideControlsContainer: twJoin(
    'relative',
    'flex items-center',
    'gap-3',
    'overflow-hidden',
    'lowercase',
  ),

  progressBarContainer: ({ isAutoPlaying = false }) =>
    twMerge(
      'bg-theme-accent-color/10',
      'w-64',
      'opacity-20',
      'transition-all',
      isAutoPlaying && 'opacity-100',
    ),

  progressBar: ({ isAutoPlaying = false }) =>
    twMerge(
      'bg-theme-accent-color',
      'h-2',
      'w-0',
      'transition-none',
      'ease-linear',
      isAutoPlaying && 'transition-all',
    ),

  progressText: ({ isTransitioning = false }) =>
    twMerge(
      'text-xs',
      'whitespace-nowrap',
      'opacity-100',
      'transition-opacity',
      isTransitioning && ['opacity-50', 'transition-none'],
    ),

  imagesContainer: twJoin(
    'relative',
    'mb-20',
    'flex',
    'h-96',
    'w-full',
    'items-end',
    'transition-all',
    'sm:mb-0',
  ),

  imageContainer: ({ isActive = false }) =>
    twMerge(
      'relative',
      'mr-6',
      'size-32',
      'shrink-0',
      'grow-0',
      '-translate-x-102',
      'translate-y-40',
      'overflow-hidden',
      'rounded',
      'shadow-inner',
      'transition-[width,height,margin,opacity,transform]',
      'ease-in-out',
      'sm:translate-x-0',
      'sm:translate-y-0',
      isActive && ['size-96', 'translate-x-0', 'translate-y-0'],
    ),
}
