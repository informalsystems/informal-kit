import Image from 'next/image'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { BlackColorAdjustmentLayer } from './BlackColorAdjustmentLayer'
import { Marquee } from './Marquee'

interface LogoMarqueeProps
  extends Omit<ComponentProps<'div'>, 'children'>,
    ComponentProps<typeof BlackColorAdjustmentLayer> {
  logos: {
    height: number
    title: string
    url: string
    width: number
  }[]
}

export function LogoMarquee({
  className,
  logos,
  variant = 'blue',
  ...otherProps
}: LogoMarqueeProps) {
  return (
    <div
      className={twMerge('relative', className)}
      {...otherProps}
    >
      <Marquee className="flex h-full w-full items-center gap-12">
        {logos.map(({ height, title, url, width }, index) => {
          const aspectRatio = width / height
          return (
            <BlackColorAdjustmentLayer
              variant={variant}
              key={index}
              className="shrink-0"
              style={{
                height: '60px',
                width: `${aspectRatio * 60}px`,
              }}
            >
              <Image
                alt={`Logo for ${title}`}
                height={height}
                sizes="(max-width: 768px) 30vw, 120px"
                src={url}
                style={{
                  height: '60px',
                  width: `${aspectRatio * 60}px`,
                }}
                width={width}
              />
            </BlackColorAdjustmentLayer>
          )
        })}
      </Marquee>
    </div>
  )
}
