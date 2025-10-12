const StoreLoadingSkeleton = () => {
  return (
    <div className="px-4 py-6 md:px-2 max-w-2xl mx-auto bg-[#F4F9F4]">
      {/* Header / BrandInformation skeleton */}
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 md:w-20 md:h-20 rounded-xl bg-gray-200 animate-pulse" />
        <div className="flex-1">
          <div className="h-4 w-40 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-3 w-56 bg-gray-200 rounded animate-pulse" />
        </div>
      </div>

      {/* AdditionalDescription skeleton */}
      <div className="space-y-2 mb-6">
        <div className="h-3 w-11/12 bg-gray-200 rounded animate-pulse" />
        <div className="h-3 w-9/12 bg-gray-200 rounded animate-pulse" />
        <div className="h-3 w-7/12 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Categories skeleton (chips) */}
      <div className="flex flex-wrap gap-2 mb-6">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="h-8 w-24 bg-gray-200 rounded-full animate-pulse" />
        ))}
      </div>

      {/* Products skeleton grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="rounded-xl overflow-hidden bg-white shadow">
            <div className="aspect-square bg-gray-200 animate-pulse" />
            <div className="p-3">
              <div className="h-4 w-24 bg-gray-200 rounded animate-pulse mb-2" />
              <div className="h-3 w-16 bg-gray-200 rounded animate-pulse" />
            </div>
          </div>
        ))}
      </div>

      {/* Spinner sutil centrado */}
      <div className="flex items-center justify-center mt-8">
        <div className="inline-block size-6 border-2 border-gray-300 border-t-transparent rounded-full animate-spin" />
        <span className="ml-3 text-sm text-gray-500">Cargando tienda…</span>
      </div>
    </div>
  );
};

export default StoreLoadingSkeleton;
