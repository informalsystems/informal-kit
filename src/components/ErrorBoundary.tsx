'use client'

import { Icon } from '@/components/Icon'
import { SiteContentContainer } from '@/components/SiteContentContainer'
import { ReactNode } from 'react'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'

export function ErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ReactErrorBoundary
      fallbackRender={({ error }) => (
        <SiteContentContainer className="flex min-h-[80vh] flex-col items-center justify-center gap-12 pt-40!">
          <div className="flex items-end gap-6">
            <Icon
              name="duotone:truck-fire"
              className="text-8xl text-red-500"
            />
            <Icon
              name="duotone:fire"
              className="text-6xl text-orange-400"
            />
          </div>

          <p>Uh oh. Something on this page blew up. Please let someone know!</p>

          <p className="w-full overflow-x-auto whitespace-pre-wrap rounded-md border p-6 font-mono">
            {error.message}
          </p>
        </SiteContentContainer>
      )}
    >
      {children}
    </ReactErrorBoundary>
  )
}
