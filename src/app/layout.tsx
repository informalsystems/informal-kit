import { SiteContextProvider } from '@/components'
import { ToastContextProvider } from '@/components/Toasts'
import { generateMetadataFromContentful } from '@/lib/generateMetadataFromContentful'
import { getEditableContentFromContentful } from '@/lib/getEditableContentFromContentful'
import type { Viewport } from 'next'
import { Glegoo, Inter } from 'next/font/google'
import Script from 'next/script'
import { CSSProperties } from 'react'
import { twJoin } from 'tailwind-merge'
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
}: Readonly<{ children: React.ReactNode }>) {
  const { editableContent } = await getEditableContentFromContentful()

  return (
    <SiteContextProvider editableContent={editableContent}>
      <html
        lang="en"
        style={{ '--text-color': 'var(--color-text-color)' } as CSSProperties}
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
              text-textColor
              min-h-screen
              overflow-x-hidden
            `,
          )}
        >
          <ToastContextProvider>{children}</ToastContextProvider>
        </body>
      </html>
    </SiteContextProvider>
  )
}
