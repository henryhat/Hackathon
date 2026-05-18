import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Flame, Clock, ArrowUpRight } from 'lucide-react'
import { formatPrice } from '../../data/artworks'
import { useLiveBidding } from '../../hooks/useLiveBidding'
import AuctionTimer from '../auction/AuctionTimer'
import BidModal from '../auction/BidModal'
import { staggerItem } from '../../animations/variants'

// ── Verified tick badge ──────────────────────────────────────────────────────
function VerifiedBadge() {
  return (
    <div
      title="Verified Artist"
      className="shrink-0 w-[18px] h-[18px] bg-cobalt-600 rounded-full flex items-center justify-center"
    >
      <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
        <path
          d="M1.5 4.5L3.5 6.5L7.5 2.5"
          stroke="white"
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export default function ProductCard({ artwork }) {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [imageLoaded, setImageLoaded] = useState(false)

  const { currentBid, bidCount, lastBidder, flash, placeBid } = useLiveBidding(
    artwork.currentBid,
    artwork.bids,
    artwork.isAuction
  )

  return (
    <>
      <motion.article
        variants={staggerItem}
        className="group relative bg-white rounded-2xl overflow-hidden border border-ink/6 transition-all duration-300 hover:shadow-[0_8px_40px_rgba(59,110,255,0.10)] hover:-translate-y-1 flex flex-col"
      >
        {/* ── Image ── */}
        <Link to={`/artwork/${artwork.id}`} className="block relative overflow-hidden shrink-0">
          <div className="aspect-[4/5] bg-ivory-warm relative">
            {!imageLoaded && (
              <div className="absolute inset-0 bg-ink/[0.06] animate-pulse" />
            )}
            <img
              src={artwork.image}
              alt={artwork.title}
              className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              onLoad={() => setImageLoaded(true)}
            />

            {/* Gradient overlay on hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-ink/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* View detail pill on hover */}
            <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
              <span className="flex items-center gap-1 text-white text-[11px] font-semibold bg-white/25 backdrop-blur-sm px-3 py-1.5 rounded-full border border-white/30">
                View <ArrowUpRight size={11} />
              </span>
            </div>
          </div>

          {/* ── Top badges ── */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {artwork.hot && (
              <span className="flex items-center gap-1 bg-white/95 text-orange-500 text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                <Flame size={9} /> Hot
              </span>
            )}
            {artwork.isAuction ? (
              <span className="flex items-center gap-1.5 bg-white/95 text-ink text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse shrink-0" />
                Live
              </span>
            ) : (
              <span className="bg-cobalt-600 text-white text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full shadow-sm">
                Buy Now
              </span>
            )}
          </div>
        </Link>

        {/* ── Content ── */}
        <div className="p-4 flex flex-col flex-1">
          {/* Artist row */}
          <div className="flex items-center gap-1.5 mb-2">
            <img
              src={artwork.artist.avatar}
              alt={artwork.artist.name}
              className="w-5 h-5 rounded-full object-cover shrink-0"
            />
            <p className="text-[11px] text-ink/50 font-medium truncate flex-1">
              {artwork.artist.name}
            </p>
            {artwork.artist.verified && <VerifiedBadge />}
            <span className="text-[10px] text-ink/30 shrink-0">{artwork.artist.origin}</span>
          </div>

          {/* Title */}
          <Link to={`/artwork/${artwork.id}`} className="block mb-3">
            <h3 className="font-display text-[15px] leading-snug text-ink hover:text-cobalt-600 transition-colors line-clamp-2">
              {artwork.title}
            </h3>
          </Link>

          {/* ── Pricing block ── */}
          <div className="mt-auto">
            {artwork.isAuction ? (
              <motion.div
                animate={flash ? { backgroundColor: ['rgba(59,110,255,0.06)', 'rgba(59,110,255,0.14)', 'rgba(59,110,255,0)'] } : {}}
                transition={{ duration: 0.6 }}
                className="rounded-xl border border-ink/6 bg-ink/[0.02] p-3"
              >
                {/* Bid row */}
                <div className="flex items-end justify-between mb-2.5">
                  <div>
                    <p className="text-[10px] text-ink/40 uppercase tracking-wider leading-none mb-1">
                      Current Bid
                    </p>
                    <AnimatePresence mode="popLayout">
                      <motion.p
                        key={currentBid}
                        initial={{ y: -8, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        exit={{ y: 8, opacity: 0 }}
                        transition={{ duration: 0.25 }}
                        className="font-display text-xl text-ink leading-none"
                      >
                        {formatPrice(currentBid)}
                      </motion.p>
                    </AnimatePresence>
                  </div>
                  <div className="text-right">
                    <p className="text-[10px] text-ink/40 leading-none mb-1">{bidCount} bids</p>
                    {lastBidder && (
                      <AnimatePresence mode="popLayout">
                        <motion.p
                          key={lastBidder}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="text-[10px] text-cobalt-500 font-medium"
                        >
                          {lastBidder}
                        </motion.p>
                      </AnimatePresence>
                    )}
                  </div>
                </div>

                {/* Timer + bid button row */}
                <div className="flex items-center justify-between gap-2">
                  <div className="flex items-center gap-1 text-ink/40 min-w-0">
                    <Clock size={10} className="shrink-0" />
                    <AuctionTimer endsAt={artwork.endsAt} size="sm" />
                  </div>
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="shrink-0 bg-cobalt-600 hover:bg-cobalt-700 active:scale-95 text-white text-[11px] font-bold px-3.5 py-2 rounded-full transition-all"
                  >
                    Bid Now
                  </button>
                </div>
              </motion.div>
            ) : (
              <div className="flex items-center justify-between rounded-xl border border-ink/6 bg-ink/[0.02] px-3 py-2.5">
                <div>
                  <p className="text-[10px] text-ink/40 uppercase tracking-wider mb-0.5">Fixed Price</p>
                  <p className="font-display text-xl text-ink">{formatPrice(artwork.buyNowPrice)}</p>
                </div>
                <button className="shrink-0 bg-ink hover:bg-ink/80 active:scale-95 text-ivory text-[11px] font-bold px-3.5 py-2 rounded-full transition-all">
                  Buy Now
                </button>
              </div>
            )}
          </div>
        </div>
      </motion.article>

      <BidModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        artwork={artwork}
        currentBid={currentBid}
        onPlaceBid={placeBid}
      />
    </>
  )
}
