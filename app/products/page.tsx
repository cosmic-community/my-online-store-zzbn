import type { Metadata } from 'next';
import { getProducts, getCategories } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'All Products | My Online Store',
  description: 'Browse our complete collection of products.',
};

export default async function ProductsPage() {
  const [products, categories] = await Promise.all([
    getProducts(),
    getCategories(),
  ]);

  return (
    <div className="py-12 sm:py-16">
      <div className="page-container">
        {/* Page Header */}
        <div className="mb-10">
          <nav className="flex items-center text-sm text-gray-500 mb-4">
            <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
            <svg className="mx-2 h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            <span className="text-gray-900 font-medium">Products</span>
          </nav>
          <h1 className="section-heading">All Products</h1>
          <p className="mt-3 text-lg text-gray-600">
            Browse our complete collection of {products.length} product{products.length !== 1 ? 's' : ''}.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Sidebar — Categories */}
          {categories.length > 0 && (
            <aside className="lg:w-56 shrink-0">
              <h3 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-4">
                Categories
              </h3>
              <ul className="space-y-1">
                {categories.map((cat) => (
                  <li key={cat.id}>
                    <Link
                      href={`/categories/${cat.slug}`}
                      className="block rounded-lg px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-brand-50 hover:text-brand-700"
                    >
                      {cat.metadata?.name || cat.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          )}

          {/* Product Grid */}
          <div className="flex-1">
            {products.length === 0 ? (
              <div className="text-center py-20">
                <p className="text-gray-500 text-lg">No products found.</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}