import { BlogPostMetaData } from './BlogPostMetaData'
import { ContentfulContentRenderer } from './Contentful'
import { ProseBox } from './ProseBox'
import { SiteContentContainer } from './SiteContentContainer'

import Image from 'next/image'
import Link from 'next/link'
import { twJoin } from 'tailwind-merge'
import { getBlogPostImageURL } from '../lib/getBlogPostImageURL'
import { BlogPost } from '../lib/types'

interface BlogPostHeroProps {
  post: BlogPost
}

export function BlogPostHero({ post }: BlogPostHeroProps) {
  const { excerpt, slug, title } = post

  const featureImageURL = getBlogPostImageURL(post)

  return (
    <SiteContentContainer
      className={twJoin(
        'mt-6 gap-6',
        'flex flex-col',
        'lg:mt-20',
        'lg:grid',
        'lg:grid-cols-[3fr_4fr]',
      )}
    >
      <div className="relative z-10 space-y-3">
        <h1 className="h2">{title}</h1>

        <div className="line-clamp-3">
          <ContentfulContentRenderer content={excerpt} />
        </div>

        <ProseBox>
          <BlogPostMetaData post={post} />
        </ProseBox>

        <Link
          href={`/blog/${slug}`}
          className="button-primary"
        >
          Read more
        </Link>
      </div>

      <div
        className={twJoin(
          'js-post-feature-image',
          'relative aspect-video w-full overflow-hidden',
          'rounded-lg',
        )}
      >
        <Image
          src={featureImageURL}
          alt={title}
          fill={true}
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          objectFit="cover"
        />
      </div>
    </SiteContentContainer>
  )
}
