import Link from 'next/link';
import type { Product } from '@/types';
import { getMetafieldValue } from '@/types';
import InventoryBadge from '@/components/InventoryBadge';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const price = product.metadata?.price;
  const salePrice = product.metadata?.sale_price;
  const hasSale =
    typeof salePrice === 'number' &&
    salePrice > 0 &&
    typeof price === 'number' &&
    salePrice < price;
  const featuredImage = product.metadata?.featured_image;
  const inventoryStatus = getMetafieldValue(product.metadata?.inventory_status);
  const category = product.metadata?.category;

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block rounded-xl bg-white border border-gray-200 overflow-hidden card-hover"
    >
      {/* Image */}
      <div className="relative aspect-square bg-gray-100 overflow-hidden">
        {featuredImage ? (
          <img
            src={`${featuredImage.imgix_url}?w=800&h=800&fit=crop&auto=format,compress`}
            alt={product.title}
            width={400}
            height={400}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full items-center justify-center">
            <svg className="h-16 w-16 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
        )}

        {/* Sale Badge */}
        {hasSale && (
          <span className="absolute top-3 left-3 rounded-full bg-red-500 px-2.5 py-1 text-xs font-bold text-white shadow-sm">
            Sale
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-4">
        {category && (
          <p className="text-xs font-semibold uppercase tracking-wider text-brand-600 mb-1">
            {category.metadata?.name || category.title}
          </p>
        )}

        <h3 className="font-semibold text-gray-900 group-hover:text-brand-600 transition-colors line-clamp-2">
          {product.title}
        </h3>

        <div className="mt-2 flex items-baseline gap-2">
          {hasSale ? (
            <>
              <span className="text-lg font-bold text-red-600">${salePrice.toFixed(2)}</span>
              <span className="text-sm text-gray-400 line-through">${price.toFixed(2)}</span>
            </>
          ) : typeof price === 'number' ? (
            <span className="text-lg font-bold text-gray-900">${price.toFixed(2)}</span>
          ) : (
            <span className="text-sm text-gray-400">Price TBD</span>
          )}
        </div>

        {inventoryStatus && (
          <div className="mt-2">
            <InventoryBadge status={inventoryStatus} size="sm" />
          </div>
        )}
      </div>
    </Link>
  );
}