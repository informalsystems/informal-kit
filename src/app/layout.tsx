import { SiteContextProvider } from '@/components'
import { generateMetadataFromContentful } from '@/lib/generateMetadataFromContentful'
import { getContentfulSpotCopy } from '@/lib/getContentfulSpotCopy'
import type { Viewport } from 'next'
import { Glegoo, Inter } from 'next/font/google'
import Script from 'next/script'
import { CSSProperties } from 'react'
import { twJoin } from 'tailwind-merge'
import { sitePalette } from '../../tailwind.config'
import './global.css'

export async function generateMetadata() {
  return await generateMetadataFromContentful()
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

const bodyFont = Inter({ subsets: ['latin'], variable: '--font-inter' })

const displayFont = Glegoo({
  subsets: ['latin'],
  variable: '--font-glegoo',
  weight: ['400', '700'],
})

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { spotCopy } = await getContentfulSpotCopy('informal/')

  return (
    <SiteContextProvider spotCopy={spotCopy}>
      <html
        lang="en"
        style={
          {
            '--text-color': sitePalette.brand[500],
          } as CSSProperties
        }
      >
        <head>
          <Script
            crossOrigin="anonymous"
            src="https://kit.fontawesome.com/401fb1e734.js"
          />
        </head>

        <body
          className={twJoin(
            bodyFont.className,
            bodyFont.variable,
            displayFont.variable,
            `
              overflow-x-hidden
              text-textColor
            `,
          )}
        >
          {children}
        </body>
      </html>
    </SiteContextProvider>
  )
}
