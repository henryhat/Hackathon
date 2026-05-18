import { useState } from 'react'
import { useLocation, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { ArrowLeft, ShieldCheck, Lock, Package, Globe, CreditCard, Banknote, CheckCircle2 } from 'lucide-react'
import { formatPrice } from '../data/artworks'
import { pageTransition, staggerContainer, staggerItem, fadeUp } from '../animations/variants'

const PAYMENT_METHODS = [
  { id: 'card',    label: 'Debit / Credit Card',  icon: CreditCard,  desc: 'Visa, Mastercard, Verve' },
  { id: 'bank',    label: 'Bank Transfer',         icon: Banknote,    desc: 'Direct from your bank' },
  { id: 'wallet',  label: 'Ambassador Wallet',          icon: ShieldCheck, desc: 'Instant — ₦12M balance' },
]

export default function CheckoutPage() {
  const location   = useLocation()
  const navigate   = useNavigate()
  const { artwork, finalPrice, type } = location.state || {}

  const [step, setStep]           = useState('review')   // review | payment | confirm | success
  const [payMethod, setPayMethod] = useState('card')
  const [form, setForm]           = useState({ name: '', card: '', expiry: '', cvv: '', address: '', city: '', country: 'Nigeria' })
  const [processing, setProcessing] = useState(false)

  if (!artwork) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ivory">
        <div className="text-center space-y-4">
          <p className="text-4xl">🛒</p>
          <h2 className="font-display text-2xl text-ink">Nothing to checkout</h2>
          <Link to="/auctions" className="btn-primary">Browse Auctions</Link>
        </div>
      </div>
    )
  }

  const platformFee    = Math.ceil(finalPrice * 0.025)
  const shippingFee    = 45000
  const total          = finalPrice + platformFee + shippingFee

  const handlePay = () => {
    setProcessing(true)
    setTimeout(() => {
      setProcessing(false)
      setStep('success')
    }, 2200)
  }

  return (
    <motion.div {...pageTransition} className="min-h-screen bg-ivory pt-20">
      <div className="max-w-5xl mx-auto px-5 md:px-8 py-10">

        {/* ── Back link ── */}
        {step !== 'success' && (
          <button onClick={() => navigate(-1)} className="inline-flex items-center gap-2 text-sm text-ink/50 hover:text-ink transition-colors mb-8">
            <ArrowLeft size={14} /> Back
          </button>
        )}

        <AnimatePresence mode="wait">

          {/* ═══════════════════════════════════════
              STEP 1 — ORDER REVIEW
          ═══════════════════════════════════════ */}
          {step === 'review' && (
            <motion.div key="review" {...fadeUp} className="grid md:grid-cols-5 gap-8">

              {/* Left — item summary */}
              <div className="md:col-span-3 space-y-6">
                <div>
                  <p className="section-label mb-2">{type === 'auction' ? 'You Won This Auction' : 'Order Review'}</p>
                  <h1 className="font-display text-3xl text-ink">Review your order</h1>
                </div>

                {/* Item card */}
                <div className="bg-white rounded-2xl border border-ink/6 overflow-hidden flex gap-0">
                  <div className="w-36 shrink-0">
                    <img src={artwork.image} alt={artwork.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-5 flex flex-col justify-between flex-1">
                    <div>
                      <p className="text-[10px] text-ink/40 uppercase tracking-wider mb-1">{artwork.category}</p>
                      <h3 className="font-display text-lg text-ink leading-tight">{artwork.title}</h3>
                      <p className="text-xs text-ink/40 mt-1">{artwork.origin}</p>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-ink/50">{artwork.medium}</p>
                      <p className="font-display text-xl text-ink">{formatPrice(finalPrice)}</p>
                    </div>
                  </div>
                </div>

                {/* Trust badges */}
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { icon: ShieldCheck, label: 'Authenticated', sub: 'Expert verified' },
                    { icon: Package,     label: 'Insured',        sub: 'Full transit cover' },
                    { icon: Globe,       label: 'Worldwide',      sub: '15–30 business days' },
                  ].map(({ icon: Icon, label, sub }) => (
                    <div key={label} className="bg-white rounded-xl p-3.5 border border-ink/5 text-center">
                      <Icon size={16} className="text-cobalt-500 mx-auto mb-1.5" />
                      <p className="text-xs font-semibold text-ink">{label}</p>
                      <p className="text-[10px] text-ink/40 mt-0.5">{sub}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right — price breakdown */}
              <div className="md:col-span-2">
                <div className="bg-white rounded-2xl border border-ink/6 p-6 space-y-4 sticky top-24">
                  <h3 className="font-semibold text-ink text-sm">Order Summary</h3>

                  <div className="space-y-2.5 text-sm">
                    {[
                      { label: type === 'auction' ? 'Winning bid' : 'Item price', amount: finalPrice },
                      { label: 'Platform fee (2.5%)',  amount: platformFee, muted: true },
                      { label: 'Shipping & handling',  amount: shippingFee, muted: true },
                    ].map(({ label, amount, muted }) => (
                      <div key={label} className="flex justify-between">
                        <span className={muted ? 'text-ink/50' : 'text-ink'}>{label}</span>
                        <span className={`font-mono ${muted ? 'text-ink/50' : 'text-ink'}`}>{formatPrice(amount)}</span>
                      </div>
                    ))}
                    <div className="border-t border-ink/8 pt-2.5 flex justify-between font-semibold">
                      <span>Total</span>
                      <span className="font-mono text-cobalt-700">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <button
                    onClick={() => setStep('payment')}
                    className="btn-primary w-full justify-center py-4 rounded-xl"
                  >
                    Continue to Payment
                  </button>

                  <p className="text-[10px] text-ink/30 text-center flex items-center justify-center gap-1">
                    <Lock size={10} /> 256-bit encrypted checkout
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════
              STEP 2 — PAYMENT
          ═══════════════════════════════════════ */}
          {step === 'payment' && (
            <motion.div key="payment" {...fadeUp} className="grid md:grid-cols-5 gap-8">
              <div className="md:col-span-3 space-y-6">
                <div>
                  <p className="section-label mb-2">Payment</p>
                  <h1 className="font-display text-3xl text-ink">How would you like to pay?</h1>
                </div>

                {/* Payment method selector */}
                <div className="space-y-3">
                  {PAYMENT_METHODS.map(({ id, label, icon: Icon, desc }) => (
                    <button
                      key={id}
                      onClick={() => setPayMethod(id)}
                      className={`w-full flex items-center gap-4 p-4 rounded-xl border-2 transition-all text-left ${
                        payMethod === id
                          ? 'border-cobalt-600 bg-cobalt-50'
                          : 'border-ink/8 bg-white hover:border-ink/20'
                      }`}
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                        payMethod === id ? 'bg-cobalt-600 text-white' : 'bg-ink/5 text-ink/50'
                      }`}>
                        <Icon size={18} />
                      </div>
                      <div>
                        <p className={`font-semibold text-sm ${payMethod === id ? 'text-cobalt-700' : 'text-ink'}`}>{label}</p>
                        <p className="text-xs text-ink/40">{desc}</p>
                      </div>
                      <div className={`ml-auto w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                        payMethod === id ? 'border-cobalt-600' : 'border-ink/20'
                      }`}>
                        {payMethod === id && <div className="w-2 h-2 rounded-full bg-cobalt-600" />}
                      </div>
                    </button>
                  ))}
                </div>

                {/* Card fields */}
                {payMethod === 'card' && (
                  <motion.div {...fadeUp} className="bg-white rounded-2xl border border-ink/6 p-5 space-y-4">
                    <div>
                      <label className="text-[10px] text-ink/40 uppercase tracking-wider block mb-1.5">Cardholder Name</label>
                      <input value={form.name} onChange={e => setForm({...form, name: e.target.value})}
                        placeholder="As on card" className="w-full border border-ink/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cobalt-400 focus:ring-2 focus:ring-cobalt-100 transition-all" />
                    </div>
                    <div>
                      <label className="text-[10px] text-ink/40 uppercase tracking-wider block mb-1.5">Card Number</label>
                      <input value={form.card} onChange={e => setForm({...form, card: e.target.value})}
                        placeholder="•••• •••• •••• ••••" maxLength={19} className="w-full border border-ink/10 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-cobalt-400 focus:ring-2 focus:ring-cobalt-100 transition-all" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="text-[10px] text-ink/40 uppercase tracking-wider block mb-1.5">Expiry</label>
                        <input value={form.expiry} onChange={e => setForm({...form, expiry: e.target.value})}
                          placeholder="MM / YY" maxLength={7} className="w-full border border-ink/10 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-cobalt-400 focus:ring-2 focus:ring-cobalt-100 transition-all" />
                      </div>
                      <div>
                        <label className="text-[10px] text-ink/40 uppercase tracking-wider block mb-1.5">CVV</label>
                        <input value={form.cvv} onChange={e => setForm({...form, cvv: e.target.value})}
                          placeholder="•••" maxLength={4} type="password" className="w-full border border-ink/10 rounded-xl px-4 py-3 text-sm font-mono focus:outline-none focus:border-cobalt-400 focus:ring-2 focus:ring-cobalt-100 transition-all" />
                      </div>
                    </div>
                  </motion.div>
                )}

                {payMethod === 'bank' && (
                  <motion.div {...fadeUp} className="bg-white rounded-2xl border border-ink/6 p-6 space-y-4">
                    <p className="text-sm text-ink/60">Transfer the exact amount to:</p>
                    {[
                      { label: 'Bank',    value: 'GTBank Nigeria' },
                      { label: 'Account', value: '0123456789' },
                      { label: 'Name',    value: 'Ambassador Technologies Ltd' },
                      { label: 'Amount',  value: formatPrice(total) },
                      { label: 'Ref',     value: `ADURA-${artwork.id.toUpperCase()}-${Date.now().toString().slice(-6)}` },
                    ].map(({ label, value }) => (
                      <div key={label} className="flex justify-between border-b border-ink/5 pb-3 last:border-0 last:pb-0">
                        <span className="text-xs text-ink/40 uppercase tracking-wider">{label}</span>
                        <span className="font-mono text-sm font-semibold text-ink">{value}</span>
                      </div>
                    ))}
                  </motion.div>
                )}

                {payMethod === 'wallet' && (
                  <motion.div {...fadeUp} className="bg-cobalt-50 rounded-2xl border border-cobalt-100 p-6">
                    <div className="flex items-center justify-between mb-4">
                      <p className="font-semibold text-cobalt-700">Ambassador Wallet</p>
                      <p className="font-mono font-bold text-cobalt-700">₦12,000,000</p>
                    </div>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-cobalt-600">Total deduction</span>
                      <span className="font-mono font-semibold text-cobalt-700">{formatPrice(total)}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-cobalt-600/60">Remaining balance</span>
                      <span className="font-mono text-cobalt-600/60">{formatPrice(12000000 - total)}</span>
                    </div>
                  </motion.div>
                )}

                {/* Shipping address */}
                <div className="bg-white rounded-2xl border border-ink/6 p-5 space-y-4">
                  <h3 className="text-sm font-semibold text-ink">Shipping Address</h3>
                  <div>
                    <label className="text-[10px] text-ink/40 uppercase tracking-wider block mb-1.5">Street Address</label>
                    <input value={form.address} onChange={e => setForm({...form, address: e.target.value})}
                      placeholder="123 Victoria Island" className="w-full border border-ink/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cobalt-400 focus:ring-2 focus:ring-cobalt-100 transition-all" />
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-[10px] text-ink/40 uppercase tracking-wider block mb-1.5">City</label>
                      <input value={form.city} onChange={e => setForm({...form, city: e.target.value})}
                        placeholder="Lagos" className="w-full border border-ink/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cobalt-400 focus:ring-2 focus:ring-cobalt-100 transition-all" />
                    </div>
                    <div>
                      <label className="text-[10px] text-ink/40 uppercase tracking-wider block mb-1.5">Country</label>
                      <select value={form.country} onChange={e => setForm({...form, country: e.target.value})}
                        className="w-full border border-ink/10 rounded-xl px-4 py-3 text-sm bg-white focus:outline-none focus:border-cobalt-400 transition-all">
                        {['Nigeria','Ghana','Kenya','South Africa','Egypt','UK','USA','UAE'].map(c => (
                          <option key={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right — total + pay button */}
              <div className="md:col-span-2">
                <div className="bg-white rounded-2xl border border-ink/6 p-6 space-y-4 sticky top-24">
                  <div className="flex items-start gap-3 pb-4 border-b border-ink/6">
                    <img src={artwork.image} alt="" className="w-14 h-14 rounded-xl object-cover shrink-0" />
                    <div>
                      <p className="text-xs text-ink/40 mb-0.5">{artwork.category}</p>
                      <p className="font-display text-sm text-ink leading-snug">{artwork.title}</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between"><span className="text-ink/50">Item</span><span className="font-mono">{formatPrice(finalPrice)}</span></div>
                    <div className="flex justify-between"><span className="text-ink/50">Fees</span><span className="font-mono">{formatPrice(platformFee)}</span></div>
                    <div className="flex justify-between"><span className="text-ink/50">Shipping</span><span className="font-mono">{formatPrice(shippingFee)}</span></div>
                    <div className="border-t border-ink/8 pt-2 flex justify-between font-bold">
                      <span>Total</span><span className="font-mono text-cobalt-700">{formatPrice(total)}</span>
                    </div>
                  </div>

                  <button
                    onClick={handlePay}
                    disabled={processing}
                    className="btn-primary w-full justify-center py-4 rounded-xl disabled:opacity-60 disabled:cursor-wait"
                  >
                    {processing ? (
                      <span className="flex items-center gap-2">
                        <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                          <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="30 60" />
                        </svg>
                        Processing…
                      </span>
                    ) : (
                      <span className="flex items-center gap-2"><Lock size={14} /> Pay {formatPrice(total)}</span>
                    )}
                  </button>

                  <button onClick={() => setStep('review')} className="w-full text-center text-xs text-ink/40 hover:text-ink/70 transition-colors">
                    ← Back to review
                  </button>

                  <p className="text-[10px] text-ink/30 text-center flex items-center justify-center gap-1">
                    <ShieldCheck size={10} /> Secured by Ambassador Payment Shield
                  </p>
                </div>
              </div>
            </motion.div>
          )}

          {/* ═══════════════════════════════════════
              STEP 3 — SUCCESS
          ═══════════════════════════════════════ */}
          {step === 'success' && (
            <motion.div key="success" {...fadeUp} className="max-w-lg mx-auto text-center py-12 space-y-6">
              <motion.div
                initial={{ scale: 0, rotate: -10 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto"
              >
                <CheckCircle2 size={48} className="text-green-500" />
              </motion.div>

              <div>
                <h1 className="font-display text-4xl text-ink mb-2">Order Confirmed!</h1>
                <p className="text-ink/50 text-sm leading-relaxed">
                  Your payment of <strong className="text-ink">{formatPrice(total)}</strong> has been received.
                  <br />A confirmation has been sent to your email.
                </p>
              </div>

              <div className="bg-white rounded-2xl border border-ink/6 p-6 text-left space-y-3">
                <div className="flex items-center gap-3 mb-4">
                  <img src={artwork.image} alt="" className="w-16 h-16 rounded-xl object-cover" />
                  <div>
                    <p className="font-display text-base text-ink">{artwork.title}</p>
                    <p className="text-xs text-ink/40">{artwork.origin}</p>
                  </div>
                </div>
                {[
                  { label: 'Order Ref',    value: `ADR-${Date.now().toString().slice(-8)}` },
                  { label: 'Amount Paid',  value: formatPrice(total) },
                  { label: 'Est. Delivery',value: '15–30 business days' },
                  { label: 'Tracking',     value: 'Email within 48hrs' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between text-sm border-b border-ink/5 pb-2.5 last:border-0 last:pb-0">
                    <span className="text-ink/40">{label}</span>
                    <span className="font-semibold text-ink font-mono">{value}</span>
                  </div>
                ))}
              </div>

              <div className="flex flex-col gap-3">
                <Link to="/" className="btn-primary justify-center py-4 rounded-xl">
                  Continue Collecting
                </Link>
                <Link to="/auctions" className="btn-outline justify-center py-4 rounded-xl">
                  Browse More Auctions
                </Link>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  )
}
