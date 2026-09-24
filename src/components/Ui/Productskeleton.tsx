export function ProductCardSkeleton() {
  return (
    <div className="overflow-hidden rounded-2xl border border-gray-100">
      <div className="aspect-square animate-pulse bg-gray-100" />
      <div className="space-y-2.5 p-4">
        <div className="h-2.5 w-1/3 animate-pulse rounded bg-gray-100" />
        <div className="h-4 w-full animate-pulse rounded bg-gray-100" />
        <div className="h-4 w-2/3 animate-pulse rounded bg-gray-100" />
        <div className="h-3 w-1/2 animate-pulse rounded bg-gray-100" />
        <div className="h-10 w-full animate-pulse rounded-lg bg-gray-100" />
      </div>
    </div>
  );
}

export function ProductGridSkeleton({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-4 gap-6 max-[1100px]:grid-cols-3 max-[840px]:grid-cols-2 max-[840px]:gap-[18px] max-[520px]:gap-3.5">
      {Array.from({ length: count }).map((_, i) => (
        <ProductCardSkeleton key={i} />
      ))}
    </div>
  );
}