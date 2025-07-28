import { PostCardOptions } from './BlogPostCard'
import { ConditionalWrapper } from './ConditionalWrapper'
import { Icon } from './Icon'
import { OrphanController } from './OrphanController'

import Link from 'next/link'
import { ComponentProps } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'
import { BlogPost } from '../lib/types'

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
  const formatAuthors = (authors: string[]) => {
    if (!authors || authors.length === 0) return ''
    if (authors.length === 1) return authors[0]
    if (authors.length === 2) return `${authors[0]} and ${authors[1]}`
    return (
      <>
        {authors.slice(0, -1).join(', ')}, and {authors[authors.length - 1]}
      </>
    )
  }

  return (
    <div
      className={twMerge(
        'footnote',
        'font-medium',
        cardOptions?.classNameForMetadata,
        className,
      )}
      {...otherProps}
    >
      {post.authors && post.authors.length > 0 && (
        <OrphanController
          as="span"
          className={twJoin(
            'after:mx-2',
            'after:content-["•"]',
            'last:after:content-none',
          )}
          disabledInPortrait={false}
        >
          {formatAuthors(post.authors)}
        </OrphanController>
      )}
      {post.date && (
        <span
          className={twJoin(
            'whitespace-nowrap',
            'after:mx-2',
            'after:content-["•"]',
            'last:after:content-none',
          )}
        >
          {post.date &&
            new Date(post.date).toLocaleDateString('en-US', {
              year: 'numeric',
              month: 'long',
              day: 'numeric',
            })}
        </span>
      )}
      {cardOptions?.showCategories &&
        post.categories &&
        post.categories.length > 0 &&
        post.categories.map((category, index) => (
          <span key={category}>
            <ConditionalWrapper
              condition={index === 0}
              wrapper={children => (
                <span className="**:text-theme-accent-color whitespace-nowrap">
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
            {index < post.categories.length - 2 && ', '}
            {index === post.categories.length - 2 &&
              (post.categories.length === 2 ? (
                <> and&nbsp;</>
              ) : (
                <>, and&nbsp;</>
              ))}
          </span>
        ))}
    </div>
  )
}
