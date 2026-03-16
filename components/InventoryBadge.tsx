interface InventoryBadgeProps {
  status: string;
  size?: 'sm' | 'md';
}

export default function InventoryBadge({ status, size = 'md' }: InventoryBadgeProps) {
  const normalizedStatus = status.toLowerCase().trim();

  let colorClasses: string;
  let dotColor: string;

  if (normalizedStatus.includes('out of stock') || normalizedStatus === 'out-of-stock') {
    colorClasses = 'bg-red-50 text-red-700';
    dotColor = 'bg-red-500';
  } else if (normalizedStatus.includes('low') || normalizedStatus === 'low-stock') {
    colorClasses = 'bg-yellow-50 text-yellow-700';
    dotColor = 'bg-yellow-500';
  } else {
    colorClasses = 'bg-green-50 text-green-700';
    dotColor = 'bg-green-500';
  }

  const sizeClasses = size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm';

  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full font-medium ${colorClasses} ${sizeClasses}`}>
      <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
      {status}
    </span>
  );
}