import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { Icon } from '../../Icon'

export function TH({
  children,
  className,
  isSortable,
  isSorted,
  sortDirection,
  textAlign,
  ...otherProps
}: ComponentProps<'th'> & {
  isSortable?: boolean
  isSorted?: boolean
  sortDirection?: 'ASC' | 'DESC'
  textAlign?: 'center' | 'left' | 'right'
}) {
  return (
    <th
      className={twMerge(
        `
          group/table-cell
          grow
          px-5
          py-1
          text-sm
          font-normal
          text-neutral-200
          max-sm:block
        `,
        isSortable &&
          `
            hover:bg-palette-beige/10
            cursor-pointer
          `,
        textAlign === 'center'
          ? 'sm:text-center'
          : textAlign === 'right'
            ? 'sm:text-right'
            : 'sm:text-left',
        className,
      )}
      {...otherProps}
    >
      <span
        className={twMerge(
          `
            relative
            inline-flex
            flex-row
            items-center
            gap-1
            whitespace-nowrap
        `,
          textAlign === 'center'
            ? 'text-center'
            : textAlign === 'right'
              ? 'text-right'
              : 'text-left',
        )}
      >
        {children ?? <>&nbsp;</>}
        {isSortable && (
          <div
            className={twMerge(
              `
                transition-all
                group-hover/table-cell:opacity-50
              `,
              isSorted ? 'opacity-100!' : 'opacity-0',
              sortDirection === 'ASC' ? 'rotate-0' : 'rotate-180',
              textAlign === 'right' && '-order-1',
              !isSorted &&
                textAlign === 'center' &&
                `
                  absolute
                  top-1/2
                  left-full
                  translate-x-1
                  -translate-y-1/2
                `,
            )}
          >
            <Icon name="solid:chevron-up" />
          </div>
        )}
      </span>
    </th>
  )
}
