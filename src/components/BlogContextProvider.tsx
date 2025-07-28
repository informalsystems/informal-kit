'use client'

import { ReactNode, createContext, useContext } from 'react'
import { BlogCategory, BlogPost } from '../lib/types'

interface BlogContextType {
  categories: BlogCategory[]
  posts: Omit<BlogPost, 'body'>[]
}

interface BlogContextProviderProps extends BlogContextType {
  children: ReactNode
}

const BlogContext = createContext<BlogContextType>({
  categories: [],
  posts: [],
})

export function useBlogContext() {
  return useContext(BlogContext)
}

export function BlogContextProvider({
  categories,
  children,
  posts,
}: BlogContextProviderProps) {
  return <BlogContext value={{ categories, posts }}>{children}</BlogContext>
}
