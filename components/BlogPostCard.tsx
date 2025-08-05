import { BlogPostMetaData } from './BlogPostMetaData'
import { ContentfulContentRenderer, ContentfulHoverTools } from './Contentful'
import { Icon } from './Icon'

import Image from 'next/image'
import Link from 'next/link'
import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { getBlogPostImageURL } from '../lib/getBlogPostImageURL'
import { BlogPost } from '../lib/types'

interface PostCardProps extends Omit<ComponentProps<'article'>, 'children'> {
  post: BlogPost
  cardOptions?: PostCardOptions
}

export interface PostCardOptions {
  className?: string
  classNameForExternalLinkIcon?: string
  classNameForMetadata?: string
  classNameForTitle?: string
  linkPrefix?: string
  propsForCardSurface?: ComponentProps<'a'>
  showCategories?: boolean
  showImage?: boolean
}

const defaultCardOptions: PostCardOptions = {
  className: '',
  classNameForExternalLinkIcon: '',
  classNameForMetadata: '',
  classNameForTitle: '',
  propsForCardSurface: {},
  showCategories: true,
  showImage: true,
}

export function BlogPostCard({
  className,
  post,
  cardOptions: userCardOptions,
  ...otherProps
}: PostCardProps) {
  const featureImageURL = getBlogPostImageURL(post)

  const cardOptions = Object.assign({}, defaultCardOptions, userCardOptions)

  const {
    classNameForExternalLinkIcon,
    classNameForTitle,
    linkPrefix,
    propsForCardSurface,
    showImage,
  } = cardOptions

  const {
    className: propsForCardSurfaceClassName,
    ...restOfPropsForCardSurface
  } = propsForCardSurface ?? {}

  return (
    <article
      className={twMerge(
        'group/card relative flex flex-col gap-3',
        cardOptions.className,
        className,
      )}
      {...otherProps}
    >
      {showImage && (
        <div className="relative aspect-video w-full overflow-hidden rounded-md">
          <Image
            src={featureImageURL}
            alt="Decorative Background Image"
            fill={true}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            objectFit="cover"
          />
        </div>
      )}

      <h3
        className={twMerge(
          'h4',
          'group-hover/card:text-accent-teal',
          'font-bold',
          classNameForTitle,
        )}
      >
        {post.title}
      </h3>

      <div className="line-clamp-3">
        <ContentfulContentRenderer content={post.excerpt} />
      </div>

      <BlogPostMetaData
        post={post}
        cardOptions={cardOptions}
      />

      <Link
        className={twMerge(
          'group hover:bg-accent-teal/5 absolute -inset-3 z-10 rounded-xl',
          propsForCardSurfaceClassName,
        )}
        href={`${linkPrefix ?? ''}/blog/${post.slug}`}
        {...restOfPropsForCardSurface}
      >
        <ContentfulHoverTools
          className="absolute inset-0"
          contentfulURL={post.contentfulURL}
        >
          <span className="sr-only">Read Post</span>
        </ContentfulHoverTools>

        {propsForCardSurface?.target === '_blank' && (
          <span
            className={twMerge(
              'absolute top-0 right-0 size-6',
              'translate-x-1/2 -translate-y-1/2',
              'flex items-center justify-center',
              'text-theme-brand-color rounded-full bg-white text-xs',
              'opacity-0 transition-opacity',
              'group-hover:opacity-100',
              classNameForExternalLinkIcon,
            )}
          >
            <Icon name="arrow-up-right-from-square" />
          </span>
        )}
      </Link>
    </article>
  )
}
