'use client'

import { Icon } from '@/components/Icon'
import { StyledText } from '@/components/StyledText'
import { getContentfulRouteMetadata } from '@/lib/getContentfulRouteMetadata'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { twMerge } from 'tailwind-merge'
import invariant from 'tiny-invariant'

export function ContentfulEditMetadataButton() {
  invariant(
    process.env.NEXT_PUBLIC_METADATA_BASE_URL,
    'Missing NEXT_PUBLIC_METADATA_BASE_URL',
  )

  const [isExpanded, setIsExpanded] = useState(false)

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

  return (
    <div
      className="
        fixed
        bottom-6
        right-6
        z-20
        rounded
        border
        bg-textColor
        text-xs
        text-white
      "
    >
      <div
        className={twMerge(
          `
            p-1
            transition-all
            duration-700
          `,
          isExpanded &&
            `
              border-b
              p-2
            `,
        )}
      >
        <StyledText
          as="button"
          variant="button.tool"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          <Icon name="memo-circle-info" />
          {isExpanded ? 'Hide' : 'Show'} Metadata
        </StyledText>
      </div>

      <div
        className={twMerge(
          `
            max-h-0
            max-w-0
            overflow-hidden
            transition-all
            duration-700
          `,
          isExpanded &&
            `
              max-h-96
              max-w-60
            `,
        )}
      >
        <div
          className="
            flex
            flex-col
            gap-2
            p-3
          "
        >
          <div>
            <StyledText
              as="div"
              variant="label"
            >
              Title
            </StyledText>
            {title}
          </div>

          <div>
            <StyledText
              as="div"
              variant="label"
            >
              Keywords
            </StyledText>
            {keywords?.join(' ') ?? (
              <span className="italic opacity-60">No Keywords</span>
            )}
          </div>

          <div>
            <StyledText
              as="div"
              variant="label"
            >
              Description
            </StyledText>
            {description ?? (
              <span className="italic opacity-60">No Description</span>
            )}
          </div>

          <StyledText
            as="a"
            href={contentfulURL}
            target="_blank"
            variant="link"
          >
            {matchingRouteMetadata
              ? 'Edit Route Metadata in Contentful'
              : baseRouteMetadata
                ? 'Edit Base Route Metadata in Contentful'
                : 'No Metadata'}
          </StyledText>
        </div>
      </div>
    </div>
  )
}
