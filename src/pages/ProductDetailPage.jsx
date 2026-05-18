import { useState, useEffect } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, Heart, Share2, ShieldCheck, Package, Globe, Award, ChevronRight, Bell, TrendingUp, Clock, Users } from 'lucide-react'
import { artworks, formatPrice } from '../data/artworks'
import { useLiveBidding } from '../hooks/useLiveBidding'
import { useAuth } from '../context/AuthContext'
import AuctionTimer from '../components/auction/AuctionTimer'
import BidModal from '../components/auction/BidModal'
import ProductCard from '../components/product/ProductCard'
import { pageTransition, staggerContainer, staggerItem, fadeUp, fadeIn } from '../animations/variants'

// ── Outbid toast notification ─────────────────────────────────────────────────
function OutbidToast({ visible, amount, onBidAgain }) {
  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: -80, x: '-50%' }}
          animate={{ opacity: 1, y: 0, x: '-50%' }}
          exit={{ opacity: 0, y: -80, x: '-50%' }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="fixed top-20 left-1/2 z-50 bg-red-600 text-white rounded-2xl px-5 py-4 shadow-2xl shadow-red-600/30 flex items-center gap-4 max-w-sm w-full"
        >
          <Bell size={20} className="shrink-0 animate-bounce" />
          <div className="flex-1 min-w-0">
            <p className="font-bold text-sm">You've been outbid!</p>
            <p className="text-xs text-red-200 mt-0.5">New price: <strong className="text-white">{formatPrice(amount)}</strong></p>
          </div>
          <button onClick={onBidAgain}
            className="bg-white text-red-600 font-bold text-xs px-3 py-2 rounded-xl hover:bg-red-50 transition-colors shrink-0">
            Bid Again
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

// ── Live activity feed ────────────────────────────────────────────────────────
function ActivityFeed({ log }) {
  if (!log.length) return null
  return (
    <div className="space-y-2">
      <p className="text-[10px] text-ink/40 uppercase tracking-widest font-semibold">Live Activity</p>
      <div className="space-y-1.5 max-h-44 overflow-y-auto scrollbar-hide">
        <AnimatePresence initial={false}>
          {log.map((entry) => (
            <motion.div
              key={entry.id}
              initial={{ opacity: 0, x: -16, height: 0 }}
              animate={{ opacity: 1, x: 0, height: 'auto' }}
              transition={{ duration: 0.3 }}
              className={`flex items-center justify-between text-xs rounded-lg px-3 py-2 ${
                entry.bidder.includes('You')
                  ? 'bg-cobalt-50 border border-cobalt-100 text-cobalt-700'
                  : 'bg-ink/[0.03] text-ink/60'
              }`}
            >
              <span className="font-medium">{entry.bidder}</span>
              <span className="font-mono font-bold">{formatPrice(entry.amount)}</span>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  )
}

export default function ProductDetailPage() {
  const { id }      = useParams()
  const navigate    = useNavigate()
  const { isLoggedIn } = useAuth()
  const artwork     = artworks.find(a => a.id === id) || artworks[0]
  const [selectedImage, setSelectedImage] = useState(0)
  const [isModalOpen, setIsModalOpen]     = useState(false)
  const [liked, setLiked]                 = useState(false)
  const [activeTab, setActiveTab]         = useState('details')

  const { currentBid, bidCount, lastBidder, flash, isWinning, isOutbid, activityLog, placeBid } = useLiveBidding(
    artwork.currentBid, artwork.bids, artwork.isAuction
  )

  const related = artworks.filter(a => a.id !== artwork.id && a.category === artwork.category).slice(0, 3)

  const handleBuyNow = () => {
    if (!isLoggedIn) { navigate('/login', { state: { from: { pathname: `/artwork/${id}` } } }); return }
    navigate('/checkout', { state: { artwork, finalPrice: artwork.buyNowPrice, type: 'buynow' } })
  }

  const handleFollow = () => {
    if (!isLoggedIn) navigate('/login', { state: { from: { pathname: `/artwork/${id}` } } })
  }

  return (
    <motion.div {...pageTransition} className="min-h-screen bg-ivory">
      <OutbidToast visible={isOutbid} amount={currentBid} onBidAgain={() => setIsModalOpen(true)} />

      {/* Back */}
      <div className="pt-20 pb-4 max-w-7xl mx-auto px-5 md:px-8">
        <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-ink/50 hover:text-ink transition-colors">
          <ArrowLeft size={14} /> Back
        </button>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 pb-20">
        <div className="grid lg:grid-cols-2 gap-10">

          {/* ── Left: Image gallery ── */}
          <div className="space-y-3">
            <motion.div
              className="rounded-2xl overflow-hidden bg-ivory-warm relative"
              style={{ aspectRatio: '3/4' }}
            >
              <AnimatePresence mode="wait">
                <motion.img
                  key={selectedImage}
                  initial={{ opacity: 0, scale: 1.04 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  src={artwork.images[selectedImage] || artwork.image}
                  alt={artwork.title}
                  className="w-full h-full object-cover"
                />
              </AnimatePresence>
              {/* Winning badge overlay */}
              <AnimatePresence>
                {isWinning && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1.5 rounded-full flex items-center gap-1.5 shadow-lg"
                  >
                    <TrendingUp size={12} /> You're Winning!
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
            {artwork.images.length > 1 && (
              <div className="flex gap-2">
                {artwork.images.map((img, i) => (
                  <motion.button key={i} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                    onClick={() => setSelectedImage(i)}
                    className={`rounded-xl overflow-hidden w-20 aspect-square border-2 transition-all ${selectedImage === i ? 'border-cobalt-600 shadow-lg' : 'border-transparent'}`}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </motion.button>
                ))}
              </div>
            )}
          </div>

          {/* ── Right: Info ── */}
          <div className="space-y-6">
            {/* Artist row */}
            <div className="flex items-center justify-between">
              <Link to={`/artist/${artwork.artist.id}`}
                className="flex items-center gap-3 group">
                <img src={artwork.artist.avatar} alt="" className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-md" />
                <div>
                  <p className="font-semibold text-ink text-sm group-hover:text-cobalt-600 transition-colors">{artwork.artist.name}</p>
                  <p className="text-xs text-ink/40">{artwork.artist.origin}</p>
                </div>
                <ChevronRight size={14} className="text-ink/30 group-hover:text-cobalt-500 transition-colors" />
              </Link>
              <div className="flex items-center gap-2">
                <motion.button whileTap={{ scale: 0.9 }}
                  onClick={() => { if (!isLoggedIn) { navigate('/login'); return } setLiked(!liked) }}
                  className={`p-2.5 rounded-full border transition-all ${liked ? 'border-red-200 bg-red-50 text-red-500' : 'border-ink/10 text-ink/40 hover:border-red-200 hover:text-red-400'}`}>
                  <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
                </motion.button>
                <motion.button whileTap={{ scale: 0.9 }}
                  className="p-2.5 rounded-full border border-ink/10 text-ink/40 hover:border-ink/20 transition-all">
                  <Share2 size={16} />
                </motion.button>
              </div>
            </div>

            {/* Title */}
            <div>
              {artwork.isAuction
                ? <p className="section-label flex items-center gap-1.5 mb-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> Live Auction</p>
                : <p className="section-label text-green-600 mb-2">Fixed Price</p>
              }
              <h1 className="font-display text-3xl md:text-4xl text-ink leading-tight">{artwork.title}</h1>
              <p className="text-ink/40 text-sm mt-1">{artwork.origin}</p>
            </div>

            {/* ── Bid / Buy panel ── */}
            <motion.div
              className="bg-white rounded-2xl border border-ink/6 p-5 space-y-4"
              animate={flash ? { boxShadow: ['0 0 0 0 rgba(59,110,255,0)', '0 0 0 8px rgba(59,110,255,0.15)', '0 0 0 0 rgba(59,110,255,0)'] } : {}}
              transition={{ duration: 0.7 }}
            >
              {artwork.isAuction ? (
                <>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-[10px] text-ink/40 uppercase tracking-wider mb-1">Current Bid</p>
                      <AnimatePresence mode="popLayout">
                        <motion.p key={currentBid}
                          initial={{ y: -12, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 12, opacity: 0 }}
                          className="font-display text-3xl text-ink">{formatPrice(currentBid)}</motion.p>
                      </AnimatePresence>
                      <p className="text-xs text-ink/40 mt-0.5 flex items-center gap-1">
                        <Users size={10} /> {bidCount} bids
                        {lastBidder && <span className="text-cobalt-500 ml-1">· {lastBidder}</span>}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] text-ink/40 uppercase tracking-wider mb-1 flex items-center gap-1"><Clock size={10} /> Ends In</p>
                      <AuctionTimer endsAt={artwork.endsAt} />
                    </div>
                  </div>

                  <ActivityFeed log={activityLog} />

                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => setIsModalOpen(true)}
                    className="btn-primary w-full justify-center py-4 rounded-xl text-base font-bold shadow-lg shadow-cobalt-600/20">
                    Place Bid — from {formatPrice(Math.ceil(currentBid * 1.05))}
                  </motion.button>

                  {artwork.buyNowPrice && (
                    <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}
                      onClick={handleBuyNow}
                      className="w-full border-2 border-ink/10 py-3.5 rounded-xl text-sm font-semibold text-ink/70 hover:border-cobalt-400 hover:text-cobalt-600 transition-all">
                      Skip Bidding — Buy Now for {formatPrice(artwork.buyNowPrice)}
                    </motion.button>
                  )}
                </>
              ) : (
                <>
                  <div>
                    <p className="text-[10px] text-ink/40 uppercase tracking-wider mb-1">Fixed Price</p>
                    <p className="font-display text-3xl text-ink">{formatPrice(artwork.buyNowPrice)}</p>
                    <p className="text-xs text-green-600 mt-0.5 font-medium">✓ Available now — no bidding</p>
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={handleBuyNow}
                    className="btn-primary w-full justify-center py-4 rounded-xl text-base font-bold shadow-lg shadow-cobalt-600/20">
                    Buy Now — {formatPrice(artwork.buyNowPrice)}
                  </motion.button>
                </>
              )}

              {/* Trust row */}
              <div className="flex items-center justify-around pt-3 border-t border-ink/5 text-[10px] text-ink/40">
                <span className="flex items-center gap-1"><ShieldCheck size={12} className="text-green-500" /> Authenticated</span>
                <span className="flex items-center gap-1"><Package size={12} className="text-cobalt-400" /> Insured</span>
                <span className="flex items-center gap-1"><Globe size={12} /> Worldwide</span>
              </div>
            </motion.div>

            {/* ── Tabs ── */}
            <div>
              <div className="flex gap-1 bg-white rounded-xl border border-ink/5 p-1 mb-5">
                {['details', 'provenance', 'shipping'].map(tab => (
                  <button key={tab} onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-semibold transition-all capitalize ${
                      activeTab === tab ? 'bg-ink text-ivory shadow-sm' : 'text-ink/50 hover:text-ink'
                    }`}>
                    {tab}
                  </button>
                ))}
              </div>

              <AnimatePresence mode="wait">
                {activeTab === 'details' && (
                  <motion.div key="d" {...fadeIn} className="space-y-4">
                    <p className="text-sm text-ink/60 leading-relaxed">{artwork.description}</p>
                    <div className="grid grid-cols-2 gap-3">
                      {[
                        { label: 'Medium', value: artwork.medium },
                        { label: 'Dimensions', value: artwork.dimensions },
                        { label: 'Condition', value: artwork.condition },
                        { label: 'Certificate', value: artwork.certificate ? '✓ Included' : 'Not included' },
                      ].map(({ label, value }) => (
                        <div key={label} className="bg-white rounded-xl p-3.5 border border-ink/5">
                          <p className="text-[10px] text-ink/40 uppercase tracking-wider">{label}</p>
                          <p className="text-sm font-semibold text-ink mt-0.5">{value}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}
                {activeTab === 'provenance' && (
                  <motion.div key="p" {...fadeIn} className="bg-white rounded-xl p-5 border border-ink/5">
                    <div className="flex items-start gap-3 mb-4">
                      <Award size={16} className="text-gold mt-0.5 shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-ink">Provenance Record</p>
                        <p className="text-xs text-ink/40">Verified by Ambassador authentication team</p>
                      </div>
                    </div>
                    <p className="text-sm text-ink/60 leading-relaxed">{artwork.provenance}</p>
                  </motion.div>
                )}
                {activeTab === 'shipping' && (
                  <motion.div key="s" {...fadeIn} className="space-y-3">
                    {[
                      { title: 'Professional packing', desc: 'Museum-grade crating for fragile pieces' },
                      { title: 'Full insurance', desc: 'Covered for declared value during transit' },
                      { title: 'Worldwide delivery', desc: '15–30 business days to most destinations' },
                      { title: 'Export documentation', desc: 'All CITES and export permits handled' },
                    ].map(({ title, desc }) => (
                      <div key={title} className="flex items-start gap-3 bg-white rounded-xl p-4 border border-ink/5">
                        <div className="w-5 h-5 rounded-full bg-cobalt-100 flex items-center justify-center shrink-0 mt-0.5">
                          <div className="w-2 h-2 rounded-full bg-cobalt-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-ink">{title}</p>
                          <p className="text-xs text-ink/40 mt-0.5">{desc}</p>
                        </div>
                      </div>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div className="mt-20">
            <h2 className="font-display text-2xl text-ink mb-6">More from this category</h2>
            <motion.div variants={staggerContainer} initial="initial" animate="animate"
              className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {related.map(a => <ProductCard key={a.id} artwork={a} />)}
            </motion.div>
          </div>
        )}
      </div>

      <BidModal
        isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}
        artwork={artwork} currentBid={currentBid} onPlaceBid={placeBid}
      />
    </motion.div>
  )
}
