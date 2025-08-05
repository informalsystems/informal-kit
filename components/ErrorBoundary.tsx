'use client'

import { ReactNode } from 'react'
import { ErrorBoundary as ReactErrorBoundary } from 'react-error-boundary'
import { twJoin } from 'tailwind-merge'
import { Icon } from './Icon'
export function ErrorBoundary({ children }: { children: ReactNode }) {
  return (
    <ReactErrorBoundary
      fallbackRender={({ error }) => (
        <section
          className={twJoin(
            'site-content-container',
            'min-h-[80vh]',
            'flex flex-col items-center justify-center',
            'gap-12',
            '!pt-40',
          )}
        >
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

          <p className="w-full overflow-x-auto rounded-md border p-6 font-mono whitespace-pre-wrap">
            {error.message}
          </p>
        </section>
      )}
    >
      {children}
    </ReactErrorBoundary>
  )
}
