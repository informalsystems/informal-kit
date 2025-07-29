import type { Viewport } from 'next'
import { Bitter, Inter } from 'next/font/google'
import Script from 'next/script'
import { twJoin } from 'tailwind-merge'
import { SpotCopyProvider } from '../components/Contentful/SpotCopyProvider'
import { ToastContextProvider } from '../components/Toasts'
import { generateMetadataFromContentful } from '../lib/generateMetadataFromContentful'
import { getContentfulSpotCopy } from '../lib/getContentfulSpotCopy'
import { getRouteClassName } from '../lib/useRouteClassName'
import './styles/global.css'

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

const displayFont = Bitter({
  subsets: ['latin'],
  variable: '--font-bitter',
  weight: '500',
  style: ['normal', 'italic'],
})

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { spotCopy } = await getContentfulSpotCopy()
  const routeClassName = await getRouteClassName({
    routeClassMap: {
      '/mtcs': 'theme-mtcs',
      '/prime': 'theme-prime',
      '/quartz': 'theme-quartz',
      '/': 'theme-informal',
    },
  })

  return (
    <SpotCopyProvider spotCopy={spotCopy}>
      <html
        lang="en"
        className={routeClassName}
      >
        <head>
          <Script
            crossOrigin="anonymous"
            src="https://kit.fontawesome.com/ddaf2d7713.js"
            strategy="afterInteractive"
          />
        </head>

        <body
          className={twJoin(
            bodyFont.className,
            bodyFont.variable,
            displayFont.variable,
            `overflow-x-hidden`,
          )}
        >
          <ToastContextProvider>{children}</ToastContextProvider>
        </body>
      </html>
    </SpotCopyProvider>
  )
}
