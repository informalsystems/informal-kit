# Informal Kit

A component library and utility package for Next.js applications.

## Installation

```bash
npm install informal-kit
```

## Usage

### Components

```tsx
import { Card, Button, ModalWindow } from 'informal-kit/components'
```

### Utilities

```tsx
import { slugify, pluralize } from 'informal-kit/lib'
```

### Tailwind Utilities

```tsx
import { twMerge, twJoin } from 'informal-kit/lib/tailwind'
```

### Styles

```tsx
import 'informal-kit/styles/global.css'
import 'informal-kit/styles/buttons.css'
```

## Requirements

- React ^19.1.0
- React DOM ^19.1.0
- Next.js ^15.4.4

## Available Exports

### Components

- `Card` - Flexible card component
- `ModalWindow` - Modal dialog component
- `BlogPost` - Blog post display component
- `Carousel` - Image/content carousel
- And many more...

### Utilities

- `slugify` - Convert text to URL-friendly slugs
- `pluralize` - Handle word pluralization
- `distributeEvenly` - Layout utility functions

### Styles

- `global.css` - Base styles and CSS variables
- `buttons.css` - Button component styles
- `forms.css` - Form element styles
- `typography.css` - Typography styles

## Development

```bash
npm run dev          # Start development server
npm run build        # Build the package
npm run lint         # Run ESLint
npm run check-types  # Check TypeScript types
```
