import { Menu } from '@/components/Menu'
import { MenuItemProps } from '@/components/MenuItem'
import Link from 'next/link'
import { ComponentProps } from 'react'
import { Popover } from './Popover'

export interface MenuButtonProps<T extends 'button' | 'a' | typeof Link>
  extends ComponentProps<'div'> {
  items: MenuItemProps<T>[]
  disabled?: boolean
}

export function MenuButton<T extends 'button' | 'a' | typeof Link>({
  children,
  items,
  disabled,
  ...otherProps
}: MenuButtonProps<T>) {
  return (
    <Popover
      disabled={disabled}
      triggerType="click"
      popoverPosition="below"
      childrenForPopover={<Menu items={items} />}
      {...otherProps}
    >
      {children}
    </Popover>
  )
}
