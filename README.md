# My Online Store

![App Preview](https://imgix.cosmicjs.com/f72a9a40-20e5-11f1-8e73-95937fcad31d-photo-1618519764620-7403abdbdfe9-1773630743355.jpg?w=1200&h=630&fit=crop&auto=format,compress)

A modern, responsive e-commerce storefront powered by [Cosmic](https://www.cosmicjs.com) CMS and built with Next.js 16. Browse products by category, read customer reviews, and enjoy a beautiful shopping experience — all managed through your Cosmic dashboard.

## Features

- 🛍️ **Product Catalog** — Browse all products with category filtering, search, and sorting
- 📦 **Product Detail Pages** — Rich pages with image galleries, pricing, inventory status, and reviews
- 🏷️ **Category Browsing** — Organized categories with product counts and descriptions
- ⭐ **Customer Reviews** — Star ratings, verified purchase badges, and product-linked reviews
- 🏠 **Dynamic Homepage** — Featured products, categories, and latest reviews
- 📱 **Fully Responsive** — Optimized for mobile, tablet, and desktop
- 🔍 **SEO Optimized** — Server-side rendering with dynamic metadata
- ⚡ **Fast Performance** — Server Components for minimal client-side JavaScript

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=69b774383704c8f1904ccf69&clone_repository=69b775713704c8f1904ccfad)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Create content models for an online store with products (including images, pricing, description, and inventory status), product categories, and customer reviews."

### Code Generation Prompt

> "Build a Next.js application for an online business called 'My Online Store'. The content is managed in Cosmic CMS with the following object types: product-categories, products, customer-reviews. Create a beautiful, modern, responsive design with a homepage and pages for each content type."

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies

- [Next.js 16](https://nextjs.org/) — React framework with App Router
- [React 19](https://react.dev/) — UI library
- [Cosmic](https://www.cosmicjs.com) — Headless CMS ([docs](https://www.cosmicjs.com/docs))
- [Tailwind CSS 3](https://tailwindcss.com/) — Utility-first CSS
- [TypeScript 5](https://www.typescriptlang.org/) — Type safety

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) (recommended) or Node.js 18+
- A [Cosmic](https://www.cosmicjs.com) account with your bucket configured

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd my-online-store

# Install dependencies
bun install

# Set up environment variables
cp .env.example .env.local
# Edit .env.local with your Cosmic credentials

# Start the development server
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the store.

## Cosmic SDK Examples

```typescript
import { createBucketClient } from '@cosmicjs/sdk'

const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
})

// Fetch all products
const { objects: products } = await cosmic.objects
  .find({ type: 'products' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

// Fetch a single product by slug
const { object: product } = await cosmic.objects
  .findOne({ type: 'products', slug: 'my-product' })
  .props(['id', 'title', 'slug', 'metadata', 'content'])
  .depth(1)
```

## Cosmic CMS Integration

This app uses the following object types:

| Object Type | Slug | Description |
|---|---|---|
| Products | `products` | Store products with images, pricing, inventory |
| Product Categories | `product-categories` | Categories to organize products |
| Customer Reviews | `customer-reviews` | Customer reviews linked to products |

## Deployment Options

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the repository on [Vercel](https://vercel.com)
3. Add environment variables: `COSMIC_BUCKET_SLUG`, `COSMIC_READ_KEY`, `COSMIC_WRITE_KEY`
4. Deploy

### Netlify

1. Push your code to GitHub
2. Import the repository on [Netlify](https://netlify.com)
3. Set build command: `bun run build`
4. Set publish directory: `.next`
5. Add environment variables
6. Deploy

<!-- README_END -->