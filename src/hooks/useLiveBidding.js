import { useState, useEffect, useCallback, useRef } from 'react'

const FAKE_BIDDERS = [
  { name: 'collector_lagos', flag: '🇳🇬' },
  { name: 'ArtVault_UK',    flag: '🇬🇧' },
  { name: 'anonymous_**81', flag: '🌍' },
  { name: 'K.Adeyemi',      flag: '🇳🇬' },
  { name: 'NaijaBid',       flag: '🇳🇬' },
  { name: 'S.Mensah',       flag: '🇬🇭' },
  { name: 'artlover_GH',    flag: '🇬🇭' },
  { name: 'DrummerBoy99',   flag: '🇿🇦' },
  { name: 'GoldCoast_Art',  flag: '🇬🇭' },
  { name: 'DubaiCollects',  flag: '🇦🇪' },
]

export function useLiveBidding(initialBid, initialCount, isAuction) {
  const [currentBid, setCurrentBid]     = useState(initialBid)
  const [bidCount, setBidCount]         = useState(initialCount)
  const [lastBidder, setLastBidder]     = useState(null)
  const [flash, setFlash]               = useState(false)
  const [isWinning, setIsWinning]       = useState(false)  // user is current top bidder
  const [isOutbid, setIsOutbid]         = useState(false)  // user just got outbid
  const [activityLog, setActivityLog]   = useState([])     // live feed of recent bids
  const [userBid, setUserBid]           = useState(null)   // user's last bid amount
  const timerRef = useRef(null)

  const addActivity = (bidder, amount) => {
    const entry = {
      id: Date.now(),
      bidder,
      amount,
      time: new Date(),
    }
    setActivityLog(prev => [entry, ...prev].slice(0, 8)) // keep last 8
  }

  // Simulate other bidders coming in
  useEffect(() => {
    if (!isAuction || !initialBid) return

    const schedule = () => {
      const delay = 6000 + Math.random() * 20000 // 6–26s between bids
      timerRef.current = setTimeout(() => {
        const rival = FAKE_BIDDERS[Math.floor(Math.random() * FAKE_BIDDERS.length)]
        const increment = Math.ceil(initialBid * (0.03 + Math.random() * 0.08))

        setCurrentBid(prev => {
          const next = prev + increment
          // If user was winning and someone outbids them, trigger outbid alert
          setIsWinning(was => {
            if (was) {
              setIsOutbid(true)
              setTimeout(() => setIsOutbid(false), 6000)
            }
            return false
          })
          addActivity(`${rival.flag} ${rival.name}`, next)
          return next
        })

        setBidCount(prev => prev + 1)
        setLastBidder(`${rival.flag} ${rival.name}`)
        setFlash(true)
        setTimeout(() => setFlash(false), 800)

        schedule()
      }, delay)
    }

    schedule()
    return () => clearTimeout(timerRef.current)
  }, [isAuction, initialBid])

  // User places a bid
  const placeBid = useCallback((amount) => {
    setCurrentBid(amount)
    setBidCount(prev => prev + 1)
    setUserBid(amount)
    setLastBidder('🏆 You')
    setIsWinning(true)
    setIsOutbid(false)
    setFlash(true)
    addActivity('🏆 You', amount)
    setTimeout(() => setFlash(false), 800)
  }, [])

  return {
    currentBid,
    bidCount,
    lastBidder,
    flash,
    isWinning,
    isOutbid,
    activityLog,
    userBid,
    placeBid,
  }
}
