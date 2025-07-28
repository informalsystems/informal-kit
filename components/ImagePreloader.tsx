import Image from 'next/image'
import { memo } from 'react'

export const ImagePreloader = memo(
  function ImagePreloader({
    images,
    sizes,
  }: {
    images: {
      alt: string
      src: string
    }[]
    sizes: string
  }) {
    return (
      <div
        className="
          fixed
          left-[-9999px]
          top-0
          h-screen
          w-screen
          opacity-0
        "
      >
        {images.map(({ alt, src }, index) => (
          <Image
            alt={alt}
            fill={true}
            key={index}
            priority={true}
            sizes={sizes}
            src={src}
          />
        ))}
      </div>
    )
  },
  (prevProps, nextProps) => {
    // Custom comparison function to check if the image arrays are equivalent
    if (prevProps.images.length !== nextProps.images.length) {
      return false
    }

    return prevProps.images.every((prevImage, index) => {
      const nextImage = nextProps.images[index]
      return prevImage.src === nextImage.src && prevImage.alt === nextImage.alt
    })
  },
)
