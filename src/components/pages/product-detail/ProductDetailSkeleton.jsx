"use client";

function Skeleton({ className }) {
  return (
    <div className={`animate-pulse bg-slate-200 rounded-xl ${className}`} />
  );
}

export default function ProductDetailSkeleton() {
  return (
    <div className="pt-16">
      {/* Hero skeleton */}
      <div className="relative bg-white py-20 px-4 sm:px-6 lg:px-10">
        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="flex gap-2 mb-5">
              <Skeleton className="w-24 h-6" />
              <Skeleton className="w-20 h-6" />
            </div>
            <Skeleton className="w-3/4 h-16 mb-4" />
            <Skeleton className="w-full h-5 mb-2" />
            <Skeleton className="w-5/6 h-5 mb-8" />
            <div className="flex flex-col gap-3 mb-8">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="flex items-center gap-3">
                  <Skeleton className="w-4 h-4 rounded-full" />
                  <Skeleton className="w-48 h-4" />
                </div>
              ))}
            </div>
            <div className="flex gap-3">
              <Skeleton className="w-40 h-12" />
              <Skeleton className="w-40 h-12" />
            </div>
          </div>
          <div className="flex justify-end">
            <Skeleton className="w-full max-w-sm h-72 rounded-3xl" />
          </div>
        </div>
      </div>

      {/* Features skeleton */}
      <div className="py-16 px-4 sm:px-6 lg:px-10 bg-slate-50">
        <div className="max-w-7xl mx-auto">
          <Skeleton className="w-32 h-6 mb-4" />
          <Skeleton className="w-56 h-10 mb-10" />
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[...Array(6)].map((_, i) => (
              <Skeleton key={i} className="h-20" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
