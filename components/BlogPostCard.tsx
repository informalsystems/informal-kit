import { BlogPostMetaData } from './BlogPostMetaData'
import { ContentfulContentRenderer, ContentfulHoverTools } from './Contentful'
import { Icon } from './Icon'

import Image from 'next/image'
import Link from 'next/link'
import { ComponentProps } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'
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

  const isExternalPost =
    ('link' in post && post.link) || propsForCardSurface?.target === '_blank'

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
          'group-hover/card:text-theme-accent-color',
          'font-bold',
          classNameForTitle,
        )}
      >
        {isExternalPost && (
          <span
            className={twJoin(
              'inline-block',
              'is-inverted',
              'bg-theme-bg-color',
              'text-xs font-bold uppercase',
              'rounded-xs',
              'px-1 py-0.5',
              'mr-1',
              'align-middle',
            )}
          >
            External
          </span>
        )}
        {post.title}
      </h3>

      <div className="line-clamp-3">
        {'description' in post ? (
          <p>{String(post.description)}</p>
        ) : (
          <ContentfulContentRenderer content={post.excerpt} />
        )}
      </div>

      <BlogPostMetaData
        post={post}
        cardOptions={cardOptions}
      />

      <Link
        className={twMerge(
          'group',
          'hover:bg-theme-accent-color/5',
          'absolute',
          '-inset-3',
          'z-10',
          'rounded-xl',
          propsForCardSurfaceClassName,
        )}
        href={
          'link' in post
            ? String(post.link)
            : `${linkPrefix ?? ''}/blog/${post.slug}`
        }
        target={isExternalPost ? '_blank' : propsForCardSurface?.target}
        {...restOfPropsForCardSurface}
      >
        <ContentfulHoverTools
          className="absolute inset-0"
          contentfulURL={post.contentfulURL}
        >
          <span className="sr-only">Read Post</span>
        </ContentfulHoverTools>

        {('link' in post || propsForCardSurface?.target === '_blank') && (
          <span
            className={twMerge(
              'is-inverted bg-theme-bg-color',
              'absolute top-0 right-0 size-6',
              'translate-x-1/2 -translate-y-1/2',
              'flex items-center justify-center',
              'rounded-full text-xs',
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
