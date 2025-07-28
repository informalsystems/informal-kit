import { Asset } from 'contentful'
import { BlogCategory, BlogPost } from './types'

const categoriesToBackgroundImagesMap = new Map<BlogCategory, string>([
  ['Audits', '/bg-blog-informal-1.jpg'],
  ['Company', '/bg-blog-informal-1.jpg'],
  ['Cycles', '/bg-blog-cycles.jpg'],
  ['Engineering', '/bg-blog-informal-2.jpg'],
  ['Malachite', '/bg-blog-hub-2.jpg'],
  ['Quint', '/bg-blog-hub-1.jpg'],
])

export function getBlogPostImageURL({ featureImage, categories }: BlogPost) {
  if (!featureImage) {
    const matchingCategory = categories?.find(category =>
      categoriesToBackgroundImagesMap.has(category),
    )

    return `${process.env.NEXT_PUBLIC_URL}${
      matchingCategory
        ? categoriesToBackgroundImagesMap.get(matchingCategory)
        : '/bg-blog-informal-2.jpg'
    }`
  }

  return `https:${(featureImage as Asset)?.fields.file?.url}`
}
