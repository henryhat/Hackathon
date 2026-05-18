import { useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { Filter, SlidersHorizontal, Grid, LayoutList } from 'lucide-react'
import ProductCard from '../components/product/ProductCard'
import ProductCardSkeleton from '../components/product/ProductCardSkeleton'
import { artworks, categories } from '../data/artworks'
import { staggerContainer, staggerItem, pageTransition } from '../animations/variants'

const SORT_OPTIONS = [
  { label: 'Ending Soon', value: 'ending' },
  { label: 'Highest Bid', value: 'highest' },
  { label: 'Most Bids', value: 'bids' },
  { label: 'Newest', value: 'newest' },
]

export default function AuctionsPage() {
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sort, setSort] = useState('ending')
  const [view, setView] = useState('grid')
  const [loading] = useState(false)

  const filtered = useMemo(() => {
    let items = artworks.filter(a => a.isAuction)
    if (selectedCategory !== 'all') {
      items = items.filter(a => a.category === selectedCategory)
    }
    if (sort === 'ending') items.sort((a, b) => new Date(a.endsAt) - new Date(b.endsAt))
    if (sort === 'highest') items.sort((a, b) => b.currentBid - a.currentBid)
    if (sort === 'bids') items.sort((a, b) => b.bids - a.bids)
    return items
  }, [selectedCategory, sort])

  const auctionCategories = ['all', ...new Set(artworks.filter(a => a.isAuction).map(a => a.category))]

  return (
    <motion.div {...pageTransition} className="min-h-screen bg-ivory">
      {/* Header */}
      <div className="bg-ink pt-28 pb-14">
        <div className="max-w-7xl mx-auto px-5 md:px-8">
          <p className="section-label text-cobalt-400 mb-3 flex items-center gap-2">
            <span className="live-dot" /> Live Auctions
          </p>
          <h1 className="display-heading text-4xl md:text-5xl text-ivory mb-3">Active Bidding</h1>
          <p className="text-ivory/40 max-w-md text-sm leading-relaxed">
            {artworks.filter(a => a.isAuction).length} auctions live right now. Bidding closes in real time.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 py-10">
        {/* Filter bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          {/* Category tabs */}
          <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
            {auctionCategories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === cat
                    ? 'bg-ink text-ivory'
                    : 'bg-white border border-ink/10 text-ink/60 hover:border-ink/30'
                }`}
              >
                {cat === 'all' ? 'All Categories' : cat}
              </button>
            ))}
          </div>

          {/* Sort & view */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-ink/10 rounded-full px-4 py-2">
              <SlidersHorizontal size={14} className="text-ink/40" />
              <select
                value={sort}
                onChange={e => setSort(e.target.value)}
                className="text-sm text-ink bg-transparent focus:outline-none"
              >
                {SORT_OPTIONS.map(o => (
                  <option key={o.value} value={o.value}>{o.label}</option>
                ))}
              </select>
            </div>
            <div className="hidden md:flex items-center bg-white border border-ink/10 rounded-full p-1 gap-1">
              <button
                onClick={() => setView('grid')}
                className={`p-2 rounded-full transition-all ${view === 'grid' ? 'bg-ink text-ivory' : 'text-ink/40 hover:text-ink'}`}
              >
                <Grid size={14} />
              </button>
              <button
                onClick={() => setView('list')}
                className={`p-2 rounded-full transition-all ${view === 'list' ? 'bg-ink text-ivory' : 'text-ink/40 hover:text-ink'}`}
              >
                <LayoutList size={14} />
              </button>
            </div>
          </div>
        </div>

        {/* Results */}
        <p className="text-xs text-ink/40 mb-6">{filtered.length} results</p>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => <ProductCardSkeleton key={i} />)}
          </div>
        ) : (
          <motion.div
            variants={staggerContainer}
            initial="initial"
            animate="animate"
            className={`grid gap-5 ${
              view === 'grid'
                ? 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'
                : 'grid-cols-1 sm:grid-cols-2'
            }`}
          >
            {filtered.map(artwork => (
              <ProductCard key={artwork.id} artwork={artwork} />
            ))}
          </motion.div>
        )}

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="text-4xl mb-3">🔍</p>
            <h3 className="font-display text-2xl text-ink mb-2">No auctions found</h3>
            <p className="text-ink/40 text-sm">Try a different category filter</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
