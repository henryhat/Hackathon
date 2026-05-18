import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, MapPin, ShoppingBag, TrendingUp, Users, Star, ExternalLink, Heart } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { artists, artworks } from '../data/artworks'
import ProductCard from '../components/product/ProductCard'
import { pageTransition, staggerContainer, staggerItem } from '../animations/variants'

// ── Solid blue verified badge ─────────────────────────────────────────────────
function VerifiedBadge() {
  return (
    <span className="inline-flex items-center gap-1.5 bg-cobalt-600 text-white text-[11px] font-bold px-3 py-1 rounded-full tracking-wide shrink-0">
      <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
        <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Verified
    </span>
  )
}

function StarRating({ rating }) {
  return (
    <div className="flex items-center gap-1">
      {[...Array(5)].map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 12 12"
          fill={i < Math.floor(rating) ? '#C9A84C' : '#E5E7EB'}>
          <path d="M6 1l1.4 2.8 3.1.45-2.25 2.2.53 3.1L6 8.1 3.22 9.55l.53-3.1L1.5 4.25l3.1-.45z"/>
        </svg>
      ))}
      <span className="text-xs text-ink/50 ml-1.5 font-mono">{rating} / 5.0</span>
    </div>
  )
}

export default function ArtistPage() {
  const { id } = useParams()
  const artist = artists.find(a => a.id === id) || artists[0]
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()
  const artistWorks = artworks.filter(a => a.artist.id === artist.id)
  const liveWorks = artistWorks.filter(a => a.isAuction)
  const fixedWorks = artistWorks.filter(a => !a.isAuction)

  return (
    <motion.div {...pageTransition} className="min-h-screen bg-ivory">

      {/* ══════════════════════════════════════════════════
          COVER BANNER — full bleed, tall, nothing overlaps
      ══════════════════════════════════════════════════ */}
      <div className="relative w-full h-64 md:h-80 lg:h-96 overflow-hidden">
        {/*
          ╔══════════════════════════════════════════════════╗
          ║  TO CHANGE THE BACKGROUND / COVER IMAGE:        ║
          ║  Open src/data/artworks.js                      ║
          ║  Find the artist by name                        ║
          ║  Change the `cover` URL to your own image URL   ║
          ║  e.g.  cover: '/images/zainab-cover.jpg'        ║
          ╚══════════════════════════════════════════════════╝
        */}
        <img
          src={artist.cover}
          alt={`${artist.name} studio`}
          className="w-full h-full object-cover object-center"
        />
        {/* Subtle darkening — keeps back button readable without killing the image */}
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/10 to-ink/20" />

        {/* Back button — top left, inside the cover */}
        <div className="absolute top-0 left-0 right-0 pt-20 px-5 md:px-8 max-w-7xl mx-auto">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-white/90 hover:text-white text-sm font-medium
                       bg-black/25 backdrop-blur-md px-4 py-2 rounded-full border border-white/20
                       transition-all hover:bg-black/40"
          >
            <ArrowLeft size={14} /> Back to Home
          </Link>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          PROFILE IDENTITY BLOCK — sits BELOW the cover
          Has the avatar, name, verified, specialty, CTA
      ══════════════════════════════════════════════════ */}
      <div className="bg-white border-b border-ink/8 shadow-sm">
        <div className="max-w-7xl mx-auto px-5 md:px-8">

          {/* Avatar floats UP from the white bar into the cover gap */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-5 pt-0">

            {/* Left: avatar + name block */}
            <div className="flex items-end gap-5 -mt-10 md:-mt-12">
              {/*
                ╔══════════════════════════════════════════════════╗
                ║  TO CHANGE THE ARTIST PROFILE PHOTO:            ║
                ║  Open src/data/artworks.js                      ║
                ║  Find the artist by name                        ║
                ║  Change the `avatar` URL                        ║
                ║  e.g.  avatar: '/images/zainab-face.jpg'        ║
                ╚══════════════════════════════════════════════════╝
              */}
              <div className="relative shrink-0">
                <img
                  src={artist.avatar}
                  alt={artist.name}
                  className="w-24 h-24 md:w-28 md:h-28 rounded-2xl object-cover
                             border-[4px] border-white shadow-[0_4px_24px_rgba(0,0,0,0.18)]"
                />
                {/* Blue tick badge on avatar corner */}
                {artist.verified && (
                  <div
                    title="Verified Artist"
                    className="absolute -bottom-2 -right-2 w-7 h-7 bg-cobalt-600
                               border-[3px] border-white rounded-full
                               flex items-center justify-center shadow-md"
                  >
                    <svg width="11" height="11" viewBox="0 0 11 11" fill="none">
                      <path d="M2 5.5L4.5 8L9 3" stroke="white" strokeWidth="1.8"
                        strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </div>
                )}
              </div>

              {/* Name, verified pill, specialty — all on white background so they're readable */}
              <div className="pb-5 md:pb-6 pt-3">
                <div className="flex flex-wrap items-center gap-2.5 mb-1.5">
                  <h1 className="font-display text-2xl md:text-3xl lg:text-4xl text-ink leading-none">
                    {artist.name}
                  </h1>
                  {artist.verified && <VerifiedBadge />}
                </div>
                <div className="flex items-center gap-1.5 text-ink/50 text-sm mb-2">
                  <MapPin size={13} />
                  <span>{artist.speciality} · {artist.origin}</span>
                </div>
                <StarRating rating={artist.rating} />
              </div>
            </div>

            {/* Right: Follow + Contact — bottom-aligned on desktop */}
            <div className="hidden md:flex items-center gap-2.5 pb-6">
              <button className="inline-flex items-center gap-2 border border-ink/15 text-ink font-medium
                                 px-6 py-2.5 rounded-full text-sm hover:border-cobalt-400 hover:text-cobalt-600
                                 transition-all">
                Follow
              </button>
              <button className="inline-flex items-center gap-2 bg-cobalt-600 text-white font-semibold
                                 px-6 py-2.5 rounded-full text-sm hover:bg-cobalt-700 transition-all shadow-md">
                Contact Artist
              </button>
            </div>
          </div>

          {/* Quick bio strip + mobile buttons */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 md:pb-6 border-t border-ink/5 pt-4 mt-1">
            <p className="text-sm text-ink/50 max-w-xl leading-relaxed line-clamp-2">
              {artist.bio}
            </p>
            {/* Mobile CTA */}
            <div className="flex md:hidden items-center gap-2 shrink-0">
              <button className="flex-1 border border-ink/15 text-ink font-medium px-4 py-2.5 rounded-full text-sm text-center hover:border-cobalt-400 transition-all">
                Follow
              </button>
              <button className="flex-1 bg-cobalt-600 text-white font-semibold px-4 py-2.5 rounded-full text-sm text-center hover:bg-cobalt-700 transition-all">
                Contact
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════
          MAIN BODY
      ══════════════════════════════════════════════════ */}
      <div className="max-w-7xl mx-auto px-5 md:px-8 py-10">

        {/* ── Stats row ─────────────────────────────────── */}
        <motion.div
          variants={staggerContainer}
          initial="initial"
          animate="animate"
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {[
            { icon: ShoppingBag, label: 'Total Sales',    value: artist.totalSales,              color: 'bg-cobalt-50 text-cobalt-600' },
            { icon: TrendingUp,  label: 'Revenue Earned', value: artist.totalRevenue,             color: 'bg-green-50 text-green-600' },
            { icon: Users,       label: 'Followers',      value: artist.followers.toLocaleString(), color: 'bg-purple-50 text-purple-600' },
            { icon: Star,        label: 'Avg Rating',     value: `${artist.rating} / 5`,          color: 'bg-amber-50 text-amber-600' },
          ].map(({ icon: Icon, label, value, color }) => (
            <motion.div
              key={label}
              variants={staggerItem}
              className="bg-white rounded-2xl p-5 border border-ink/5 flex items-start gap-4"
            >
              <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${color}`}>
                <Icon size={17} />
              </div>
              <div>
                <p className="text-[10px] text-ink/40 uppercase tracking-wider mb-1">{label}</p>
                <p className="font-display text-xl text-ink leading-tight">{value}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* ── About + Details ───────────────────────────── */}
        <div className="grid md:grid-cols-3 gap-8 mb-14">
          <div className="md:col-span-2 space-y-4">
            <h2 className="font-display text-2xl text-ink">About {artist.name.split(' ')[0]}</h2>
            <p className="text-ink/60 text-sm leading-relaxed">{artist.bio}</p>
            <p className="text-ink/40 text-sm leading-relaxed">
              All works by {artist.name.split(' ')[0]} come with provenance documentation and are covered under
              Ambassador's Authentication Guarantee. Shipping is handled by our specialist art logistics team.
            </p>
            <a href="#" className="inline-flex items-center gap-1.5 text-cobalt-600 text-sm font-medium hover:underline">
              View full portfolio <ExternalLink size={13} />
            </a>
          </div>
          <div className="bg-white rounded-2xl border border-ink/5 overflow-hidden h-fit">
            <div className="px-5 py-4 border-b border-ink/6">
              <p className="text-xs font-semibold text-ink/40 uppercase tracking-wider">Artist Details</p>
            </div>
            <div className="divide-y divide-ink/5">
              {[
                { label: 'Speciality',  value: artist.speciality },
                { label: 'Based In',    value: artist.origin },
                { label: 'Active Since', value: '2009' },
                { label: 'Pieces',      value: `${artistWorks.length} listed` },
                { label: 'Status',      value: artist.verified ? '✓ Verified Seller' : 'Pending', cobalt: artist.verified },
              ].map(({ label, value, cobalt }) => (
                <div key={label} className="px-5 py-3.5 flex items-center justify-between">
                  <p className="text-[10px] text-ink/40 uppercase tracking-wider">{label}</p>
                  <p className={`text-sm font-semibold ${cobalt ? 'text-cobalt-600' : 'text-ink'}`}>{value}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Live Auctions ─────────────────────────────── */}
        {liveWorks.length > 0 && (
          <div className="mb-14">
            <div className="flex items-center gap-3 mb-6">
              <div>
                <p className="section-label flex items-center gap-1.5 mb-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-red-500 animate-pulse" /> Live Auctions
                </p>
                <h2 className="font-display text-2xl text-ink">
                  Bidding now
                  <span className="text-ink/30 text-lg ml-2">({liveWorks.length})</span>
                </h2>
              </div>
            </div>
            <motion.div
              variants={staggerContainer} initial="initial" animate="animate"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {liveWorks.map(a => <ProductCard key={a.id} artwork={a} />)}
            </motion.div>
          </div>
        )}

        {/* ── Fixed Price Works ─────────────────────────── */}
        {fixedWorks.length > 0 && (
          <div className="mb-14">
            <div className="mb-6">
              <p className="section-label mb-1">Fixed Price</p>
              <h2 className="font-display text-2xl text-ink">
                Buy Now
                <span className="text-ink/30 text-lg ml-2">({fixedWorks.length})</span>
              </h2>
            </div>
            <motion.div
              variants={staggerContainer} initial="initial" animate="animate"
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
            >
              {fixedWorks.map(a => <ProductCard key={a.id} artwork={a} />)}
            </motion.div>
          </div>
        )}

        {artistWorks.length === 0 && (
          <div className="text-center py-20 bg-white rounded-2xl border border-ink/5">
            <p className="text-5xl mb-4">🎨</p>
            <h3 className="font-display text-2xl text-ink mb-2">No works listed yet</h3>
            <p className="text-sm text-ink/40">Check back soon — {artist.name.split(' ')[0]} is adding pieces.</p>
          </div>
        )}
      </div>
    </motion.div>
  )
}
