import Image from 'next/image'
import { ComponentProps } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'
import { distributeEvenly } from '../lib/distributeEvenly'
import { SpotCopy } from './Contentful/SpotCopy'
import { Flipper } from './Flipper'
import { ImagePreloader } from './ImagePreloader'

export function LogoFlipper({
  className,
  ...otherProps
}: Omit<ComponentProps<'div'>, 'children'>) {
  return (
    <SpotCopy
      path="informal/security/home/intro"
      className={twMerge(
        `
          relative
          order-first
          flex
          sm:order-0
        `,
        className,
      )}
      {...otherProps}
    >
      {({ media }) => {
        const chunkedLogos = distributeEvenly(media ?? [], 4)

        return (
          <div
            className="
              flex
              gap-6
              sm:absolute
              sm:top-1/2
              sm:left-1/2
              sm:grid
              sm:size-40
              sm:-translate-x-1/2
              sm:-translate-y-1/2
              sm:grid-cols-2
              sm:grid-rows-2
              sm:gap-8
            "
          >
            {chunkedLogos.map((logos, stackIndex) => (
              <div
                key={stackIndex}
                className={twJoin(
                  'relative',
                  'sm:even:translate-y-1/2',
                  'h-16 w-16 sm:h-auto sm:w-auto',
                )}
              >
                <Flipper
                  showFor={4000}
                  initialDelay={stackIndex * 150}
                  fadeInDuration={150}
                  fadeOutDuration={150}
                  items={logos.map((logo, logoIndex) => (
                    <div
                      key={logoIndex}
                      className={twMerge(
                        'absolute size-16 p-3 shadow-2xl',
                        'rounded-xl bg-white',
                      )}
                    >
                      <div className="absolute inset-3">
                        <Image
                          alt={`Logo for ${logo.title}`}
                          fill={true}
                          sizes="(max-width: 768px) 30vw, 120px"
                          src={logo.url}
                        />
                      </div>
                    </div>
                  ))}
                />
              </div>
            ))}

            <ImagePreloader
              images={
                media?.map(logo => ({
                  alt: logo.title,
                  src: logo.url,
                })) ?? []
              }
              sizes="(max-width: 768px) 30vw, 120px"
            />
          </div>
        )
      }}
    </SpotCopy>
  )
}
