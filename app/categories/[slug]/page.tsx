// app/categories/[slug]/page.tsx
import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCategoryBySlug, getProductsByCategory } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);
  if (!category) return { title: 'Category Not Found' };
  const name = category.metadata?.name || category.title;
  return {
    title: `${name} | My Online Store`,
    description: category.metadata?.description || `Browse ${name} products at My Online Store.`,
  };
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const category = await getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const products = await getProductsByCategory(category.id);
  const name = category.metadata?.name || category.title;
  const image = category.metadata?.image;

  return (
    <div className="py-12 sm:py-16">
      <div className="page-container">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-gray-500 mb-8">
          <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
          <svg className="mx-2 h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          <Link href="/categories" className="hover:text-brand-600 transition-colors">Categories</Link>
          <svg className="mx-2 h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          <span className="text-gray-900 font-medium">{name}</span>
        </nav>

        {/* Category Header */}
        <div className="relative mb-12 overflow-hidden rounded-2xl bg-gray-900">
          {image && (
            <img
              src={`${image.imgix_url}?w=1400&h=400&fit=crop&auto=format,compress`}
              alt={name}
              width={1400}
              height={400}
              className="absolute inset-0 h-full w-full object-cover opacity-40"
            />
          )}
          <div className="relative px-8 py-16 sm:px-12 sm:py-20">
            <h1 className="text-3xl font-bold text-white sm:text-4xl">{name}</h1>
            {category.metadata?.description && (
              <p className="mt-3 text-lg text-gray-300 max-w-2xl">
                {category.metadata.description}
              </p>
            )}
            <p className="mt-4 text-sm text-gray-400">
              {products.length} product{products.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Products */}
        {products.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No products in this category yet.</p>
            <Link
              href="/products"
              className="mt-4 inline-flex items-center text-sm font-semibold text-brand-600 hover:text-brand-700"
            >
              Browse all products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}