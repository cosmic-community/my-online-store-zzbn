import Link from 'next/link';
import type { ProductCategory } from '@/types';

interface CategoryCardProps {
  category: ProductCategory;
}

export default function CategoryCard({ category }: CategoryCardProps) {
  const name = category.metadata?.name || category.title;
  const description = category.metadata?.description;
  const image = category.metadata?.image;

  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group relative block h-64 overflow-hidden rounded-2xl bg-gray-900 card-hover"
    >
      {image && (
        <img
          src={`${image.imgix_url}?w=800&h=500&fit=crop&auto=format,compress`}
          alt={name}
          width={400}
          height={250}
          className="absolute inset-0 h-full w-full object-cover opacity-60 transition-all duration-500 group-hover:scale-105 group-hover:opacity-50"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/30 to-transparent" />

      <div className="relative flex h-full flex-col justify-end p-6">
        <h3 className="text-xl font-bold text-white">{name}</h3>
        {description && (
          <p className="mt-1 text-sm text-gray-300 line-clamp-2">{description}</p>
        )}
        <span className="mt-3 inline-flex items-center text-sm font-semibold text-brand-300 group-hover:text-brand-200 transition-colors">
          Browse products
          <svg className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </span>
      </div>
    </Link>
  );
}