import { recentlySold } from '../../data/artworks'

export default function RecentlySoldTicker() {
  const items = [...recentlySold, ...recentlySold] // duplicate for seamless loop

  return (
    <div className="bg-ink text-ivory/80 overflow-hidden py-3 border-y border-ink/5">
      <div className="flex items-center gap-0 animate-ticker whitespace-nowrap">
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 mx-6">
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 shrink-0" />
            <span className="font-body text-xs">
              <span className="text-ivory/50">Sold</span>{' '}
              <span className="font-medium text-ivory">{item.title}</span>{' '}
              <span className="text-green-400 font-mono">{item.price}</span>{' '}
              <span className="text-ivory/40">→ {item.buyer}</span>
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
