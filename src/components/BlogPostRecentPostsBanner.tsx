'use client'

import { useBlogContext } from './BlogContextProvider'
import { BlogPostList } from './BlogPostList'
import { ColorfulBox } from './ColorfulBox'
import { SiteContentContainer } from './SiteContentContainer'

import { ComponentProps } from 'react'

interface BlogPostRecentPostsBannerProps extends ComponentProps<'div'> {
  currentPostSlug: string
}

export function BlogPostRecentPostsBanner({
  currentPostSlug,
  ...otherProps
}: BlogPostRecentPostsBannerProps) {
  const { posts } = useBlogContext()

  const recentPosts = posts
    .filter(post => post.slug !== currentPostSlug)
    .slice(0, 3)

  if (recentPosts.length === 0) {
    return null
  }

  return (
    <ColorfulBox {...otherProps}>
      <SiteContentContainer className="space-y-8">
        <h2 className="h2 heading-decorator-left">Read More</h2>

        <BlogPostList posts={recentPosts} />
      </SiteContentContainer>
    </ColorfulBox>
  )
}
