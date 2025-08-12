'use client'

import Image from 'next/image'
import Script from 'next/script'
import { ComponentProps, useEffect } from 'react'
import { twJoin, twMerge } from 'tailwind-merge'
import { getBlogPostImageURL } from '../lib/getBlogPostImageURL'
import { BlogPost as BlogPostType } from '../lib/types'
import { BlogPostMetaData } from './BlogPostMetaData'
import { ContentfulContentRenderer } from './Contentful'
import { ProseBox } from './ProseBox'
import { StickyTableOfContents } from './StickyTableOfContents'

interface BlogPostProps extends ComponentProps<'div'> {
  banner?: React.ReactNode
  classNamesForProseContainer?: string
  post: BlogPostType
}

export function BlogPost({
  banner,
  className,
  classNamesForProseContainer,
  post,
  ...otherProps
}: BlogPostProps) {
  const featureImageURL = getBlogPostImageURL(post)

  const { body, categories, introduction, scripts, title } = post

  const includeMathJax = scripts?.includes('MathJAX for LaTeX support') ?? false

  useEffect(() => {
    if (includeMathJax) {
      const timer = setTimeout(() => {
        ;(
          window as unknown as { MathJax: { typeset: () => void } }
        ).MathJax.typeset()
      }, 100)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [includeMathJax])

  return (
    <>
      {includeMathJax && (
        <Script
          type="text/javascript"
          id="MathJax-script"
          src="https://cdn.jsdelivr.net/npm/mathjax@3/es5/tex-chtml.js"
        />
      )}

      <div
        className={twMerge('relative', className)}
        {...otherProps}
      >
        <div
          className={twJoin(
            'absolute inset-0 -bottom-20 z-0',
            'bg-theme-bg-color-shaded',
            'pointer-events-none',
          )}
        />

        <section
          className={twJoin(
            'site-content-container',
            'flex flex-col',
            'gap-6',
            'pt-40 pb-12',
          )}
        >
          <div className="relative z-10 space-y-6">
            <h1 className="h1 text-balance">{title}</h1>

            <BlogPostMetaData
              post={post}
              cardOptions={{
                showCategories: true,
              }}
            />

            {banner}
          </div>
        </section>
      </div>

      <section
        className={twJoin(
          'site-content-container',
          'flex flex-col',
          'gap-6',
          'py-0',
          'lg:grid',
          'lg:grid-cols-[auto_1fr]',
        )}
      >
        <div className="flex flex-col gap-6">
          <ProseBox
            className={twMerge(
              'js-table-of-contents-target',
              '-m-3 rounded-sm p-3',
              'relative',
              'bg-theme-bg-color-shaded',
              'prose-headings:text-balance',
              'target:prose-headings:rounded-sm',
              'target:prose-headings:outline',
              'target:prose-headings:outline-2',
              'target:prose-headings:outline-offset-4',
              'target:prose-headings:outline-palette-green',
              categories?.includes('Quint') &&
                '[&_.text-orange-600]:text-violet-500',
              classNamesForProseContainer,
            )}
          >
            <div
              className={twJoin(
                'relative z-10 aspect-video w-full',
                'overflow-hidden rounded-lg',
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

            {introduction && (
              <ContentfulContentRenderer content={introduction} />
            )}
            {body && (
              <ContentfulContentRenderer
                content={body}
                headingLevel={2}
              />
            )}
          </ProseBox>
        </div>

        <StickyTableOfContents elementSelector=".js-table-of-contents-target" />
      </section>
    </>
  )
}
