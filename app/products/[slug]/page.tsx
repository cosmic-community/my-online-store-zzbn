// app/products/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getProductBySlug, getReviewsByProduct, getProducts } from '@/lib/cosmic';
import StarRating from '@/components/StarRating';
import InventoryBadge from '@/components/InventoryBadge';
import ReviewCard from '@/components/ReviewCard';
import ProductCard from '@/components/ProductCard';
import { getMetafieldValue } from '@/types';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const product = await getProductBySlug(slug);
  if (!product) return { title: 'Product Not Found' };
  return {
    title: `${product.title} | My Online Store`,
    description: product.metadata?.description?.slice(0, 160) || `Shop ${product.title} at My Online Store.`,
  };
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    notFound();
  }

  const reviews = await getReviewsByProduct(product.id);
  const allProducts = await getProducts();
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id)
    .slice(0, 4);

  const averageRating =
    reviews.length > 0
      ? reviews.reduce((sum, r) => sum + (r.metadata?.rating || 0), 0) / reviews.length
      : 0;

  const price = product.metadata?.price;
  const salePrice = product.metadata?.sale_price;
  const hasSale = typeof salePrice === 'number' && salePrice > 0 && typeof price === 'number' && salePrice < price;
  const inventoryStatus = getMetafieldValue(product.metadata?.inventory_status);
  const category = product.metadata?.category;
  const featuredImage = product.metadata?.featured_image;
  const gallery = product.metadata?.gallery;

  return (
    <div className="py-12 sm:py-16">
      <div className="page-container">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
          <svg className="mx-2 h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          <Link href="/products" className="hover:text-brand-600 transition-colors">Products</Link>
          <svg className="mx-2 h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          <span className="text-gray-900 font-medium truncate">{product.title}</span>
        </nav>

        {/* Product Details */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Column */}
          <div>
            {featuredImage ? (
              <div className="aspect-square overflow-hidden rounded-2xl bg-gray-100">
                <img
                  src={`${featuredImage.imgix_url}?w=1200&h=1200&fit=crop&auto=format,compress`}
                  alt={product.title}
                  width={600}
                  height={600}
                  className="h-full w-full object-cover"
                />
              </div>
            ) : (
              <div className="aspect-square rounded-2xl bg-gray-100 flex items-center justify-center">
                <svg className="h-24 w-24 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.41a2.25 2.25 0 013.182 0l2.909 2.91m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
            )}

            {/* Gallery */}
            {gallery && gallery.length > 0 && (
              <div className="mt-4 grid grid-cols-4 gap-3">
                {gallery.map((img, idx) => (
                  <div key={idx} className="aspect-square overflow-hidden rounded-lg bg-gray-100">
                    <img
                      src={`${img.imgix_url}?w=300&h=300&fit=crop&auto=format,compress`}
                      alt={`${product.title} gallery ${idx + 1}`}
                      width={150}
                      height={150}
                      className="h-full w-full object-cover hover:opacity-80 transition-opacity cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Info Column */}
          <div>
            {category && (
              <Link
                href={`/categories/${category.slug}`}
                className="inline-flex items-center rounded-full bg-brand-50 px-3 py-1 text-xs font-semibold text-brand-700 mb-4 hover:bg-brand-100 transition-colors"
              >
                {category.metadata?.name || category.title}
              </Link>
            )}

            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              {product.title}
            </h1>

            {/* Rating */}
            {reviews.length > 0 && (
              <div className="mt-3 flex items-center gap-2">
                <StarRating rating={Math.round(averageRating)} />
                <span className="text-sm text-gray-500">
                  ({reviews.length} review{reviews.length !== 1 ? 's' : ''})
                </span>
              </div>
            )}

            {/* Price */}
            <div className="mt-6 flex items-baseline gap-3">
              {hasSale ? (
                <>
                  <span className="text-3xl font-bold text-red-600">
                    ${salePrice.toFixed(2)}
                  </span>
                  <span className="text-xl text-gray-400 line-through">
                    ${price.toFixed(2)}
                  </span>
                  <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-semibold text-red-700">
                    Sale
                  </span>
                </>
              ) : typeof price === 'number' ? (
                <span className="text-3xl font-bold text-gray-900">
                  ${price.toFixed(2)}
                </span>
              ) : (
                <span className="text-xl text-gray-500">Price not available</span>
              )}
            </div>

            {/* Inventory & SKU */}
            <div className="mt-4 flex items-center gap-4">
              {inventoryStatus && <InventoryBadge status={inventoryStatus} />}
              {product.metadata?.sku && (
                <span className="text-sm text-gray-400">SKU: {product.metadata.sku}</span>
              )}
            </div>

            {/* Description */}
            {product.metadata?.description && (
              <div className="mt-8 prose prose-gray max-w-none">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                <p className="text-gray-600 leading-relaxed whitespace-pre-line">
                  {product.metadata.description}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Reviews Section */}
        {reviews.length > 0 && (
          <section className="mt-16 pt-16 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              Customer Reviews ({reviews.length})
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map((review) => (
                <ReviewCard key={review.id} review={review} showProduct={false} />
              ))}
            </div>
          </section>
        )}

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16 pt-16 border-t border-gray-200">
            <h2 className="text-2xl font-bold text-gray-900 mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}