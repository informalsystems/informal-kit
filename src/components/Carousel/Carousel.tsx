'use client'

import { Contentful, Icon, StyledText } from '@/components'
import { ReactNode, useEffect, useState } from 'react'
import { classNames } from './classNames'

interface CarouselProps {
  media: {
    node: ReactNode
    description: string
  }[]
  transitionDuration?: number
  autoPlayInterval?: number
}

export function Carousel({
  autoPlayInterval = 5000,
  media,
  transitionDuration = 700,
}: CarouselProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0)
  const [isAutoPlaying, setIsAutoPlaying] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)

  const [images, descriptions] = media.reduce(
    ([images, descriptions], { node, description }, currentIndex) => [
      [...images, node],
      [...descriptions, description || `Image ${currentIndex + 1}`],
    ],
    [[], []] as [ReactNode[], string[]],
  )

  const showNext = () =>
    setActiveImageIndex(index => (index + 1) % images.length)

  const showPrevious = () =>
    setActiveImageIndex(index => (index - 1 + images.length) % images.length)

  const handleClickNext = () => {
    setIsAutoPlaying(false)
    showNext()
  }

  const handleClickPrevious = () => {
    setIsAutoPlaying(false)
    showPrevious()
  }

  useEffect(() => {
    if (isAutoPlaying) {
      const interval = setInterval(showNext, autoPlayInterval)
      return () => clearInterval(interval)
    }
  }, [isAutoPlaying])

  useEffect(() => {
    setIsTransitioning(true)

    const timer = setTimeout(() => {
      setIsTransitioning(false)
    }, transitionDuration)

    return () => clearTimeout(timer)
  }, [activeImageIndex, isAutoPlaying])

  return (
    <div className={classNames.container}>
      <div className={classNames.descriptionAndButtonsContainer}>
        <div>
          <Contentful.EditableContent.Body
            disableEditing={true}
            headingLevel={2}
            path="informal/about/meet-the-team"
          />

          <div className={classNames.description({ isActive: true })}>
            {descriptions[activeImageIndex]}
          </div>
        </div>

        <div className={classNames.slideControlsContainer}>
          <StyledText
            role="button"
            variant="link"
            onClick={handleClickPrevious}
          >
            <Icon name="arrow-left-long" />
            <span className="sr-only">Previous</span>
          </StyledText>

          <StyledText
            role="button"
            variant="link"
            onClick={() => setIsAutoPlaying(isAutoPlaying => !isAutoPlaying)}
          >
            <Icon
              className={classNames.playPauseIcon({ isAutoPlaying })}
              name={isAutoPlaying ? 'pause' : 'play'}
              variant="sharp-solid"
            />
            <span className="sr-only">{isAutoPlaying ? 'Pause' : 'Play'}</span>
          </StyledText>

          <StyledText
            role="button"
            variant="link"
            onClick={handleClickNext}
          >
            <span className="sr-only">Next</span>
            <Icon name="arrow-right-long" />
          </StyledText>

          <StyledText
            className={classNames.progressText({ isTransitioning })}
            style={{
              transitionDuration: `${transitionDuration}ms`,
            }}
            variant="label"
          >
            {activeImageIndex + 1} of {images.length}
          </StyledText>

          <div className={classNames.progressBarContainer({ isAutoPlaying })}>
            <div
              className={classNames.progressBar}
              style={{
                transitionDuration: `${isTransitioning ? 0 : autoPlayInterval - transitionDuration}ms`,
                width: isTransitioning ? '0' : '100%',
              }}
            />
          </div>
        </div>
      </div>

      <div
        className={classNames.imagesContainer}
        style={{
          marginLeft: `calc((8rem + 1.5rem) * ${activeImageIndex} * -1)`,
          transitionDuration: `${transitionDuration}ms`,
        }}
      >
        {images.map((image, index) => (
          <div
            className={classNames.imageContainer({
              isActive: index === activeImageIndex,
            })}
            key={index}
            style={{
              transitionDuration: `${transitionDuration}ms`,
            }}
            onClick={setActiveImageIndex.bind(null, index)}
          >
            {image}
          </div>
        ))}
      </div>
    </div>
  )
}
