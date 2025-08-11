import { twJoin } from 'tailwind-merge'
import { Icon } from '../Icon'

export const classNamesAndVariants = {
  variants: {
    error: {
      container: 'bg-red-500/90',
      icon: <Icon name="light:circle-exclamation" />,
    },
    success: {
      container: 'bg-green-500/90 text-white',
      icon: <Icon name="light:circle-check" />,
    },
    info: {
      container: 'bg-blue-500/90',
      icon: <Icon name="light:circle-info" />,
    },
    neutral: {
      container: 'bg-white/90 text-text-500',
      icon: <Icon name="light:circle-info" />,
    },
    warning: {
      container: 'bg-beige-500/90 text-text-500',
      icon: <Icon name="light:circle-exclamation" />,
    },
    working: {
      container: 'bg-beige-500/90 text-text-500',
      icon: (
        <div className="inline-flex animate-spin">
          <Icon name="light:loader" />
        </div>
      ),
    },
    workingInBackground: {
      container: 'bg-black text-white rounded-full w-min pr-3 ml-auto',
      icon: (
        <div className="inline-flex animate-spin">
          <Icon name="light:loader" />
        </div>
      ),
    },
  },
  toastsContainer: twJoin(
    'group/toasts-container',
    'fixed',
    'top-6',
    'right-6',
    'bottom-6',
    'z-50',
    'flex',
    'w-96',
    'flex-col-reverse',
    'items-end',
    'gap-3',
    'transition-opacity',
    '[&_.js-toast-container]:w-full',
    '[&:not(:has(.js-toast))]:pointer-events-none',
    '[&:not(:has(.js-toast))]:opacity-0',
  ),
  toastContainer: twJoin(
    'grid',
    'grid-cols-[min-content_auto_min-content]',
    'grid-rows-2',
    'items-center',
    'rounded-md',
    'text-xs',
    'text-white',
    'backdrop-blur-md',
  ),
  gradientOverlay: twJoin(
    'from-text-500',
    'pointer-events-none',
    'absolute',
    '-right-6',
    '-bottom-6',
    '-z-10',
    'h-1/3',
    'w-screen',
    'bg-gradient-to-tl',
    'via-transparent',
    'to-transparent',
  ),
  iconContainer: twJoin(
    'row-span-2',
    'flex',
    'h-full',
    'flex-col',
    'p-3',
    'pr-0',
    'text-2xl',
  ),
  messageContainer: twJoin(
    'row-span-2',
    'overflow-x-auto',
    'p-3',
    'text-balance',
  ),
  actionButtonsContainer: twJoin(
    'row-span-2',
    'grid',
    'grid-rows-subgrid',
    'overflow-hidden',
    'rounded-r-md',
    'border-l-2',
    'border-white/20',
  ),
  actionButton: twJoin(
    'row-span-1',
    'px-3',
    'py-1',
    'bg-blend-overlay',
    'only:row-span-2',
    'hover:bg-black/10',
    '[&+&]:border-t-2',
    '[&+&]:border-white/20',
  ),
}
