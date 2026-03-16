import Link from 'next/link';
import type { CustomerReview } from '@/types';
import { getMetafieldValue } from '@/types';
import StarRating from '@/components/StarRating';

interface ReviewCardProps {
  review: CustomerReview;
  showProduct?: boolean;
}

export default function ReviewCard({ review, showProduct = true }: ReviewCardProps) {
  const reviewerName = review.metadata?.reviewer_name || 'Anonymous';
  const rating = review.metadata?.rating || 0;
  const reviewText = review.metadata?.review || '';
  const product = review.metadata?.product;
  const verifiedRaw = review.metadata?.verified_purchase;
  const isVerified =
    verifiedRaw === true ||
    getMetafieldValue(verifiedRaw) === 'true' ||
    getMetafieldValue(verifiedRaw) === 'True';

  const dateStr = new Date(review.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <div className="rounded-xl bg-white border border-gray-200 p-6 flex flex-col h-full">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-9 w-9 rounded-full bg-brand-100 flex items-center justify-center">
              <span className="text-sm font-bold text-brand-700">
                {reviewerName.charAt(0).toUpperCase()}
              </span>
            </div>
            <div>
              <p className="text-sm font-semibold text-gray-900">{reviewerName}</p>
              <p className="text-xs text-gray-400">{dateStr}</p>
            </div>
          </div>
        </div>
        {isVerified && (
          <span className="inline-flex items-center gap-1 rounded-full bg-green-50 px-2.5 py-0.5 text-xs font-medium text-green-700">
            <svg className="h-3 w-3" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
            </svg>
            Verified
          </span>
        )}
      </div>

      {/* Rating */}
      <StarRating rating={rating} />

      {/* Review text */}
      {reviewText && (
        <p className="mt-3 text-sm text-gray-600 leading-relaxed flex-1 line-clamp-4">
          {reviewText}
        </p>
      )}

      {/* Product link */}
      {showProduct && product && (
        <div className="mt-4 pt-4 border-t border-gray-100">
          <Link
            href={`/products/${product.slug}`}
            className="text-xs font-semibold text-brand-600 hover:text-brand-700 transition-colors"
          >
            Re: {product.title}
          </Link>
        </div>
      )}
    </div>
  );
}