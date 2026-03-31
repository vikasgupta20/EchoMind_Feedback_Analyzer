export default function SkeletonLoader() {
  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto p-6">
      {/* Title skeleton */}
      <div className="skeleton h-8 w-72 mx-auto" />
      <div className="skeleton h-4 w-48 mx-auto" />

      {/* Gauge skeleton */}
      <div className="flex justify-center my-8">
        <div className="skeleton w-36 h-36 rounded-full" />
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="glass-card p-5 space-y-3">
            <div className="skeleton h-5 w-40" />
            <div className="skeleton h-3 w-full" />
            <div className="skeleton h-3 w-3/4" />
            <div className="skeleton h-3 w-1/2" />
          </div>
        ))}
      </div>

      {/* Bottom cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {[...Array(2)].map((_, i) => (
          <div key={i} className="glass-card p-5 space-y-3">
            <div className="skeleton h-5 w-32" />
            <div className="flex gap-2">
              {[...Array(4)].map((_, j) => (
                <div key={j} className="skeleton h-7 w-16 rounded-full" />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
