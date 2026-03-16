import type { Metadata } from 'next';
import Link from 'next/link';
import { getCategories } from '@/lib/cosmic';
import CategoryCard from '@/components/CategoryCard';

export const metadata: Metadata = {
  title: 'Product Categories | My Online Store',
  description: 'Browse products by category at My Online Store.',
};

export default async function CategoriesPage() {
  const categories = await getCategories();

  return (
    <div className="py-12 sm:py-16">
      <div className="page-container">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
          <svg className="mx-2 h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          <span className="text-gray-900 font-medium">Categories</span>
        </nav>

        <h1 className="section-heading">Product Categories</h1>
        <p className="mt-3 text-lg text-gray-600 mb-10">
          Explore our {categories.length} categor{categories.length !== 1 ? 'ies' : 'y'} to find what you need.
        </p>

        {categories.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-gray-500 text-lg">No categories found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {categories.map((category) => (
              <CategoryCard key={category.id} category={category} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}