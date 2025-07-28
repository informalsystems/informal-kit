import { ComponentProps } from 'react'
import { twMerge } from 'tailwind-merge'
import { BlogPost } from '../lib/types'
import { BlogPostCard, PostCardOptions } from './BlogPostCard'

interface PostListProps extends Omit<ComponentProps<'div'>, 'children'> {
  posts: BlogPost[]
  cardOptions?: PostCardOptions
}

export function BlogPostList({
  cardOptions,
  className,
  posts,
  ...otherProps
}: PostListProps) {
  return (
    <div
      className={twMerge(
        'grid gap-x-6 gap-y-12',
        'md:grid-cols-2',
        [1, 2, 4].includes(posts.length) ? 'lg:grid-cols-2' : 'lg:grid-cols-3',
        className,
      )}
      {...otherProps}
    >
      {posts.map(post => (
        <BlogPostCard
          key={post.slug}
          post={post}
          cardOptions={cardOptions}
        />
      ))}
    </div>
  )
}
