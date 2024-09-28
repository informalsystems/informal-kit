import { getContentfulEntriesByType } from '@/lib/contentfulClient'
import { TypeBlogPostSkeleton } from '@/lib/contentfulTypes'
import { BlogCategory, BlogPost } from '@/lib/types'
import { omit, sortBy } from 'lodash'

interface GetContentfulBlogPostsOptions<E extends boolean = false> {
  category?: BlogCategory
  slug?: string
  excludeBodyFields?: E
}

const bodyFieldsToExclude = ['body', 'introduction'] as const

export async function getContentfulBlogPosts<E extends boolean = false>({
  category,
  excludeBodyFields,
  slug,
}: GetContentfulBlogPostsOptions<E> = {}): Promise<
  E extends true
    ? Omit<BlogPost, (typeof bodyFieldsToExclude)[number]>[]
    : BlogPost[]
> {
  const items =
    await getContentfulEntriesByType<TypeBlogPostSkeleton>('blogPost')

  const filteredItems = slug
    ? items.filter((entry) => String(entry.fields.slug) === slug)
    : category
      ? items.filter((entry) =>
          entry.fields.categories
            .map((c) => c.toLowerCase())
            .includes(category.toLowerCase()),
        )
      : items

  const sanitizedItems = sortBy(
    filteredItems.map((item) => ({
      ...item.fields,
      contentfulURL: `https://app.contentful.com/spaces/${item.sys.space.sys.id}/entries/${item.sys.id}`,
    })),
    'date',
  ).reverse()

  if (excludeBodyFields === true) {
    return sanitizedItems.map((entry) => omit(entry, bodyFieldsToExclude))
  } else {
    return sanitizedItems
  }
}
