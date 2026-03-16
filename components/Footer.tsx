import Link from 'next/link';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-400">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="py-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <span className="text-2xl">🛍️</span>
              <span className="text-lg font-bold text-white">My Online Store</span>
            </Link>
            <p className="mt-3 text-sm leading-relaxed max-w-xs">
              Quality products, great prices, and authentic customer reviews.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-gray-300 mb-4">Shop</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/products" className="text-sm hover:text-white transition-colors">All Products</Link>
              </li>
              <li>
                <Link href="/categories" className="text-sm hover:text-white transition-colors">Categories</Link>
              </li>
            </ul>
          </div>

          {/* Community */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-gray-300 mb-4">Community</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/reviews" className="text-sm hover:text-white transition-colors">Customer Reviews</Link>
              </li>
            </ul>
          </div>

          {/* Powered by */}
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-widest text-gray-300 mb-4">Powered By</h4>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.cosmicjs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-white transition-colors"
                >
                  Cosmic
                </a>
              </li>
              <li>
                <a
                  href="https://nextjs.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm hover:text-white transition-colors"
                >
                  Next.js
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 py-6 text-center text-sm">
          <p>&copy; {currentYear} My Online Store. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}