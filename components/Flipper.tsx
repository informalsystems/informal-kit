import { ReactNode, useMemo } from 'react'

interface FlipperProps {
  showFor: number // ms the element is "revealed" (e.g. 4000ms)
  items: ReactNode[] // list of items to animate
  initialDelay?: number // delay (ms) before the list starts animating
  fadeInDuration?: number // duration (ms) of the fade in
  fadeOutDuration?: number // duration (ms) of the fade out
}

export function Flipper({
  showFor,
  items,
  initialDelay = 0,
  fadeInDuration = showFor * 0.1,
  fadeOutDuration = fadeInDuration,
}: FlipperProps) {
  const totalCycle = items.length * showFor
  const activeWindowPercent = 100 / items.length
  const fadeInPercent = (fadeInDuration / showFor) * activeWindowPercent
  const fadeOutStartPercent =
    ((showFor - fadeOutDuration) / showFor) * activeWindowPercent

  const animationName = useMemo(
    () => `flipperAnimation-${showFor}-${initialDelay}-${items.length}`,
    [showFor, initialDelay, items.length],
  )

  const keyframes = `
    @keyframes ${animationName} {
      0% { opacity: 0; transform: rotateY(-90deg); }
      ${fadeInPercent}% { opacity: 1; transform: rotateY(0); }
      ${fadeOutStartPercent}% { opacity: 1; transform: rotateY(0); }
      ${activeWindowPercent}% { opacity: 0; transform: rotateY(90deg); }
      100% { opacity: 0; transform: rotateY(90deg); }
    }
  `

  return (
    <>
      <style type="text/css">{keyframes}</style>

      {items.map((item, index) => {
        const delay = initialDelay - index * showFor
        return (
          <div
            key={index}
            style={{
              animationName,
              animationDuration: `${totalCycle}ms`,
              animationTimingFunction: 'linear',
              animationIterationCount: 'infinite',
              animationDelay: `${delay}ms`,
              animationFillMode: 'both',
            }}
          >
            {item}
          </div>
        )
      })}
    </>
  )
}
