import Link from 'next/link'
import React, { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { BlogPost } from '../lib/types'
import { PostCardOptions } from './BlogPostCard'
import { ConditionalWrapper } from './ConditionalWrapper'
import { Icon } from './Icon'

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
  const renderedAuthors =
    post.authors &&
    post.authors.length > 0 &&
    post.authors.map((author, index) => (
      <span
        key={author}
        className="inline-block whitespace-pre"
      >
        {author}
        {index < post.authors.length - 2 && ', '}
        {index === post.authors.length - 2 &&
          (post.authors.length === 2 ? <> and </> : <>, and </>)}
      </span>
    ))

  const renderedDate = post.date && (
    <span className="inline-block">
      {post.date &&
        new Date(post.date).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })}
    </span>
  )

  const renderedCategories =
    cardOptions?.showCategories &&
    post.categories &&
    post.categories.length > 0 &&
    post.categories.map((category, index) => (
      <span
        key={category}
        className="inline-block"
      >
        <ConditionalWrapper
          condition={index === 0}
          wrapper={children => (
            <span className="**:text-theme-brand-color">
              <Icon
                name="tag"
                variant="solid"
                className="mr-1"
              />
              {children}
            </span>
          )}
        >
          <Link href={`/blog/category/${category}`}>{category}</Link>
        </ConditionalWrapper>
        {index < post.categories.length - 2 && <>,&nbsp;</>}
        {index === post.categories.length - 2 &&
          (post.categories.length === 2 ? <> and&nbsp;</> : <>, and&nbsp;</>)}
      </span>
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
      {[renderedAuthors, renderedDate, renderedCategories]
        .filter(Boolean)
        .map((renderedBit, index, array) => (
          <React.Fragment key={index}>
            {index > 0 && <span className="mx-2">•</span>}
            {renderedBit}
          </React.Fragment>
        ))}
    </div>
  )
}
