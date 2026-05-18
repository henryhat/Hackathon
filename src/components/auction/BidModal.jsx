import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useNavigate } from 'react-router-dom'
import { X, TrendingUp, ShieldCheck, AlertCircle, Lock, Trophy } from 'lucide-react'
import { formatPrice } from '../../data/artworks'
import { useAuth } from '../../context/AuthContext'
import { scaleIn, fadeIn } from '../../animations/variants'

export default function BidModal({ isOpen, onClose, artwork, currentBid, onPlaceBid }) {
  const [bidAmount, setBidAmount] = useState('')
  const [step, setStep]           = useState('input') // input | confirm | success
  const [error, setError]         = useState('')
  const { isLoggedIn }            = useAuth()
  const navigate                  = useNavigate()

  const minBid       = currentBid + Math.ceil(currentBid * 0.05)
  const suggestedBids = [minBid, Math.ceil(currentBid * 1.1), Math.ceil(currentBid * 1.2)]

  const handleSubmit = () => {
    if (!isLoggedIn) { onClose(); navigate('/login', { state: { from: { pathname: `/artwork/${artwork?.id}` } } }); return }
    const amount = parseInt(bidAmount.replace(/[^0-9]/g, ''))
    if (!amount || amount < minBid) { setError(`Minimum bid is ${formatPrice(minBid)}`); return }
    setError(''); setStep('confirm')
  }

  const handleConfirm = () => {
    const amount = parseInt(bidAmount.replace(/[^0-9]/g, ''))
    onPlaceBid(amount)
    setStep('success')
  }

  const handleClose = () => {
    onClose()
    setTimeout(() => { setStep('input'); setBidAmount(''); setError('') }, 300)
  }

  const goToCheckout = () => {
    handleClose()
    navigate('/checkout', {
      state: { artwork, finalPrice: parseInt(bidAmount), type: 'auction' }
    })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div {...fadeIn} className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-50" onClick={handleClose} />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <motion.div {...scaleIn} className="bg-white rounded-2xl shadow-2xl w-full max-w-md pointer-events-auto overflow-hidden">

              {/* Header */}
              <div className="flex items-start justify-between p-6 border-b border-ink/6 bg-gradient-to-r from-cobalt-50 to-white">
                <div>
                  <p className="section-label mb-1">Live Auction</p>
                  <h3 className="font-display text-xl text-ink line-clamp-1">{artwork?.title}</h3>
                </div>
                <button onClick={handleClose} className="p-2 rounded-full hover:bg-ink/8 transition-colors -mr-1">
                  <X size={18} className="text-ink/50" />
                </button>
              </div>

              <div className="p-6">
                <AnimatePresence mode="wait">

                  {/* ── STEP 1: INPUT ── */}
                  {step === 'input' && (
                    <motion.div key="input" {...fadeIn} className="space-y-5">
                      {/* Current bid display */}
                      <motion.div
                        className="bg-cobalt-50 border border-cobalt-100 rounded-xl p-4 flex items-center justify-between"
                        animate={{ scale: [1, 1.02, 1] }}
                        transition={{ duration: 0.4 }}
                      >
                        <div>
                          <p className="text-xs text-cobalt-600 font-semibold uppercase tracking-wider">Current Bid</p>
                          <p className="font-display text-3xl text-ink mt-0.5">{formatPrice(currentBid)}</p>
                        </div>
                        <TrendingUp size={22} className="text-cobalt-400" />
                      </motion.div>

                      {/* Quick amounts */}
                      <div>
                        <p className="text-[10px] text-ink/40 uppercase tracking-widest mb-2 font-semibold">Quick Select</p>
                        <div className="grid grid-cols-3 gap-2">
                          {suggestedBids.map((amt, i) => (
                            <motion.button
                              key={i} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                              onClick={() => setBidAmount(String(amt))}
                              className={`rounded-xl border py-3 text-sm font-semibold transition-all ${
                                bidAmount === String(amt)
                                  ? 'border-cobalt-600 bg-cobalt-600 text-white shadow-lg shadow-cobalt-600/25'
                                  : 'border-ink/10 text-ink/70 hover:border-cobalt-300 hover:bg-cobalt-50'
                              }`}
                            >
                              {formatPrice(amt)}
                            </motion.button>
                          ))}
                        </div>
                      </div>

                      {/* Custom input */}
                      <div>
                        <label className="text-[10px] text-ink/40 uppercase tracking-widest mb-2 block font-semibold">
                          Custom Amount (₦)
                        </label>
                        <input
                          type="number" value={bidAmount}
                          onChange={e => { setBidAmount(e.target.value); setError('') }}
                          placeholder={`Min. ${formatPrice(minBid)}`}
                          className="w-full border border-ink/12 rounded-xl px-4 py-3.5 font-mono text-xl focus:outline-none focus:border-cobalt-500 focus:ring-2 focus:ring-cobalt-100 transition-all"
                        />
                        <AnimatePresence>
                          {error && (
                            <motion.p initial={{ opacity:0, y:-4 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                              className="flex items-center gap-1.5 text-red-500 text-xs mt-2">
                              <AlertCircle size={12} /> {error}
                            </motion.p>
                          )}
                        </AnimatePresence>
                        <p className="text-xs text-ink/35 mt-2">Min. increment: {formatPrice(minBid - currentBid)} (+5%)</p>
                      </div>

                      {!isLoggedIn && (
                        <div className="flex items-start gap-3 bg-amber-50 border border-amber-100 rounded-xl p-3.5">
                          <Lock size={14} className="text-amber-500 mt-0.5 shrink-0" />
                          <p className="text-xs text-amber-700">You need to <strong>sign in</strong> to place bids. We'll send you right back here.</p>
                        </div>
                      )}

                      <motion.button
                        whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                        onClick={handleSubmit}
                        className="btn-primary w-full justify-center py-4 rounded-xl text-base font-bold shadow-lg shadow-cobalt-600/25"
                      >
                        {isLoggedIn ? 'Review Bid' : 'Sign In to Bid'}
                      </motion.button>
                    </motion.div>
                  )}

                  {/* ── STEP 2: CONFIRM ── */}
                  {step === 'confirm' && (
                    <motion.div key="confirm" {...fadeIn} className="space-y-5">
                      <div className="bg-ivory rounded-xl border border-ink/6 p-5 space-y-3">
                        {[
                          { label: 'Your bid', value: formatPrice(parseInt(bidAmount)), bold: true },
                          { label: 'Platform fee (2%)', value: formatPrice(Math.ceil(parseInt(bidAmount)*0.02)) },
                          { label: 'Total if you win', value: formatPrice(Math.ceil(parseInt(bidAmount)*1.02)), bold: true, cobalt: true },
                        ].map(({ label, value, bold, cobalt }) => (
                          <div key={label} className={`flex justify-between text-sm ${label.includes('Total') ? 'border-t border-ink/8 pt-3' : ''}`}>
                            <span className="text-ink/50">{label}</span>
                            <span className={`font-mono ${bold ? 'font-bold' : ''} ${cobalt ? 'text-cobalt-700' : 'text-ink'}`}>{value}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex items-start gap-3 bg-amber-50 rounded-xl p-4 text-xs text-amber-700">
                        <ShieldCheck size={14} className="text-amber-500 mt-0.5 shrink-0" />
                        <p>By confirming you agree to purchase this piece if you win. Funds are held securely until auction closes.</p>
                      </div>
                      <div className="flex gap-3">
                        <button onClick={() => setStep('input')} className="btn-outline flex-1 justify-center rounded-xl">Edit</button>
                        <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                          onClick={handleConfirm} className="btn-primary flex-1 justify-center rounded-xl font-bold">
                          Confirm Bid
                        </motion.button>
                      </div>
                    </motion.div>
                  )}

                  {/* ── STEP 3: SUCCESS ── */}
                  {step === 'success' && (
                    <motion.div key="success" {...fadeIn} className="py-6 text-center space-y-5">
                      <motion.div
                        initial={{ scale: 0, rotate: -15 }}
                        animate={{ scale: 1, rotate: 0 }}
                        transition={{ type: 'spring', stiffness: 260, damping: 18, delay: 0.1 }}
                        className="w-20 h-20 bg-gradient-to-br from-cobalt-500 to-cobalt-700 rounded-full flex items-center justify-center mx-auto shadow-xl shadow-cobalt-600/30"
                      >
                        <Trophy size={36} className="text-white" />
                      </motion.div>
                      <div>
                        <motion.h3 initial={{ opacity:0,y:8 }} animate={{ opacity:1,y:0 }} transition={{ delay:0.25 }}
                          className="font-display text-2xl text-ink">You're Winning! 🎉</motion.h3>
                        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.35 }}
                          className="text-ink/50 text-sm mt-1">
                          Top bid: <strong className="text-cobalt-700">{formatPrice(parseInt(bidAmount))}</strong>
                        </motion.p>
                        <motion.p initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.45 }}
                          className="text-xs text-ink/35 mt-1">
                          If no one outbids you, this masterpiece is yours.
                        </motion.p>
                      </div>
                      <motion.div initial={{ opacity:0, y:8 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.55 }}
                        className="flex flex-col gap-2">
                        <button onClick={goToCheckout}
                          className="btn-primary justify-center py-3.5 rounded-xl font-bold">
                          Proceed to Checkout Now
                        </button>
                        <button onClick={handleClose}
                          className="text-sm text-ink/40 hover:text-ink/70 transition-colors py-2">
                          Keep watching the auction
                        </button>
                      </motion.div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  )
}
