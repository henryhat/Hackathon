import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { motion, useInView } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import HeroSection from '../components/layout/HeroSection'
import RecentlySoldTicker from '../components/ui/RecentlySoldTicker'
import ProductCard from '../components/product/ProductCard'
import { artworks, categories, artists } from '../data/artworks'
import { staggerContainer, staggerItem, fadeUp } from '../animations/variants'

// ── Reusable section heading ──────────────────────────────────────────────────
function SectionHeader({ label, title, subtitle, cta }) {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
      <div>
        <p className="section-label mb-3">{label}</p>
        <h2 className="display-heading text-3xl md:text-4xl text-ink">{title}</h2>
        {subtitle && <p className="text-ink/50 text-sm mt-2 max-w-md">{subtitle}</p>}
      </div>
      {cta && (
        <Link to={cta.href} className="btn-outline shrink-0 self-start md:self-auto">
          {cta.label} <ArrowRight size={14} />
        </Link>
      )}
    </div>
  )
}

// ── Wrapper that triggers stagger animation when scrolled into view ────────────
function AnimatedSection({ children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      variants={staggerContainer}
      initial="initial"
      animate={inView ? 'animate' : 'initial'}
      className={className}
    >
      {children}
    </motion.div>
  )
}

// ─── 1. Live Auctions ─────────────────────────────────────────────────────────
function LiveAuctions() {
  const liveItems = artworks.filter(a => a.isAuction).slice(0, 8)
  return (
    <section className="py-20 max-w-7xl mx-auto px-5 md:px-8">
      <SectionHeader
        label="● Live Now"
        title="Active Auctions"
        subtitle="Real-time bidding on authenticated African masterworks. Prices update live."
        cta={{ label: 'View all auctions', href: '/auctions' }}
      />
      <AnimatedSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {liveItems.map(artwork => (
          <ProductCard key={artwork.id} artwork={artwork} />
        ))}
      </AnimatedSection>
    </section>
  )
}

