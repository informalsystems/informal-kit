import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import Link from 'next/link'
import React, { ComponentProps } from 'react'
import readingTime from 'reading-time'
import { twMerge } from 'tailwind-merge'
import { pluralize } from '../lib/pluralize'
import { BlogPost } from '../lib/types'
import { PostCardOptions } from './BlogPostCard'

interface BlogPostMetaDataProps
  extends Omit<ComponentProps<'div'>, 'children'> {
  post: BlogPost
  cardOptions?: PostCardOptions
}

export function BlogPostMetaData({
  className,
  post,
  cardOptions,
  ...otherProps
}: BlogPostMetaDataProps) {
  const bodyAsHtml = documentToHtmlString(post.body!)
  const { text, time, words, minutes } = readingTime(bodyAsHtml)

  const renderedTimeToRead =
    minutes > 0 ? (
      <span
        key="timeToRead"
        className="whitespace-nowrap"
      >
        {pluralize({
          count: Math.round(minutes),
          singular: 'minute',
          prefixCount: true,
        })}
        {cardOptions?.showCategories && (
          <React.Fragment key="categoriesSeparator">&nbsp;• </React.Fragment>
        )}
      </span>
    ) : null

  const renderedAuthors = !post.authors ? null : (
    <React.Fragment key="authors">
      {post.authors.join(', ')}&nbsp;•{' '}
    </React.Fragment>
  )

  const renderedDate = !post.date ? null : (
    <React.Fragment key="date">
      {new Date(post.date).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })}
      &nbsp;•{' '}
    </React.Fragment>
  )

  const renderedCategories =
    !cardOptions?.showCategories || !post.categories
      ? null
      : post.categories.map((category, index) => (
          <React.Fragment key={category}>
            {!!index && ', '}
            <Link
              href={`/blog/category/${category.toLowerCase()}`}
              className="text-theme-accent-color relative z-20"
            >
              {category}
            </Link>
          </React.Fragment>
        ))

  return (
    <div
      className={twMerge(
        'footnote max-w-[64ch]',
        'font-medium',
        cardOptions?.classNameForMetadata,
        className,
      )}
      {...otherProps}
    >
      {[
        renderedAuthors,
        renderedDate,
        renderedTimeToRead,
        renderedCategories,
      ].filter(Boolean)}
    </div>
  )
}
