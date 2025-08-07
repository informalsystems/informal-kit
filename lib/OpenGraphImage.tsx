import { ImageResponse } from 'next/og'

interface OpenGraphImageProps {
  backgroundImageAbsoluteURL: string
  heading: string
  headingFontSize?: string
  subHeading?: string
  subHeadingFontSize?: string
  superHeading?: string
  superHeadingFontSize?: string
}

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
  return await fetch(url).then(res => res.arrayBuffer())
}

export async function OpenGraphImage({
  backgroundImageAbsoluteURL,
  heading,
  headingFontSize = '72px',
  subHeading,
  subHeadingFontSize = '48px',
  superHeading,
  superHeadingFontSize = '48px',
}: OpenGraphImageProps) {
  const glegooRegular = fetchAsArrayBuffer(
    `${process.env.NEXT_PUBLIC_URL}/fonts/Glegoo-Regular.ttf`,
  )
  const glegooBold = fetchAsArrayBuffer(
    `${process.env.NEXT_PUBLIC_URL}/fonts/Glegoo-Bold.ttf`,
  )
  const interRegular = fetchAsArrayBuffer(
    `${process.env.NEXT_PUBLIC_URL}/fonts/Inter-Regular.ttf`,
  )
  const interBold = fetchAsArrayBuffer(
    `${process.env.NEXT_PUBLIC_URL}/fonts/Inter-Bold.ttf`,
  )

  const maskWidth = 150 // %
  const maskHeight = 500 // %

  const imageData = await fetchAsArrayBuffer(backgroundImageAbsoluteURL)

  return new ImageResponse(
    (
      <div style={{ backgroundColor: 'black', display: 'flex', ...size }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          alt={alt}
          // @ts-expect-error Next.js ImageResponse requires ArrayBuffer for src in server components
          src={imageData}
          style={{
            height: '100%',
            left: 0,
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            width: '100%',
            maskImage:
              'radial-gradient(circle at 75% 35%, black 0%, black 20%, transparent 50%, transparent 100%)',
            maskSize: `${maskWidth}% ${maskHeight}%`,
            maskPosition: `${100 + (maskWidth - 100) / 2}% ${100 + (maskHeight - 100) / 2}%`,
          }}
        />

        <div
          style={{
            color: 'white',
            display: 'flex',
            flexDirection: 'column',
            gap: '2rem',
            height: '100%',
            justifyContent: 'flex-end',
            left: 0,
            objectFit: 'cover',
            padding: '3rem',
            position: 'absolute',
            top: 0,
            width: '100%',
          }}
        >
          {superHeading && (
            <div
              style={{
                color: 'rgba(255, 255, 255, 0.6)',
                fontFamily: 'Inter',
                fontSize: superHeadingFontSize,
                fontWeight: 700,
                lineHeight: multiplyStringLength(superHeadingFontSize, 0.8),
                textTransform: 'uppercase',
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
                textTransform: 'uppercase',
              }}
            >
              {subHeading}
            </div>
          )}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: 'Glegoo',
          data: await glegooRegular,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Glegoo',
          data: await glegooBold,
          weight: 900,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: await interRegular,
          weight: 400,
          style: 'normal',
        },
        {
          name: 'Inter',
          data: await interBold,
          weight: 700,
          style: 'normal',
        },
      ],
    },
  )
}