// ─── 2. Featured Categories ───────────────────────────────────────────────────
function FeaturedCategories() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <section className="py-20 bg-ink">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <div>
            <p className="section-label text-cobalt-400 mb-3">Collections</p>
            <h2 className="display-heading text-3xl md:text-4xl text-ivory">Browse by category</h2>
            <p className="text-ivory/40 text-sm mt-2 max-w-md">
              Six centuries of African cultural production, curated and authenticated.
            </p>
          </div>
          <Link to="/collections" className="border border-white/20 text-ivory/70 hover:border-white/40 hover:text-ivory inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all self-start md:self-auto shrink-0">
            Explore all <ArrowRight size={14} />
          </Link>
        </div>
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          className="grid grid-cols-2 md:grid-cols-3 gap-4"
        >
          {categories.map((cat) => (
            <motion.div key={cat.id} variants={staggerItem}>
              <Link
                to={`/collections/${cat.id}`}
                className="group relative block rounded-2xl overflow-hidden aspect-[4/3]"
              >
                <img
                  src={cat.image}
                  alt={cat.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/80 via-ink/20 to-transparent" />
                <div className="absolute inset-0 p-5 flex flex-col justify-end">
                  <p className="font-display text-xl text-ivory leading-tight">{cat.name}</p>
                  <p className="text-ivory/50 text-xs mt-1">{cat.count} pieces</p>
                </div>
                <div className="absolute top-3 right-3 w-8 h-8 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-1 group-hover:translate-y-0">
                  <ArrowRight size={13} className="text-white" />
                </div>
              </Link>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── 3. Feature Spotlight ─────────────────────────────────────────────────────
function FeatureSpotlight() {
  const featured = artworks.find(a => a.featured && a.isAuction && a.hot)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  if (!featured) return null

  return (
    <section className="py-20 max-w-7xl mx-auto px-5 md:px-8">
      <SectionHeader
        label="Spotlight"
        title="Editor's Pick"
        subtitle="Our most significant piece this week, hand-selected by the Ambassador curatorial team."
      />
      <motion.div
        ref={ref}
        {...fadeUp}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
        className="grid md:grid-cols-2 gap-0 items-stretch bg-white rounded-3xl overflow-hidden border border-ink/5 shadow-[0_8px_40px_rgba(0,0,0,0.06)]"
      >
        {/* Image */}
        <div className="relative min-h-[360px] md:min-h-[500px]">
          <img
            src={featured.images[0]}
            alt={featured.title}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>
        {/* Info */}
        <div className="p-8 md:p-10 flex flex-col justify-between">
          <div className="space-y-5">
            <div>
              <p className="section-label mb-2">{featured.category}</p>
              <h3 className="font-display text-3xl md:text-4xl text-ink leading-tight">{featured.title}</h3>
              <p className="text-ink/40 text-sm mt-1">{featured.origin}</p>
            </div>
            <p className="text-ink/60 text-sm leading-relaxed">{featured.description}</p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: 'Medium', value: featured.medium },
                { label: 'Dimensions', value: featured.dimensions },
                { label: 'Condition', value: featured.condition },
                { label: 'Certificate', value: featured.certificate ? '✓ Included' : 'Not included' },
              ].map(({ label, value }) => (
                <div key={label} className="bg-ivory rounded-xl p-3">
                  <p className="text-[10px] text-ink/40 uppercase tracking-wider">{label}</p>
                  <p className="font-medium text-ink text-sm mt-0.5 leading-snug">{value}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-6">
            <ProductCard artwork={featured} />
          </div>
        </div>
      </motion.div>
    </section>
  )
}

// ─── 4. How It Works ─────────────────────────────────────────────────────────
function HowItWorks() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const steps = [
    { number: '01', title: 'Discover', description: 'Browse thousands of verified African antiques and contemporary works. Filter by era, medium, origin, or price.', icon: '🔍' },
    { number: '02', title: 'Verify', description: 'Every piece is reviewed by our panel of African art scholars and comes with provenance documentation.', icon: '🛡️' },
    { number: '03', title: 'Bid or Buy', description: 'Place bids in real time or purchase outright. Secure payment, worldwide shipping handled end-to-end.', icon: '⚡' },
    { number: '04', title: 'Receive', description: 'Your artwork arrives professionally packed with full documentation and certificate of authenticity.', icon: '📦' },
  ]
  return (
    <section className="py-24 bg-ivory-warm">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="text-center mb-14">
          <p className="section-label mb-3">Process</p>
          <h2 className="display-heading text-3xl md:text-4xl text-ink">How Ambassador works</h2>
          <p className="text-ink/50 text-sm mt-3 max-w-md mx-auto">
            From discovery to your wall — a seamless, trusted experience built for serious collectors.
          </p>
        </div>
        <motion.div
          ref={ref}
          variants={staggerContainer}
          initial="initial"
          animate={inView ? 'animate' : 'initial'}
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.number}
              variants={staggerItem}
              className="relative bg-white rounded-2xl p-6 border border-ink/5"
            >
              <div className="flex items-start justify-between mb-5">
                <span className="text-3xl">{step.icon}</span>
                <span className="font-mono text-xs text-ink/20 font-medium">{step.number}</span>
              </div>
              <h3 className="font-display text-xl text-ink mb-2">{step.title}</h3>
              <p className="text-sm text-ink/50 leading-relaxed">{step.description}</p>
              {i < steps.length - 1 && (
                <div className="hidden md:block absolute top-1/2 -right-2.5 w-5 h-px bg-ink/10 z-10" />
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

// ─── 5. Featured Artists — all 8 ─────────────────────────────────────────────
function FeaturedArtists() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section className="py-20 max-w-7xl mx-auto px-5 md:px-8">
      <SectionHeader
        label="Creators"
        title="Meet the Artists"
        subtitle="The voices shaping the future of African cultural heritage — from Dakar to Nairobi."
        cta={{ label: 'All artists', href: '/artists' }}
      />
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="initial"
        animate={inView ? 'animate' : 'initial'}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
      >
        {artists.map((artist) => (
          <motion.div key={artist.id} variants={staggerItem}>
            <Link
              to={`/artist/${artist.id}`}
              className="group block bg-white rounded-2xl overflow-hidden border border-ink/5 hover:shadow-[0_8px_40px_rgba(59,110,255,0.10)] hover:-translate-y-1 transition-all duration-300"
            >
              {/* Cover image */}
              <div className="relative h-28 overflow-hidden">
                <img
                  src={artist.cover}
                  alt=""
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/60 to-transparent" />
              </div>

              {/* Avatar + info */}
              <div className="px-4 pb-4">
                {/* Avatar overlapping cover */}
                <div className="flex items-end justify-between -mt-7 mb-3">
                  <div className="relative">
                    <img
                      src={artist.avatar}
                      alt={artist.name}
                      className="w-14 h-14 rounded-xl border-3 border-white object-cover shadow-lg"
                    />
                    {/* Verified tick on avatar */}
                    {artist.verified && (
                      <div
                        title="Verified Artist"
                        className="absolute -bottom-1 -right-1 w-5 h-5 bg-cobalt-600 border-2 border-white rounded-full flex items-center justify-center"
                      >
                        <svg width="9" height="9" viewBox="0 0 9 9" fill="none">
                          <path d="M1.5 4.5L3.5 6.5L7.5 2.5" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                  </div>
                  <span className="text-[10px] font-mono text-ink/30 mb-1">★ {artist.rating}</span>
                </div>

                <h3 className="font-display text-base text-ink leading-tight">{artist.name}</h3>
                <p className="text-[11px] text-ink/40 mt-0.5 mb-3">{artist.speciality} · {artist.origin}</p>

                <div className="flex items-center justify-between text-[10px] text-ink/40 pt-3 border-t border-ink/6">
                  <span>{artist.totalSales} sales</span>
                  <span>{artist.totalRevenue}</span>
                  <span>{(artist.followers / 1000).toFixed(1)}k followers</span>
                </div>
              </div>
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

// ─── 6. Browse More Products ──────────────────────────────────────────────────
function BrowseMore() {
  const fixedItems = artworks.filter(a => !a.isAuction)
  return (
    <section className="py-16 bg-ivory-warm">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <SectionHeader
          label="Buy Now"
          title="Fixed Price Works"
          subtitle="Own it today — no bidding required."
          cta={{ label: 'See all', href: '/auctions' }}
        />
        <AnimatedSection className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {fixedItems.map(artwork => (
            <ProductCard key={artwork.id} artwork={artwork} />
          ))}
        </AnimatedSection>
      </div>
    </section>
  )
}

// ─── 7. Final CTA ─────────────────────────────────────────────────────────────
function FinalCTA() {
  return (
    <section className="py-24 bg-cobalt-600 overflow-hidden relative">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-cobalt-400/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-cobalt-900/40 rounded-full blur-3xl" />
      </div>
      <div className="max-w-3xl mx-auto px-5 md:px-8 text-center relative">
        <p className="section-label text-cobalt-200 mb-4">Join Ambassador</p>
        <h2 className="display-heading text-4xl md:text-5xl text-white mb-5 text-balance">
          Start your African art collection today
        </h2>
        <p className="text-cobalt-200 text-base mb-8 max-w-md mx-auto leading-relaxed">
          Whether you're a serious collector, first-time buyer, or an artist wanting to reach global audiences — Ambassador is built for you.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Link to="/register" className="bg-white text-cobalt-700 font-semibold px-8 py-4 rounded-full hover:bg-ivory transition-colors text-sm">
            Create Free Account
          </Link>
          <Link to="/auctions" className="border border-white/30 text-white font-medium px-8 py-4 rounded-full hover:bg-white/10 transition-colors text-sm">
            Browse Auctions
          </Link>
        </div>
      </div>
    </section>
  )
}

// ─── Home ─────────────────────────────────────────────────────────────────────
export default function HomePage() {
  return (
    <div>
      <HeroSection />
      <RecentlySoldTicker />
      <LiveAuctions />
      <FeaturedCategories />
      <FeatureSpotlight />
      <HowItWorks />
      <FeaturedArtists />
      <BrowseMore />
      <FinalCTA />
    </div>
  )
}
