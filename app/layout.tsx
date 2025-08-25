import type { Viewport } from 'next'
import { Bitter, Inter } from 'next/font/google'
import { headers } from 'next/headers'
import Script from 'next/script'
import { twJoin } from 'tailwind-merge'
import { SpotCopyProvider } from '../components/Contentful/SpotCopyProvider'
import { ToastContextProvider } from '../components/Toasts'
import { generateMetadataFromContentful } from '../lib/generateMetadataFromContentful'
import { getClassNameFromPathname } from '../lib/getClassNameFromPathname'
import { getContentfulSpotCopy } from '../lib/getContentfulSpotCopy'
import '../styles/global.css'

export async function generateMetadata() {
  return await generateMetadataFromContentful()
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

const bodyFont = Inter({ subsets: ['latin'], variable: '--font-body' })

const displayFont = Bitter({
  subsets: ['latin'],
  variable: '--font-display',
  weight: '500',
  style: ['normal', 'italic'],
})

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const { spotCopy } = await getContentfulSpotCopy()
  const headersList = await headers()
  const pathname = headersList.get('x-pathname') || '/'
  const routeClassName = getClassNameFromPathname(pathname, {
    '/': 'theme-informal',
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
