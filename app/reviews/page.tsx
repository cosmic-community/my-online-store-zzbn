import type { Metadata } from 'next';
import Link from 'next/link';
import { getReviews } from '@/lib/cosmic';
import ReviewCard from '@/components/ReviewCard';

export const metadata: Metadata = {
  title: 'Customer Reviews | My Online Store',
  description: 'Read authentic customer reviews at My Online Store.',
};

export default async function ReviewsPage() {
  const reviews = await getReviews();

  const sortedReviews = reviews.sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );

  const totalReviews = sortedReviews.length;
  const averageRating =
    totalReviews > 0
      ? sortedReviews.reduce((sum, r) => sum + (r.metadata?.rating || 0), 0) / totalReviews
      : 0;

  return (
    <div className="py-12 sm:py-16">
      <div className="page-container">
        {/* Breadcrumbs */}
        <nav className="flex items-center text-sm text-gray-500 mb-4">
          <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
          <svg className="mx-2 h-4 w-4 text-gray-300" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
          </svg>
          <span className="text-gray-900 font-medium">Reviews</span>
        </nav>

        <h1 className="section-heading">Customer Reviews</h1>

        {/* Stats */}
        {totalReviews > 0 && (
          <div className="mt-4 flex items-center gap-6 text-gray-600">
            <span className="text-lg">
              <span className="font-bold text-gray-900">{totalReviews}</span> review{totalReviews !== 1 ? 's' : ''}
            </span>
            <span className="text-lg">
              <span className="font-bold text-gray-900">{averageRating.toFixed(1)}</span> average rating
            </span>
          </div>
        )}

        <div className="mt-10">
          {sortedReviews.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No reviews yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {sortedReviews.map((review) => (
                <ReviewCard key={review.id} review={review} showProduct={true} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}