import { Skeleton } from "@/components/ui/skeleton";

export default function OrderSkeleton() {
  return (
    <div className="overflow-hidden rounded-sm border border-hairline">
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-5">
        <div className="space-y-2">
          <Skeleton className="h-4 w-28" />
          <Skeleton className="h-3 w-36" />
        </div>

        <div className="flex items-center gap-4">
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-4 w-20" />
          <Skeleton className="h-4 w-4" />
        </div>
      </div>

      {/* Details */}
      <div className="border-t border-hairline px-6 py-5">
        <div className="flex flex-col gap-4">
          {[1, 2].map((item) => (
            <div key={item} className="flex gap-4">
              {/* Image */}
              <Skeleton className="h-20 w-16 shrink-0 rounded-sm" />

              {/* Info */}
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-48" />
              </div>

              {/* Price */}
              <Skeleton className="h-4 w-20" />
            </div>
          ))}
        </div>

        {/* Address / Total */}
        <div className="mt-5 grid gap-6 border-t border-hairline pt-5 sm:grid-cols-2">
          <div className="space-y-2">
            <Skeleton className="mb-3 h-3 w-28" />
            <Skeleton className="h-3 w-32" />
            <Skeleton className="h-3 w-40" />
            <Skeleton className="h-3 w-36" />
            <Skeleton className="h-3 w-24" />
          </div>

          <div className="space-y-2 sm:text-right">
            <Skeleton className="mb-3 ml-auto h-3 w-24" />
            <Skeleton className="ml-auto h-5 w-24" />
          </div>
        </div>
      </div>
    </div>
  );
}