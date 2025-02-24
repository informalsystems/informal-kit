'use client'

import { Atom } from '@/components/Atom'
import { CollapsibleBox } from '@/components/CollapsibleBox'
import { Icon } from '@/components/Icon'
import { Input } from '@/components/Input'
import { getContentfulRouteMetadata } from '@/lib/getContentfulRouteMetadata'
import { usePathname } from 'next/navigation'
import { ChangeEvent, ComponentProps, useEffect, useState } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'
import invariant from 'tiny-invariant'
import { useLocalStorage } from 'usehooks-ts'

interface GlobalToolsProps extends ComponentProps<'div'> {}

export function GlobalTools({ className, ...otherProps }: GlobalToolsProps) {
  invariant(process.env.NEXT_PUBLIC_URL, 'Missing NEXT_PUBLIC_URL')

  const [isExpanded, setIsExpanded] = useState(false)

  const [isHoverToEditEnabled, setIsHoverToEditEnabled] =
    useLocalStorage<boolean>('isHoverToEditEnabled', true)

  const [metadata, setMetadata] = useState<Awaited<
    ReturnType<typeof getContentfulRouteMetadata>
  > | null>(null)

  const pathname = usePathname()
  const transition = 'transition-all duration-200 ease-in-out'
  const transitionDelay = 'delay-200'
  const buttonSize = 'size-8'

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

  function handleChangeHoverToEdit(
    value: boolean,
    event: ChangeEvent<HTMLInputElement>,
  ) {
    if (event.target.checked === true) {
      setIsHoverToEditEnabled(value)
    }
  }

  return (
    <div
      className={twMerge(
        'z-20',
        'inverted fixed right-6 bottom-6',
        'bg-brand-500/95 text-base text-white backdrop-blur-md',
        transition,
        isExpanded
          ? ['w-96 rounded-md', 'border-2 border-white']
          : [transitionDelay, 'w-8 rounded-full'],
        className,
      )}
      {...otherProps}
    >
      <button
        id="global-tools-button"
        title={isExpanded ? 'Hide Page Options' : 'Show Page Options'}
        className={twMerge(
          'flex items-center justify-center',
          'rounded-full border-2',
          buttonSize,
          transition,
          isExpanded
            ? [
                '-mt-4 ml-96 -translate-x-1/2 rotate-180',
                'border-brand-500 text-brand-500 bg-white',
              ]
            : [transitionDelay, 'rotate-0 border-white'],
        )}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <Icon name={isExpanded ? 'solid:xmark' : 'solid:gear'} />
        <span className="sr-only">{isExpanded ? 'Hide' : 'Show'} Metadata</span>
      </button>

      <CollapsibleBox
        className={twJoin(transition, isExpanded && ['-mt-1', transitionDelay])}
        isCollapsed={!isExpanded}
      >
        <div className="flex flex-col gap-3 p-3 pt-0">
          {(
            [
              [
                'Hover to Edit?',
                <div className="flex items-center gap-3 py-1 text-xs">
                  <label className="flex items-center gap-1">
                    <Input
                      type="radio"
                      name="isHoverToEditEnabled"
                      value="false"
                      checked={isHoverToEditEnabled === false}
                      onChange={handleChangeHoverToEdit.bind(null, false)}
                    />
                    <span>Off</span>
                  </label>

                  <label className="flex items-center gap-1">
                    <Input
                      type="radio"
                      name="isHoverToEditEnabled"
                      value="true"
                      checked={isHoverToEditEnabled === true}
                      onChange={handleChangeHoverToEdit.bind(null, true)}
                    />
                    <span>On</span>
                  </label>
                </div>,
              ],
              ['Meta Title', title],
              [
                'Meta Keywords',
                keywords && keywords.length > 0 ? (
                  keywords.join(' ')
                ) : (
                  <span className="italic opacity-60">No Keywords</span>
                ),
              ],
              [
                'Meta Description',
                description ?? (
                  <span className="italic opacity-60">No Description</span>
                ),
              ],
            ] as const
          ).map(([label, value], index) => (
            <div
              key={label}
              className={'flex flex-col gap-1'}
            >
              <div className="text-faded-text-colorInDarkMode text-xs">
                {label}
              </div>
              <div className="pl-3 text-xs">{value}</div>
            </div>
          ))}

          <div className="flex flex-row-reverse gap-2">
            <Atom
              as="a"
              href={contentfulURL}
              target="_blank"
              variant="button.primary"
            >
              <span>
                {matchingRouteMetadata || baseRouteMetadata
                  ? 'Edit in Contentful'
                  : 'No Metadata'}
              </span>
              <Icon name="regular:arrow-up-right-from-square" />
            </Atom>

            <Atom
              as="button"
              variant="button.secondary"
              onClick={() => setIsExpanded(false)}
            >
              Close
            </Atom>
          </div>
        </div>
      </CollapsibleBox>
    </div>
  )
}
