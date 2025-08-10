## informal-kit

Informal Kit is a Next.js-ready UI and utilities library for React 19, Tailwind CSS v4, and TypeScript. It provides:

- UI components: `Card`, `GradientBox`, `ModalWindow`, `Icon`, `Toasts` provider, `StickyNav`, `ProseBox`, `Logo*`, tables, carousels, and more
- Contentful helpers: `ContentfulSpotCopy`, `ContentfulGlobalTools`, `ContentfulContentRenderer`, data fetchers, and typed Contentful models
- App utilities: SEO via `generateMetadataFromContentful`, `OpenGraphImage`, hooks (`useIsDocumentScrolled`, `useTableOfContents`, …), and helpers (`tw`, `slugify`, `pluralize`, …)
- Styles: a global Tailwind layer you can @import

### Installation

Install from GitHub:

```bash
npm install github:informalsystems/informal-kit
```

Projects may pin a commit and add a sync script (as used in `informal.systems` and `cycles-dot-money`):

```json
// package.json
{
  "scripts": {
    "sync-informal-kit": "npm install github:informalsystems/informal-kit"
  },
  "dependencies": {
    "informal-kit": "github:informalsystems/informal-kit#<commit>"
  }
}
```

### Configuration

1. Next.js: transpile the package

```ts
// next.config.ts
export default {
  transpilePackages: ['informal-kit'],
} as const
```

2. TypeScript paths: allow aliased imports that match the export map

```json
// tsconfig.json
{
  "compilerOptions": {
    "paths": {
      "informal-kit/*": ["./node_modules/informal-kit/*"]
    }
  }
}
```

3. Tailwind v4: scan kit files and import the kit’s global layer

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss'

export default {
  content: [
    './**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/informal-kit/**/*.{js,ts,jsx,tsx,mdx}',
  ],
} satisfies Config
```

```css
/* app/global.css */
@import 'tailwindcss';
@config '../tailwind.config.ts';
@plugin "@tailwindcss/forms";
@import 'informal-kit/styles/global.css';
```

4. Contentful env vars (required if you use Contentful helpers)

```bash
CONTENTFUL_ACCESS_TOKEN=...
CONTENTFUL_SPACE_ID=...
CONTENTFUL_HOST_NAME=cdn.contentful.com # or preview.contentful.com
```

If you use `generateMetadataFromContentful`, also set:

```bash
NEXT_PUBLIC_URL=https://your-site.example
```

and add a small middleware to expose the request URL to the function:

```ts
// middleware.ts
import { NextResponse } from 'next/server'
export function middleware(request: Request) {
  const headers = new Headers((request as any).headers)
  headers.set('x-url', (request as any).url)
  return NextResponse.next({ request: { headers } })
}
```

5. Next Image (optional): allow Contentful assets

```ts
// next.config.ts
export default {
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'images.ctfassets.net' }],
  },
} as const
```

### Exports and import patterns

The package export map allows direct, tree-shakeable imports:

- Components: `informal-kit/components/...`
- Lib utilities: `informal-kit/lib/...`
- Styles: `informal-kit/styles/...`

Examples:

```ts
import { ThemeProvider } from 'informal-kit/components/ThemeProvider'
import { ToastContextProvider } from 'informal-kit/components/Toasts'
import { getContentfulSpotCopy } from 'informal-kit/lib/getContentfulSpotCopy'
import { OpenGraphImage } from 'informal-kit/lib/OpenGraphImage'
```

### Notes

- Peer deps: React 19.1, ReactDOM 19.1
- Built for Next.js 15 and Tailwind CSS v4
- Consumers in production today: `informal.systems`, `cycles-dot-money`
