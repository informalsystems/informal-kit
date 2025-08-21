'use client'

import {
  autoUpdate,
  flip,
  offset,
  shift,
  useClick,
  useDismiss,
  useFloating,
  useInteractions,
  useTransitionStatus,
} from '@floating-ui/react'
import { usePathname } from 'next/navigation'
import { ChangeEvent, ComponentProps, useEffect, useState } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'
import invariant from 'tiny-invariant'
import { useLocalStorage } from 'usehooks-ts'
import { getContentfulRouteMetadata } from '../../lib/getContentfulRouteMetadata'
import { Icon } from '../Icon'

type GlobalToolsProps = ComponentProps<'div'>

type MetadataItemProps = {
  label: string
  contentfulURL: string
  children: React.ReactNode
}

const MetadataItem = ({
  label,
  contentfulURL,
  children,
}: MetadataItemProps) => (
  <div className="col-span-2">
    <div
      className={twJoin(
        'mb-1',
        'flex',
        'items-center',
        'justify-between',
        'gap-1',
        'text-xs',
        'whitespace-nowrap',
      )}
    >
      <span className="font-bold whitespace-nowrap">{label}</span>
      <a
        className="link group"
        href={contentfulURL}
        target="_blank"
        rel="noopener noreferrer"
        title="Edit in Contentful"
      >
        <span className="opacity-0 transition-opacity group-hover:opacity-100">
          Edit in Contentful
        </span>
        <Icon name="regular:pencil" />
      </a>
    </div>
    <div className="text-xs">{children}</div>
  </div>
)

const HoverToEditToggle = ({
  isEnabled,
  onChange,
}: {
  isEnabled: boolean
  onChange: (value: boolean, event: ChangeEvent<HTMLInputElement>) => void
}) => (
  <div className="flex items-center justify-between">
    <div className="text-xs font-bold whitespace-nowrap">Hover-to-Edit</div>
    <div className="flex items-center gap-3 text-xs">
      <label className="flex items-center gap-1">
        <input
          className="input-radio"
          type="radio"
          name="isHoverToEditEnabled"
          value="false"
          checked={isEnabled === false}
          onChange={onChange.bind(null, false)}
        />
        <span>Off</span>
      </label>
      <label className="flex items-center gap-1">
        <input
          className="input-radio"
          type="radio"
          name="isHoverToEditEnabled"
          value="true"
          checked={isEnabled === true}
          onChange={onChange.bind(null, true)}
        />
        <span>On</span>
      </label>
    </div>
  </div>
)

export function GlobalTools({ className, ...otherProps }: GlobalToolsProps) {
  invariant(process.env.NEXT_PUBLIC_URL, 'Missing NEXT_PUBLIC_URL')

  const [open, setOpen] = useState(false)
  const [isHoverToEditEnabled, setIsHoverToEditEnabled] =
    useLocalStorage<boolean>('isHoverToEditEnabled', true)

  const [metadata, setMetadata] = useState<Awaited<
    ReturnType<typeof getContentfulRouteMetadata>
  > | null>(null)

  const pathname = usePathname()

  // Floating UI setup
  const { refs, floatingStyles, context } = useFloating({
    open,
    onOpenChange: setOpen,
    placement: 'top-end',
    whileElementsMounted: autoUpdate,
    middleware: [offset(16), flip(), shift()],
  })

  const click = useClick(context)
  const dismiss = useDismiss(context)

  const { getReferenceProps, getFloatingProps } = useInteractions([
    click,
    dismiss,
  ])

  const { isMounted, status } = useTransitionStatus(context, {
    duration: 300,
  })

  useEffect(() => {
    ;(async function () {
      const metadata = await getContentfulRouteMetadata({
        routePattern: pathname,
      })

      setMetadata(metadata)
    })()
  }, [pathname])

  if (
    process.env.NEXT_PUBLIC_SHOW_CONTENTFUL_HOTSPOTS?.toLowerCase() !== 'true'
  ) {
    return null
  }

  const { baseRouteMetadata, matchingRouteMetadata } = metadata ?? {}

  const contentfulURL =
    matchingRouteMetadata?.contentfulURL ??
    baseRouteMetadata?.contentfulURL ??
    `#`

  const { title, description, keywords } =
    matchingRouteMetadata ?? baseRouteMetadata ?? {}

  const handleChangeHoverToEdit = (
    value: boolean,
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    if (event.target.checked === true) {
      setIsHoverToEditEnabled(value)
    }
  }

  return (
    <>
      <button
        ref={refs.setReference}
        {...getReferenceProps()}
        id="global-tools-button"
        title={open ? 'Hide Page Options' : 'Show Page Options'}
        className={twMerge(
          'fixed right-6 bottom-6 z-20',
          'flex items-center justify-center',
          'size-8',
          'rounded-full',
          'border-2',
          'border-theme-bg-color',
          'bg-theme-text-color/95',
          'text-theme-bg-color',
          'backdrop-blur-md',
          'transition-all',
          'hover:bg-theme-text-color/95',
          open && 'rotate-180',
          className,
        )}
      >
        <Icon name={open ? 'solid:xmark' : 'solid:gear'} />
        <span className="sr-only">{open ? 'Hide' : 'Show'} Metadata</span>

        <div
          className={twMerge(
            'absolute',
            'top-1/2 right-full -translate-y-1/2',
            'is-inverted bg-theme-bg-color',
            'mr-1',
            'px-1',
            'rounded-xs',
            'text-[10px] font-bold uppercase',
            'opacity-50 transition-opacity',
            open ? 'opacity-0 duration-75' : 'delay-1000',
          )}
        >
          <span className="sm:hidden">&lt;sm</span>
          <span className="hidden sm:block md:hidden">sm</span>
          <span className="hidden md:block lg:hidden">md</span>
          <span className="hidden lg:block xl:hidden">lg</span>
          <span className="hidden xl:block 2xl:hidden">xl</span>
          <span className="hidden 2xl:block">2xl</span>
        </div>
      </button>

      {isMounted && (
        <div
          ref={refs.setFloating}
          style={floatingStyles}
          {...getFloatingProps()}
          className={twMerge(
            'is-inverted',
            'z-30',
            'w-[90vw] rounded-md sm:w-72',
            'text-theme-text-color',
            'bg-theme-bg-color/95',
            'backdrop-blur-md',
            'flex flex-col gap-3 p-3',
            'shadow-2xl',
            'transition-all duration-300 ease-out',
            // Animation classes based on status
            status === 'open'
              ? 'translate-x-0 opacity-100'
              : 'translate-x-4 opacity-0',
          )}
          {...otherProps}
        >
          <HoverToEditToggle
            isEnabled={isHoverToEditEnabled}
            onChange={handleChangeHoverToEdit}
          />

          <div className="w-full border-b" />

          <MetadataItem
            label="Meta Title"
            contentfulURL={contentfulURL}
          >
            {title}
          </MetadataItem>

          <MetadataItem
            label="Meta Keywords"
            contentfulURL={contentfulURL}
          >
            {keywords && keywords.length > 0 ? (
              keywords.join(' ')
            ) : (
              <span className="italic opacity-60">No Keywords</span>
            )}
          </MetadataItem>

          <MetadataItem
            label="Meta Description"
            contentfulURL={contentfulURL}
          >
            {description ?? (
              <span className="italic opacity-60">No Description</span>
            )}
          </MetadataItem>
        </div>
      )}
    </>
  )
}
