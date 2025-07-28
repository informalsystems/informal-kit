'use client'

import {
  FloatingFocusManager,
  FloatingPortal,
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useRole,
  useTransitionStatus,
  type Placement,
} from '@floating-ui/react'
import { ReactNode, useState } from 'react'
import { twJoin } from 'tailwind-merge'

interface PopupMenuProps {
  trigger: ReactNode
  children: ReactNode
  className?: string
  classNameForMenu?: string
  placement?: Placement
}

export function PopupMenu({
  trigger,
  children,
  className: classNameForTrigger,
  classNameForMenu,
  placement = 'bottom-start',
}: PopupMenuProps) {
  const [isOpen, setIsOpen] = useState(false)

  const {
    refs,
    floatingStyles,
    context,
    placement: resolvedPlacement,
    isPositioned,
  } = useFloating({
    open: isOpen,
    onOpenChange: setIsOpen,
    placement,
    middleware: [offset(4), flip(), shift({ padding: 8 })],
    whileElementsMounted: autoUpdate,
    transform: false,
  })

  const { isMounted, status } = useTransitionStatus(context, {
    duration: 200,
  })

  const click = useClick(context)
  const dismiss = useDismiss(context)
  const role = useRole(context, { role: 'menu' })

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
    role,
  ])

  return (
    <>
      <div
        ref={refs.setReference}
        {...getReferenceProps()}
        className={twJoin('relative', classNameForTrigger)}
      >
        {trigger}
      </div>

      {isMounted && (
        <FloatingPortal>
          <FloatingFocusManager
            context={context}
            modal={false}
          >
            <div
              ref={refs.setFloating}
              style={floatingStyles}
              {...getFloatingProps()}
              className="z-50"
            >
              <div
                data-status={status}
                data-is-positioned={isPositioned ? 'true' : 'false'}
                className={twJoin('popover', classNameForMenu)}
                onClick={() => setIsOpen(false)}
              >
                {children}
              </div>
            </div>
          </FloatingFocusManager>
        </FloatingPortal>
      )}
    </>
  )
}
