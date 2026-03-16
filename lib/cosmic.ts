import { createBucketClient } from '@cosmicjs/sdk';
import type { Product, ProductCategory, CustomerReview } from '@/types';
import { hasStatus } from '@/types';

export const cosmic = createBucketClient({
  bucketSlug: process.env.COSMIC_BUCKET_SLUG as string,
  readKey: process.env.COSMIC_READ_KEY as string,
  writeKey: process.env.COSMIC_WRITE_KEY as string,
});

// ─── Products ───────────────────────────────────────────────

export async function getProducts(): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'products' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at'])
      .depth(1);
    return response.objects as Product[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch products');
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'products', slug })
      .props(['id', 'title', 'slug', 'metadata', 'content', 'created_at', 'modified_at'])
      .depth(1);
    return response.object as Product;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch product');
  }
}

export async function getProductsByCategory(categoryId: string): Promise<Product[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'products', 'metadata.category': categoryId })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at'])
      .depth(1);
    return response.objects as Product[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch products by category');
  }
}

// ─── Categories ─────────────────────────────────────────────

export async function getCategories(): Promise<ProductCategory[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'product-categories' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at'])
      .depth(1);
    return response.objects as ProductCategory[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch categories');
  }
}

export async function getCategoryBySlug(slug: string): Promise<ProductCategory | null> {
  try {
    const response = await cosmic.objects
      .findOne({ type: 'product-categories', slug })
      .props(['id', 'title', 'slug', 'metadata', 'content', 'created_at', 'modified_at'])
      .depth(1);
    return response.object as ProductCategory;
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return null;
    }
    throw new Error('Failed to fetch category');
  }
}

// ─── Reviews ────────────────────────────────────────────────

export async function getReviews(): Promise<CustomerReview[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'customer-reviews' })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at'])
      .depth(1);
    return response.objects as CustomerReview[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch reviews');
  }
}

export async function getReviewsByProduct(productId: string): Promise<CustomerReview[]> {
  try {
    const response = await cosmic.objects
      .find({ type: 'customer-reviews', 'metadata.product': productId })
      .props(['id', 'title', 'slug', 'metadata', 'created_at', 'modified_at'])
      .depth(1);
    return response.objects as CustomerReview[];
  } catch (error) {
    if (hasStatus(error) && error.status === 404) {
      return [];
    }
    throw new Error('Failed to fetch reviews for product');
  }
}