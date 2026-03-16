export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, unknown>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface Product extends CosmicObject {
  type: 'products';
  metadata: {
    description?: string;
    price?: number;
    sale_price?: number;
    featured_image?: CosmicImage;
    gallery?: CosmicImage[];
    inventory_status?: string;
    sku?: string;
    category?: ProductCategory;
  };
}

export interface ProductCategory extends CosmicObject {
  type: 'product-categories';
  metadata: {
    name?: string;
    description?: string;
    image?: CosmicImage;
  };
}

export interface CustomerReview extends CosmicObject {
  type: 'customer-reviews';
  metadata: {
    product?: Product;
    reviewer_name?: string;
    rating?: number;
    review?: string;
    verified_purchase?: boolean | string;
  };
}

export type InventoryStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';

export function getMetafieldValue(field: unknown): string {
  if (field === null || field === undefined) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'number' || typeof field === 'boolean') return String(field);
  if (typeof field === 'object' && field !== null && 'value' in field) {
    return String((field as { value: unknown }).value);
  }
  if (typeof field === 'object' && field !== null && 'key' in field) {
    return String((field as { key: unknown }).key);
  }
  return '';
}

export function hasStatus(error: unknown): error is { status: number } {
  return typeof error === 'object' && error !== null && 'status' in error;
}