'use client'

import { BlogPostList } from './BlogPostList'
import { Icon } from './Icon'

import Link from 'next/link'
import { twJoin } from 'tailwind-merge'
import { BlogPost } from '../lib/types'

interface BlogCategorySectionProps {
  category: string
  posts: BlogPost[]
  maxPosts?: number
}

const ViewAllButton = ({
  category,
  posts,
  categorySlug,
  isAllPosts,
  isRecent,
}: {
  category: string
  posts: BlogPost[]
  categorySlug: string
  isAllPosts: boolean
  isRecent: boolean
}) => (
  <Link
    className={twJoin(
      'link',
      'group/link',
      'flex items-center gap-1.5',
      'text-sm no-underline',
    )}
    href={
      isAllPosts || isRecent
        ? '/blog/category/all'
        : `/blog/category/${categorySlug}`
    }
  >
    {isRecent ? (
      <>
        <span className="underline">View All</span>
        <span className="counter">{posts.length}</span>
      </>
    ) : (
      <>
        <span className="underline">View All</span>
        <span className="counter">{posts.length}</span>
        <span className="underline">in {category}</span>
      </>
    )}
    <Icon
      name="arrow-right"
      variant="solid"
      className="
        group-hover/link:text-theme-accent-color
        m-0!
        transition-transform
        group-hover/link:translate-x-1
      "
    />
  </Link>
)

export const BlogCategorySection = ({
  category,
  posts,
  maxPosts = 6,
}: BlogCategorySectionProps) => {
  const recentPosts = posts.slice(0, maxPosts)
  const hasMorePosts = posts.length > maxPosts
  const categorySlug = category.toLowerCase()
  const isAllPosts = category.toLowerCase() === 'all posts'
  const isRecent = category.toLowerCase() === 'recent'

  return (
    <section id={categorySlug}>
      <div className="mb-12 flex items-center justify-between">
        <h2 className="h3">{category}</h2>

        {hasMorePosts && (
          <ViewAllButton
            category={category}
            posts={posts}
            categorySlug={categorySlug}
            isAllPosts={isAllPosts}
            isRecent={isRecent}
          />
        )}
      </div>

      <BlogPostList posts={recentPosts} />

      {hasMorePosts && (
        <div className="mt-8 text-center">
          <div className="inline-flex items-center gap-2">
            <ViewAllButton
              category={category}
              posts={posts}
              categorySlug={categorySlug}
              isAllPosts={isAllPosts}
              isRecent={isRecent}
            />
          </div>
        </div>
      )}
    </section>
  )
}
