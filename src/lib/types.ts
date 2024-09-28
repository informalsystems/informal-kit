import { TypeBlogPostSkeleton } from '@/lib/contentfulTypes'
import { Entry } from 'contentful'

export type FormActionResponse =
  | null
  | {
      success: true
      messages?: string[]
    }
  | {
      success: false
      messages: string[]
    }

type BlogPosts = Entry<TypeBlogPostSkeleton, undefined, string>['fields'][]

export type BlogPost = BlogPosts[number] & {
  contentfulURL: string
}

export type BlogCategory = BlogPost['categories'][number]

export interface Career {
  id: number
  title: {
    id: string | null
    label: string
  }
  postedDate: string
  location: {
    id: string | null
    label: string
    address: {
      name: string | null
      description: string | null
      addressLine1: string | null
      addressLine2: string | null
      city: string | null
      state: string | null
      zipcode: string | null
      country: string | null
      phoneNumber: string | null
    }
  }
  department: {
    id: number
    label: string
  }
  status: {
    id: number
    label: string
  }
  newApplicantsCount: number
  activeApplicantsCount: number
  totalApplicantsCount: number
  postingUrl: string
}
