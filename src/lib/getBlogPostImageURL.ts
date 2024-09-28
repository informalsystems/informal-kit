import { BlogCategory, BlogPost } from '@/lib/types'
import { Asset } from 'contentful'

const categoriesToBackgroundImagesMap = new Map<BlogCategory, string>([
  ['Cycles', '/bg-blog-cycles.jpg'],
  ['Engineering', '/bg-blog-informal-2.jpg'],
  ['Research', '/bg-blog-hub-2.jpg'],
  ['Cosmos', '/bg-blog-hub-1.jpg'],
  ['Cooperative', '/bg-blog-informal-1.jpg'],
])

export function getBlogPostImageURL({ featureImage, categories }: BlogPost) {
  if (!featureImage) {
    const matchingCategory = categories.find(category =>
      categoriesToBackgroundImagesMap.has(category),
    )

    return `${process.env.NEXT_PUBLIC_METADATA_BASE_URL}${
      matchingCategory
        ? categoriesToBackgroundImagesMap.get(matchingCategory)!
        : '/bg-blog-informal-2.jpg'
    }`
  }

  return `https:${(featureImage as Asset)?.fields.file?.url}`
}
