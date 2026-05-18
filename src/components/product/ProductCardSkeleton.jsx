export default function ProductCardSkeleton({ featured = false }) {
  return (
    <div className={`bg-white rounded-2xl overflow-hidden border border-ink/5 ${featured ? 'md:col-span-2' : ''}`}>
      <div className={`skeleton ${featured ? 'aspect-[4/3]' : 'aspect-[3/4]'}`} />
      <div className="p-4 space-y-3">
        <div className="skeleton h-3 w-1/3 rounded" />
        <div className="skeleton h-5 w-3/4 rounded" />
        <div className="skeleton h-16 w-full rounded-xl" />
      </div>
    </div>
  )
}
