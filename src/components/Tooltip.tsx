'use client'

import { Atom } from '@/components/Atom'
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
      triggerType="hover"
      classNamesForPopover="pointer-events-none"
      childrenForPopover={
        <Atom
          as="div"
          variant="popover"
          className={classNamesForTooltip}
        >
          {tipContents}
        </Atom>
      }
      {...otherProps}
    >
      {children}
    </Popover>
  )
}
