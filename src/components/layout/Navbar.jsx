import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, Menu, X, ChevronRight, User, LogOut, ShoppingBag } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const navLinks = [
  { label: 'Auctions',    href: '/auctions'    },
  { label: 'Collections', href: '/collections' },
  { label: 'Artists',     href: '/artists'     },
  { label: 'About',       href: '/about'       },
]

// Animated AMB logo mark
function LogoMark({ transparent }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08, rotate: 2 }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: 'spring', stiffness: 400, damping: 20 }}
      className="w-9 h-9 bg-cobalt-600 rounded-xl flex items-center justify-center shadow-lg shadow-cobalt-600/30"
    >
      <span className="font-display text-white text-sm font-semibold tracking-tight">BHD</span>
    </motion.div>
  )
}

export default function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [searchOpen,  setSearchOpen]  = useState(false)
  const [userMenu,    setUserMenu]    = useState(false)
  const [searchVal,   setSearchVal]   = useState('')
  const location   = useLocation()
  const navigate   = useNavigate()
  const { user, logout, isLoggedIn }  = useAuth()

  const isHomepage    = location.pathname === '/'
  const isTransparent = isHomepage && !scrolled

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    setScrolled(window.scrollY > 40)
    return () => window.removeEventListener('scroll', onScroll)
  }, [location.pathname])

  useEffect(() => { setMobileOpen(false); setSearchOpen(false); setUserMenu(false) }, [location])

  const linkClass = (active) => `px-4 py-2 rounded-full text-sm font-body font-medium transition-all text-white`
  // ${
  //   active
  //     ? isTransparent ? 'bg-white/20 text-white backdrop-blur-sm' : 'bg-ink text-ivory'
  //     : isTransparent ? 'text-white/80 hover:text-white hover:bg-white/15' : 'text-ink/60 hover:text-ink hover:bg-ink/5'
  // }`

  const handleSearch = (e) => {
    e.preventDefault()
    if (searchVal.trim()) { navigate(`/auctions?q=${searchVal}`); setSearchOpen(false) }
  }

  return (
    <>
      <motion.header
        initial={{ y: -72, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 inset-x-0 z-40 transition-all duration-300 bg-blue-600`}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 h-16 flex items-center justify-between gap-6">

          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 shrink-0">
            <LogoMark transparent={isTransparent} />
            <motion.span
              className={`font-display text-xl tracking-tight transition-colors ${isTransparent ? 'text-white' : 'text-white'}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              Auctions
            </motion.span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link key={link.href} to={link.href} className={linkClass(location.pathname === link.href)}>
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Search */}
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => setSearchOpen(!searchOpen)}
              className={`p-2.5 rounded-full transition-all ${isTransparent ? 'text-white/80 hover:bg-white/15' : 'text-ink/60 hover:bg-ink/5'}`}
            >
              <Search size={17} />
            </motion.button>

            {isLoggedIn ? (
              <div className="hidden md:flex items-center gap-2 relative">
                <motion.button
                  whileTap={{ scale: 0.95 }}
                  onClick={() => setUserMenu(!userMenu)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-full transition-all ${
                    isTransparent ? 'text-white/90 hover:bg-white/15' : 'text-ink hover:bg-ink/5'
                  }`}
                >
                  <img src={user.avatar} alt="" className="w-7 h-7 rounded-full object-cover border-2 border-white/40" />
                  <span className="text-sm font-medium">{user.name.split(' ')[0]}</span>
                </motion.button>
                <AnimatePresence>
                  {userMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: 8, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 8, scale: 0.95 }}
                      transition={{ duration: 0.15 }}
                      className="absolute top-full right-0 mt-2 w-52 bg-white rounded-2xl shadow-xl border border-ink/8 overflow-hidden"
                    >
                      <div className="px-4 py-3 border-b border-ink/6">
                        <p className="text-xs font-semibold text-ink">{user.name}</p>
                        <p className="text-[10px] text-ink/40">{user.email}</p>
                      </div>
                      {[
                        { icon: User, label: 'My Profile', href: '/profile' },
                        { icon: ShoppingBag, label: 'My Bids', href: '/bids' },
                      ].map(({ icon: Icon, label, href }) => (
                        <Link key={href} to={href} className="flex items-center gap-3 px-4 py-3 text-sm text-ink/70 hover:bg-ink/5 hover:text-ink transition-colors">
                          <Icon size={14} /> {label}
                        </Link>
                      ))}
                      <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 text-sm text-red-500 hover:bg-red-50 transition-colors border-t border-ink/6"
                      >
                        <LogOut size={14} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-2">
                <Link to="/login" className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  isTransparent ? 'text-white/80 hover:bg-white/15' : 'text-white hover:bg-ink/5'
                }`}>
                  Sign in
                </Link>
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link to="/register" className={`px-5 py-2 rounded-full text-sm font-semibold transition-all shadow-md ${
                    isTransparent
                      ? 'bg-white text-cobalt-700 hover:bg-ivory shadow-white/20'
                      : 'bg-cobalt-600 text-white hover:bg-cobalt-700 shadow-cobalt-600/30'
                  }`}>
                    Join Free
                  </Link>
                </motion.div>
              </div>
            )}

            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className={`md:hidden p-2.5 rounded-full transition-all ${isTransparent ? 'text-white/80 hover:bg-white/15' : 'text-ink/60 hover:bg-ink/5'}`}
            >
              {mobileOpen ? <X size={18} /> : <Menu size={18} />}
            </button>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="border-t border-ink/8 bg-white/98 backdrop-blur-xl overflow-hidden"
            >
              <form onSubmit={handleSearch} className="max-w-2xl mx-auto px-5 md:px-8 py-4 relative">
                <Search size={16} className="absolute left-9 md:left-12 top-1/2 -translate-y-1/2 text-ink/30" />
                <input
                  autoFocus
                  value={searchVal}
                  onChange={e => setSearchVal(e.target.value)}
                  placeholder="Search artworks, artists, categories…"
                  className="w-full pl-10 pr-4 py-3 bg-ivory rounded-xl border border-ink/8 text-sm focus:outline-none focus:border-cobalt-400 focus:ring-2 focus:ring-cobalt-100 transition-all"
                />
              </form>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              className="fixed inset-0 z-30 bg-ink/30 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="fixed top-0 right-0 bottom-0 z-40 w-72 bg-white shadow-2xl flex flex-col"
            >
              <div className="flex items-center justify-between px-6 h-16 border-b border-ink/6">
                <span className="font-display text-xl text-ink">BHD Auctions</span>
                <button onClick={() => setMobileOpen(false)} className="p-2 rounded-full hover:bg-ink/5">
                  <X size={18} className="text-ink/60" />
                </button>
              </div>
              {isLoggedIn && (
                <div className="px-6 py-4 border-b border-ink/6 flex items-center gap-3">
                  <img src={user.avatar} alt="" className="w-10 h-10 rounded-full object-cover" />
                  <div>
                    <p className="font-semibold text-sm text-ink">{user.name}</p>
                    <p className="text-xs text-ink/40">{user.email}</p>
                  </div>
                </div>
              )}
              <nav className="flex flex-col px-3 py-4 flex-1">
                {navLinks.map((link, i) => (
                  <motion.div key={link.href}
                    initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.06 }}>
                    <Link to={link.href}
                      className={`flex items-center justify-between px-4 py-3.5 rounded-xl text-sm font-medium mb-1 transition-colors ${
                        location.pathname === link.href ? 'bg-cobalt-50 text-cobalt-700' : 'text-ink/70 hover:bg-ink/5 hover:text-ink'
                      }`}
                    >
                      {link.label} <ChevronRight size={14} className="text-ink/20" />
                    </Link>
                  </motion.div>
                ))}
              </nav>
              <div className="px-4 pb-8 flex flex-col gap-3 border-t border-ink/6 pt-4">
                {isLoggedIn ? (
                  <button onClick={logout} className="btn-outline justify-center py-3.5 rounded-xl text-red-500 border-red-200">
                    Sign Out
                  </button>
                ) : (
                  <>
                    <Link to="/register" className="btn-primary justify-center py-3.5 rounded-xl">Join Free</Link>
                    <Link to="/login" className="btn-outline justify-center py-3.5 rounded-xl">Sign In</Link>
                  </>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
