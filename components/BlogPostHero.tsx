import Image from 'next/image'
import Link from 'next/link'
import { twJoin } from 'tailwind-merge'
import { getBlogPostImageURL } from '../lib/getBlogPostImageURL'
import { BlogPost } from '../lib/types'
import { BlogPostMetaData } from './BlogPostMetaData'
import { ContentfulContentRenderer } from './Contentful'
import { Icon } from './Icon'
import { ProseBox } from './ProseBox'

interface BlogPostHeroProps {
  post: BlogPost
}

export function BlogPostHero({ post }: BlogPostHeroProps) {
  const { excerpt, slug, title } = post

  const featureImageURL = getBlogPostImageURL(post)

  const isExternalPost = 'link' in post && !!post.link

  return (
    <section
      className={twJoin(
        'site-content-container',
        'mt-6',
        'flex flex-col',
        'gap-6',
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
          href={isExternalPost ? String(post.link) : `/blog/${slug}`}
          className="button-primary"
        >
          Read more
          {isExternalPost && <Icon name="arrow-up-right-from-square" />}
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
    </section>
  )
}
