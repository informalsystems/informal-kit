'use client'

import { twMerge } from 'tailwind-merge'
import { Popover, PopoverProps } from './Popover'

type SharedPopoverProps = Omit<
  PopoverProps,
  'childrenForPopover' | 'classNamesForPopover'
>

export interface TooltipProps extends SharedPopoverProps {
  classNamesForTooltip?: string
  tipContents: PopoverProps['childrenForPopover']
}

export function Tooltip({
  children,
  classNamesForTooltip,
  tipContents,
  ...otherProps
}: TooltipProps) {
  return (
    <Popover
      classNamesForPopover={twMerge(
        'dark',
        'pointer-events-none',
        'w-max max-w-60 px-4 py-2',
        'rounded-2xl bg-black/90 text-white',
        'text-left text-sm font-normal',
        classNamesForTooltip,
      )}
      childrenForPopover={tipContents}
      {...otherProps}
    >
      {children}
    </Popover>
  )
}
