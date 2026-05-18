import { useAuctionTimer } from '../../hooks/useAuctionTimer'
import { motion, AnimatePresence } from 'framer-motion'

export default function AuctionTimer({ endsAt, size = 'md' }) {
  const { timeLeft, isUrgent } = useAuctionTimer(endsAt)

  if (!timeLeft) return null
  if (timeLeft.ended) {
    return (
      <span className="font-mono text-xs text-ink/40 uppercase tracking-widest">Ended</span>
    )
  }

  const pad = (n) => String(n).padStart(2, '0')

  if (size === 'sm') {
    return (
      <span className={`font-mono text-xs font-medium ${isUrgent ? 'text-red-500' : 'text-ink/60'}`}>
        {timeLeft.hours > 0
          ? `${pad(timeLeft.hours)}h ${pad(timeLeft.minutes)}m`
          : `${pad(timeLeft.minutes)}m ${pad(timeLeft.seconds)}s`}
      </span>
    )
  }

  return (
    <div className="flex items-center gap-2">
      {[
        { label: 'HRS', value: timeLeft.hours },
        { label: 'MIN', value: timeLeft.minutes },
        { label: 'SEC', value: timeLeft.seconds },
      ].map(({ label, value }, i) => (
        <div key={label} className="flex items-center gap-2">
          <div className={`flex flex-col items-center min-w-[44px] rounded-lg px-3 py-2 ${
            isUrgent ? 'bg-red-50 border border-red-100' : 'bg-ivory-warm border border-ink/8'
          }`}>
            <AnimatePresence mode="popLayout">
              <motion.span
                key={value}
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 8, opacity: 0 }}
                transition={{ duration: 0.2 }}
                className={`font-mono text-lg font-medium leading-none ${
                  isUrgent ? 'text-red-600' : 'text-ink'
                }`}
              >
                {String(value).padStart(2, '0')}
              </motion.span>
            </AnimatePresence>
            <span className={`font-mono text-[9px] uppercase tracking-widest mt-1 ${
              isUrgent ? 'text-red-400' : 'text-ink/30'
            }`}>
              {label}
            </span>
          </div>
          {i < 2 && (
            <span className={`font-mono text-lg font-light ${isUrgent ? 'text-red-400' : 'text-ink/20'}`}>
              :
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
