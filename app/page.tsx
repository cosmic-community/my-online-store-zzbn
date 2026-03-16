import Link from 'next/link';
import { getProducts, getCategories, getReviews } from '@/lib/cosmic';
import ProductCard from '@/components/ProductCard';
import CategoryCard from '@/components/CategoryCard';
import ReviewCard from '@/components/ReviewCard';

export default async function HomePage() {
  const [products, categories, reviews] = await Promise.all([
    getProducts(),
    getCategories(),
    getReviews(),
  ]);

  const featuredProducts = products.slice(0, 4);
  const latestReviews = reviews
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 3);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-brand-900 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PHBhdGggZD0iTTM2IDM0djZoLTZWMjhoNnYtNmg2djZoLTZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-50" />
        <div className="page-container relative py-24 sm:py-32 lg:py-40">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-widest text-brand-400 mb-4">
              Welcome to
            </p>
            <h1 className="text-4xl font-extrabold tracking-tight sm:text-5xl lg:text-6xl">
              My Online Store
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-gray-300 max-w-xl">
              Discover our curated collection of quality products. Great prices, authentic reviews, and a seamless shopping experience.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/products"
                className="inline-flex items-center rounded-lg bg-brand-500 px-6 py-3 text-sm font-semibold text-white shadow-lg transition-all duration-200 hover:bg-brand-600 hover:shadow-xl"
              >
                Shop All Products
                <svg className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
              <Link
                href="/categories"
                className="inline-flex items-center rounded-lg border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-200 hover:bg-white/20"
              >
                Browse Categories
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      {categories.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="page-container">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-brand-600 mb-2">
                  Browse by
                </p>
                <h2 className="section-heading">Categories</h2>
              </div>
              <Link
                href="/categories"
                className="hidden sm:inline-flex items-center text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
              >
                View All
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {categories.map((category) => (
                <CategoryCard key={category.id} category={category} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="py-16 sm:py-20 bg-white">
          <div className="page-container">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-brand-600 mb-2">
                  Our collection
                </p>
                <h2 className="section-heading">Featured Products</h2>
              </div>
              <Link
                href="/products"
                className="hidden sm:inline-flex items-center text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
              >
                View All Products
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Reviews Section */}
      {latestReviews.length > 0 && (
        <section className="py-16 sm:py-20">
          <div className="page-container">
            <div className="flex items-end justify-between mb-10">
              <div>
                <p className="text-sm font-semibold uppercase tracking-widest text-brand-600 mb-2">
                  What customers say
                </p>
                <h2 className="section-heading">Latest Reviews</h2>
              </div>
              <Link
                href="/reviews"
                className="hidden sm:inline-flex items-center text-sm font-semibold text-brand-600 hover:text-brand-700 transition-colors"
              >
                Read All Reviews
                <svg className="ml-1 h-4 w-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {latestReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 sm:py-20 bg-brand-500">
        <div className="page-container text-center">
          <h2 className="text-3xl font-bold text-white sm:text-4xl">
            Ready to start shopping?
          </h2>
          <p className="mt-4 text-lg text-brand-100 max-w-2xl mx-auto">
            Explore our full catalog of products and find exactly what you need.
          </p>
          <Link
            href="/products"
            className="mt-8 inline-flex items-center rounded-lg bg-white px-8 py-3.5 text-sm font-semibold text-brand-700 shadow-lg transition-all duration-200 hover:bg-gray-100 hover:shadow-xl"
          >
            Browse All Products
          </Link>
        </div>
      </section>
    </div>
  );
}