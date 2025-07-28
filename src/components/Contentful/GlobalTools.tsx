'use client'

import { usePathname } from 'next/navigation'
import { ChangeEvent, ComponentProps, useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
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
    <div className="mb-1 flex items-center gap-1 whitespace-nowrap">
      <span className="text-xs font-bold whitespace-nowrap">{label}</span>
      <a
        className="link"
        href={contentfulURL}
        target="_blank"
        rel="noopener noreferrer"
        title="Edit in Contentful"
      >
        <Icon
          name="regular:pencil"
          className="size-3"
        />
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

  const [isExpanded, setIsExpanded] = useState(false)

  const [isHoverToEditEnabled, setIsHoverToEditEnabled] =
    useLocalStorage<boolean>('isHoverToEditEnabled', true)

  const [metadata, setMetadata] = useState<Awaited<
    ReturnType<typeof getContentfulRouteMetadata>
  > | null>(null)

  const pathname = usePathname()

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
        id="global-tools-button"
        title={isExpanded ? 'Hide Page Options' : 'Show Page Options'}
        className={twMerge(
          'fixed right-6 bottom-6 z-20',
          'flex items-center justify-center',
          'size-8 rounded-full border-2 border-white',
          'bg-brand-500/95 text-white backdrop-blur-md',
          'hover:bg-brand-400/95 transition-colors',
          'transition-transform duration-200',
          isExpanded && 'rotate-180',
          className,
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Icon
          name={isExpanded ? 'solid:xmark' : 'solid:gear'}
          className="transition-all duration-200"
        />
        <span className="sr-only">{isExpanded ? 'Hide' : 'Show'} Metadata</span>
      </button>

      {isExpanded && (
        <div
          className={twMerge(
            'fixed right-6 bottom-20 z-20',
            'w-[90vw] rounded-md sm:w-72',
            'bg-brand-500/95 text-white backdrop-blur-md',
            'border-2 border-white',
            'flex flex-col gap-3 p-3',
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
