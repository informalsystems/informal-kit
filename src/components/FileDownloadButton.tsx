'use client'

import { ComponentProps, ElementType } from 'react'
import { twMerge } from 'tailwind-merge'
import { Icon, IconString } from './Icon'

type FileDownloadButtonProps<T extends ElementType = 'button'> = Omit<
  ComponentProps<T>,
  'children'
> & {
  as?: T
  contentType: SupportedContentType
  size: number
  title: string
  url: string
}

interface ContentTypeIconDescriptor {
  className: string
  extension: string | null
  iconName: IconString
}

type SupportedContentType = keyof typeof contentTypeIconMap

const contentTypeIconMap = {
  'DEFAULT': {
    className: 'text-neutral-500',
    extension: null,
    iconName: 'file',
  },

  'application/pdf': {
    className: 'text-red-600',
    extension: 'pdf',
    iconName: 'file-pdf',
  },
} satisfies Record<string, ContentTypeIconDescriptor>

export function FileDownloadButton<T extends ElementType = 'button'>({
  as,
  className,
  contentType,
  size,
  title,
  url,
  ...otherProps
}: FileDownloadButtonProps<T>) {
  const Component = String(as || 'button') as ElementType

  const {
    className: iconClassName,
    extension,
    iconName = 'file',
  } = contentTypeIconMap[contentType]

  return (
    <Component
      className={twMerge(
        `
          border-opacity-20
          shadow-brandColor/5
          hover:bg-shadedBgColor
          my-12
          flex
          w-full
          cursor-pointer
          items-center
          justify-between
          gap-3
          rounded-md
          border-2
          border-inherit
          bg-white
          py-3
          pr-6
          pl-3
          whitespace-nowrap
          no-underline
          shadow-xl
          transition-all
        `,
        iconClassName,
        className,
      )}
      onClick={() => {
        window.open(url, '_blank')
      }}
      {...otherProps}
    >
      <div className="flex items-center gap-3">
        <Icon
          className="text-2xl"
          name={iconName}
        />

        <div className="font-bold">
          {title}
          {extension && <>.{extension}</>}
        </div>
      </div>

      <div className="flex items-center gap-1 text-xs">
        <Icon name="download" />
        <span className="underline">Download</span>

        <div className="text-neutral-400">({(size / 1024).toFixed(2)} kb)</div>
      </div>
    </Component>
  )
}
