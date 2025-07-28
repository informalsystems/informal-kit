import Image from 'next/image'
import { ComponentProps, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'
import { SpotCopy } from './Contentful/SpotCopy'
import { MediaDescriptor } from './SiteContextProvider'

interface LogoGridProps extends Omit<ComponentProps<'div'>, 'children'> {
  path: string
  renderLogo: (renderProps: MediaDescriptor & { node: ReactNode }) => ReactNode
}

export function LogoGrid({
  className,
  path,
  renderLogo,
  ...otherProps
}: LogoGridProps) {
  return (
    <SpotCopy
      path={path}
      disableEditing={true}
      {...otherProps}
    >
      {({ media }) => (
        <ul
          className={twMerge(
            `
              grid
              grid-cols-2
              place-items-center
              gap-x-12
              gap-y-6
              md:grid-cols-3
              lg:grid-cols-5
            `,
            className,
          )}
        >
          {media?.map(({ height, title, url, width, ...rest }, index) => {
            const node = (
              <Image
                alt={`Logo for ${title}`}
                height={height}
                sizes="(max-width: 768px) 30vw, 120px"
                src={url}
                style={{
                  height: '60px',
                  width: 'auto',
                }}
                width={width}
              />
            )

            return (
              <li key={index}>
                {renderLogo({
                  ...rest,
                  height,
                  node,
                  title,
                  url,
                  width,
                })}
              </li>
            )
          })}
        </ul>
      )}
    </SpotCopy>
  )
}
