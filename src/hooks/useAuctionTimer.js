import { useState, useEffect } from 'react'

export function useAuctionTimer(endsAt) {
  const [timeLeft, setTimeLeft] = useState(null)
  const [isUrgent, setIsUrgent] = useState(false)

  useEffect(() => {
    if (!endsAt) return

    const tick = () => {
      const diff = new Date(endsAt) - new Date()
      if (diff <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, ended: true })
        return
      }

      const hours = Math.floor(diff / 3600000)
      const minutes = Math.floor((diff % 3600000) / 60000)
      const seconds = Math.floor((diff % 60000) / 1000)
      setTimeLeft({ hours, minutes, seconds, ended: false })
      setIsUrgent(diff < 60 * 60 * 1000) // < 1 hour = urgent
    }

    tick()
    const interval = setInterval(tick, 1000)
    return () => clearInterval(interval)
  }, [endsAt])

  return { timeLeft, isUrgent }
}
