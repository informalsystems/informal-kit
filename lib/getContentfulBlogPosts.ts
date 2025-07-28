import sortBy from 'lodash/sortBy'
import { getContentfulEntriesByType } from './contentfulClient'
import { TypeBlogPostSkeleton } from './contentfulTypes'
import { BlogCategory, BlogPost } from './types'

interface GetContentfulBlogPostsOptions<E extends boolean = false> {
  category?: BlogCategory
  slug?: string
  excludeBodyFields?: E
}

export async function getContentfulBlogPosts<E extends boolean = false>({
  category,
  excludeBodyFields,
  slug,
}: GetContentfulBlogPostsOptions<E> = {}): Promise<
  E extends true ? Omit<BlogPost, 'body' | 'introduction'>[] : BlogPost[]
> {
  const queries: {
    [key: string]: unknown
  } = {}

  if (slug) {
    queries['fields.slug'] = slug
  } else if (category) {
    queries['fields.categories'] = category
  }

  if (excludeBodyFields) {
    // Everything except the body and introduction fields
    queries['select'] = [
      'sys.id',
      'sys.space',
      'fields.featureImage',
      'fields.date',
      'fields.title',
      'fields.slug',
      'fields.categories',
      'fields.authors',
      'fields.keywords',
      'fields.excerpt',
      'fields.includeTableOfContents',
      'fields.introduction',
      'fields.body',
      'fields.scripts',
    ].join(',')
  }

  const items = await getContentfulEntriesByType<TypeBlogPostSkeleton>(
    'blogPost',
    queries,
  )

  const sanitizedItems = sortBy(
    items.map(item => ({
      ...item.fields,
      authors: item.fields.authors ?? ['(No authors)'],
      categories: item.fields.categories ?? ['(No categories)'],
      contentfulURL: `https://app.contentful.com/spaces/${item.sys.space.sys.id}/entries/${item.sys.id}`,
    })),
    'date',
  ).reverse()

  return sanitizedItems
}
