import { ImageResponse } from 'next/og'

interface BaseOpenGraphImageProps {
  backgroundImageAbsoluteURL: string
  backgroundImageOnly?: boolean
}

interface TextOpenGraphImageProps extends BaseOpenGraphImageProps {
  backgroundImageOnly?: false
  heading: string
  headingFontSize?: string
  subHeading?: string
  subHeadingFontSize?: string
  superHeading?: string
  superHeadingFontSize?: string
}

interface BackgroundOnlyOpenGraphImageProps extends BaseOpenGraphImageProps {
  backgroundImageOnly: true
}

type OpenGraphImageProps =
  | TextOpenGraphImageProps
  | BackgroundOnlyOpenGraphImageProps

export const alt = 'Blog Post Image'

export const dynamic = 'force-dynamic'

export const size = {
  width: 1200,
  height: 630,
}

export const contentType = 'image/png'

function multiplyStringLength(str: string, multiplier: number) {
  const [, value, unit] = str.match(/([0-9.]+)(.*)/)!
  return `${Math.round(parseFloat(value) * multiplier)}${unit}`
}

async function fetchAsArrayBuffer(url: string) {
  console.log(`[OpenGraphImage] Fetching image from: ${url}`)
  const res = await fetch(url)

  if (!res.ok) {
    console.error(
      `[OpenGraphImage] Failed to fetch image: ${res.status} ${res.statusText}`,
    )
    throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`)
  }

  const arrayBuffer = await res.arrayBuffer()
  console.log(
    `[OpenGraphImage] Successfully fetched image: ${arrayBuffer.byteLength} bytes`,
  )
  return arrayBuffer
}

async function loadFonts() {
  const baseUrl = process.env.NEXT_PUBLIC_URL
  return Promise.all([
    fetchAsArrayBuffer(`${baseUrl}/fonts/Glegoo-Regular.ttf`),
    fetchAsArrayBuffer(`${baseUrl}/fonts/Glegoo-Bold.ttf`),
    fetchAsArrayBuffer(`${baseUrl}/fonts/Inter-Regular.ttf`),
    fetchAsArrayBuffer(`${baseUrl}/fonts/Inter-Bold.ttf`),
  ])
}

function createFontConfig(fonts: ArrayBuffer[]) {
  return [
    {
      name: 'Glegoo',
      data: fonts[0],
      weight: 400 as const,
      style: 'normal' as const,
    },
    {
      name: 'Glegoo',
      data: fonts[1],
      weight: 900 as const,
      style: 'normal' as const,
    },
    {
      name: 'Inter',
      data: fonts[2],
      weight: 400 as const,
      style: 'normal' as const,
    },
    {
      name: 'Inter',
      data: fonts[3],
      weight: 700 as const,
      style: 'normal' as const,
    },
  ]
}

function BackgroundImage({
  imageData,
  withMask = false,
}: {
  imageData: ArrayBuffer
  withMask?: boolean
}) {
  const maskWidth = 150
  const maskHeight = 500

  const baseStyle = {
    height: '100%',
    left: 0,
    objectFit: 'cover' as const,
    position: 'absolute' as const,
    top: 0,
    width: '100%',
  }

  const maskStyle = withMask
    ? {
        maskImage:
          'radial-gradient(circle at 75% 35%, black 0%, black 20%, transparent 50%, transparent 100%)',
        maskSize: `${maskWidth}% ${maskHeight}%`,
        maskPosition: `${100 + (maskWidth - 100) / 2}% ${100 + (maskHeight - 100) / 2}%`,
      }
    : {}

  return (
    <img
      alt={alt}
      // @ts-expect-error Next.js ImageResponse requires ArrayBuffer for src in server components
      src={imageData}
      style={{ ...baseStyle, ...maskStyle }}
    />
  )
}

function TextOverlay({
  superHeading,
  superHeadingFontSize,
  heading,
  headingFontSize,
  subHeading,
  subHeadingFontSize,
}: {
  superHeading?: string
  superHeadingFontSize: string
  heading: string
  headingFontSize: string
  subHeading?: string
  subHeadingFontSize: string
}) {
  const containerStyle = {
    color: 'white',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2rem',
    height: '100%',
    justifyContent: 'flex-end' as const,
    left: 0,
    objectFit: 'cover' as const,
    padding: '3rem',
    position: 'absolute' as const,
    top: 0,
    width: '100%',
  }

  return (
    <div style={containerStyle}>
      {superHeading && (
        <div
          style={{
            color: 'rgba(255, 255, 255, 0.6)',
            fontFamily: 'Inter',
            fontSize: superHeadingFontSize,
            fontWeight: 700,
            lineHeight: multiplyStringLength(superHeadingFontSize, 0.8),
            textTransform: 'uppercase' as const,
          }}
        >
          {superHeading}
        </div>
      )}

      <div
        style={{
          fontSize: headingFontSize,
          fontWeight: 900,
          lineHeight: multiplyStringLength(headingFontSize, 1.1),
        }}
      >
        {heading.replace(/[ ]([^ ]+)$/g, `${String.fromCharCode(160)}$1`)}
      </div>

      {subHeading && (
        <div
          style={{
            color: 'white',
            display: 'flex',
            fontFamily: 'Inter',
            fontSize: subHeadingFontSize,
            fontWeight: 400,
            lineHeight: multiplyStringLength(subHeadingFontSize, 1.2),
            textTransform: 'uppercase' as const,
          }}
        >
          {subHeading}
        </div>
      )}
    </div>
  )
}

function FallbackBackground() {
  return (
    <div
      style={{
        height: '100%',
        width: '100%',
        position: 'absolute' as const,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#0c2d7c',
      }}
    />
  )
}

export async function OpenGraphImage(props: OpenGraphImageProps) {
  const { backgroundImageAbsoluteURL, backgroundImageOnly = false } = props

  console.log(
    `[OpenGraphImage] Starting with backgroundImageOnly=${backgroundImageOnly}`,
  )
  console.log(
    `[OpenGraphImage] backgroundImageAbsoluteURL: ${backgroundImageAbsoluteURL}`,
  )

  let imageData: ArrayBuffer | null = null
  let hasValidImage = false

  try {
    imageData = await fetchAsArrayBuffer(backgroundImageAbsoluteURL)
    hasValidImage = imageData && imageData.byteLength > 0

    if (!hasValidImage) {
      console.warn(
        `[OpenGraphImage] Image data is empty or invalid (byteLength: ${imageData?.byteLength ?? 0})`,
      )
    }
  } catch (error) {
    console.error(`[OpenGraphImage] Error fetching background image:`, error)
  }

  if (hasValidImage && imageData) {
    console.log(`[OpenGraphImage] Rendering with valid image data`)

    if (backgroundImageOnly) {
      return new ImageResponse(<BackgroundImage imageData={imageData} />)
    }

    const {
      heading,
      headingFontSize = '72px',
      subHeading,
      subHeadingFontSize = '48px',
      superHeading,
      superHeadingFontSize = '48px',
    } = props as TextOpenGraphImageProps

    const [glegooRegular, glegooBold, interRegular, interBold] =
      await loadFonts()
    const fonts = createFontConfig([
      glegooRegular,
      glegooBold,
      interRegular,
      interBold,
    ])

    return new ImageResponse(
      (
        <div style={{ backgroundColor: 'black', display: 'flex', ...size }}>
          <BackgroundImage
            imageData={imageData}
            withMask
          />
          <TextOverlay
            superHeading={superHeading}
            superHeadingFontSize={superHeadingFontSize}
            heading={heading}
            headingFontSize={headingFontSize}
            subHeading={subHeading}
            subHeadingFontSize={subHeadingFontSize}
          />
        </div>
      ),
      { ...size, fonts },
    )
  }

  console.log(`[OpenGraphImage] Rendering fallback (no valid image)`)

  const {
    heading,
    headingFontSize = '72px',
    subHeading,
    subHeadingFontSize = '48px',
    superHeading,
    superHeadingFontSize = '48px',
  } = props as TextOpenGraphImageProps

  const [glegooRegular, glegooBold, interRegular, interBold] = await loadFonts()
  const fonts = createFontConfig([
    glegooRegular,
    glegooBold,
    interRegular,
    interBold,
  ])

  return new ImageResponse(
    (
      <div style={{ backgroundColor: 'black', display: 'flex', ...size }}>
        <FallbackBackground />
        <TextOverlay
          superHeading={superHeading}
          superHeadingFontSize={superHeadingFontSize}
          heading={heading}
          headingFontSize={headingFontSize}
          subHeading={subHeading}
          subHeadingFontSize={subHeadingFontSize}
        />
      </div>
    ),
    { ...size, fonts },
  )
}
