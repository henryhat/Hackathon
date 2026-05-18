import { useState } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Eye, EyeOff, ArrowRight, ShieldCheck } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { pageTransition, staggerContainer, staggerItem } from '../animations/variants'

function AuthLayout({ children, image, quote }) {
  return (
    <div className="min-h-screen grid md:grid-cols-2">
      <div className="flex flex-col justify-center px-8 md:px-16 py-20 bg-white">
        <Link to="/" className="flex items-center gap-2.5 mb-14">
          <div className="w-9 h-9 bg-cobalt-600 rounded-xl flex items-center justify-center shadow-lg shadow-cobalt-600/30">
            <span className="font-display text-white text-sm font-semibold">Aм</span>
          </div>
          <span className="font-display text-xl text-ink">Ambassador</span>
        </Link>
        {children}
      </div>
      <div className="hidden md:block relative overflow-hidden">
        <img src={image} alt="" className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-br from-cobalt-900/80 to-ink/60 flex flex-col items-start justify-end p-14">
          <p className="font-display text-3xl text-white leading-tight mb-4 max-w-sm italic">"{quote}"</p>
          <p className="text-white/40 text-sm">— Ambassador founding principle</p>
          <div className="flex items-center gap-2 mt-8">
            <ShieldCheck size={14} className="text-cobalt-400" />
            <p className="text-white/50 text-xs">3,400+ authenticated works from 47 countries</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export function LoginPage() {
  const [showPw, setShowPw]   = useState(false)
  const [form, setForm]       = useState({ email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { login }             = useAuth()
  const navigate              = useNavigate()
  const location              = useLocation()
  const from = location.state?.from?.pathname || '/'

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      login(form.email, form.password)
      navigate(from, { replace: true })
    }, 800)
  }

  return (
    <motion.div {...pageTransition}>
      <AuthLayout
        image="https://images.unsplash.com/photo-1620510625142-b45ba7b1b7b7?w=900&h=1100&fit=crop"
        quote="Africa's heritage belongs to those who cherish it."
      >
        <motion.div variants={staggerContainer} initial="initial" animate="animate" className="max-w-sm">
          <motion.div variants={staggerItem}>
            <p className="section-label mb-2">Welcome back</p>
            <h1 className="font-display text-3xl text-ink mb-1">Sign in</h1>
            <p className="text-ink/50 text-sm mb-8">
              New here?{' '}
              <Link to="/register" state={location.state} className="text-cobalt-600 hover:underline font-medium">Create a free account</Link>
            </p>
          </motion.div>
          <motion.form variants={staggerItem} onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="text-[10px] text-ink/40 font-semibold uppercase tracking-widest block mb-1.5">Email</label>
              <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                placeholder="you@example.com"
                className="w-full border border-ink/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-cobalt-500 focus:ring-2 focus:ring-cobalt-100 transition-all" />
            </div>
            <div>
              <label className="text-[10px] text-ink/40 font-semibold uppercase tracking-widest block mb-1.5">Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} required value={form.password}
                  onChange={e => setForm({...form, password: e.target.value})} placeholder="••••••••"
                  className="w-full border border-ink/10 rounded-xl px-4 py-3.5 pr-12 text-sm focus:outline-none focus:border-cobalt-500 focus:ring-2 focus:ring-cobalt-100 transition-all" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/30 hover:text-ink/60">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
              <div className="flex justify-end mt-1.5">
                <a href="#" className="text-xs text-cobalt-600 hover:underline">Forgot password?</a>
              </div>
            </div>
            <motion.button type="submit" disabled={loading}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="btn-primary w-full justify-center py-4 rounded-xl font-bold text-sm mt-2 disabled:opacity-60">
              {loading ? 'Signing in…' : <><ArrowRight size={15} /> Sign In</>}
            </motion.button>
          </motion.form>
          <motion.div variants={staggerItem} className="mt-4 space-y-3">
            <div className="flex items-center gap-3"><div className="flex-1 h-px bg-ink/8" /><span className="text-xs text-ink/30">or</span><div className="flex-1 h-px bg-ink/8" /></div>
            <button className="w-full border border-ink/10 rounded-xl py-3.5 flex items-center justify-center gap-3 text-sm font-medium hover:bg-ivory transition-colors">
              <svg width="18" height="18" viewBox="0 0 18 18"><path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.716v2.258h2.908c1.702-1.567 2.684-3.874 2.684-6.615z" fill="#4285F4"/><path d="M9 18c2.43 0 4.467-.806 5.956-2.18l-2.908-2.259c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853"/><path d="M3.964 10.71A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.71V4.958H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.042l3.007-2.332z" fill="#FBBC05"/><path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.958L3.964 7.29C4.672 5.163 6.656 3.58 9 3.58z" fill="#EA4335"/></svg>
              Continue with Google
            </button>
          </motion.div>
        </motion.div>
      </AuthLayout>
    </motion.div>
  )
}

export function RegisterPage() {
  const [showPw, setShowPw]   = useState(false)
  const [role, setRole]       = useState('buyer')
  const [form, setForm]       = useState({ firstName: '', lastName: '', email: '', password: '' })
  const [loading, setLoading] = useState(false)
  const { register }          = useAuth()
  const navigate              = useNavigate()
  const location              = useLocation()
  const from = location.state?.from?.pathname || '/'

  const handleSubmit = (e) => {
    e.preventDefault()
    setLoading(true)
    setTimeout(() => {
      register({ name: `${form.firstName} ${form.lastName}`, email: form.email, role })
      navigate(from, { replace: true })
    }, 900)
  }

  return (
    <motion.div {...pageTransition}>
      <AuthLayout
        image="https://images.unsplash.com/photo-1567225557594-88d73e55f2cb?w=900&h=1100&fit=crop"
        quote="Every piece carries a story. Be the one who preserves it."
      >
        <motion.div variants={staggerContainer} initial="initial" animate="animate" className="max-w-sm">
          <motion.div variants={staggerItem}>
            <p className="section-label mb-2">Get started</p>
            <h1 className="font-display text-3xl text-ink mb-1">Create account</h1>
            <p className="text-ink/50 text-sm mb-6">
              Already have one?{' '}
              <Link to="/login" state={location.state} className="text-cobalt-600 hover:underline font-medium">Sign in</Link>
            </p>
          </motion.div>
          <motion.div variants={staggerItem} className="mb-5">
            <p className="text-[10px] text-ink/40 font-semibold uppercase tracking-widest mb-2">I am a</p>
            <div className="grid grid-cols-2 gap-2">
              {[{ value:'buyer', label:'🛍️ Collector' }, { value:'seller', label:'🎨 Artist / Seller' }].map(opt => (
                <button key={opt.value} onClick={() => setRole(opt.value)}
                  className={`py-3 px-4 rounded-xl border text-sm font-semibold transition-all ${
                    role === opt.value ? 'border-cobalt-600 bg-cobalt-50 text-cobalt-700' : 'border-ink/10 text-ink/60 hover:border-ink/20'
                  }`}>{opt.label}</button>
              ))}
            </div>
          </motion.div>
          <motion.form variants={staggerItem} onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-[10px] text-ink/40 font-semibold uppercase tracking-widest block mb-1.5">First Name</label>
                <input required value={form.firstName} onChange={e => setForm({...form, firstName: e.target.value})}
                  placeholder="Amara"
                  className="w-full border border-ink/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-cobalt-500 focus:ring-2 focus:ring-cobalt-100 transition-all" />
              </div>
              <div>
                <label className="text-[10px] text-ink/40 font-semibold uppercase tracking-widest block mb-1.5">Last Name</label>
                <input required value={form.lastName} onChange={e => setForm({...form, lastName: e.target.value})}
                  placeholder="Diallo"
                  className="w-full border border-ink/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-cobalt-500 focus:ring-2 focus:ring-cobalt-100 transition-all" />
              </div>
            </div>
            <div>
              <label className="text-[10px] text-ink/40 font-semibold uppercase tracking-widest block mb-1.5">Email</label>
              <input type="email" required value={form.email} onChange={e => setForm({...form, email: e.target.value})}
                placeholder="you@example.com"
                className="w-full border border-ink/10 rounded-xl px-4 py-3.5 text-sm focus:outline-none focus:border-cobalt-500 focus:ring-2 focus:ring-cobalt-100 transition-all" />
            </div>
            <div>
              <label className="text-[10px] text-ink/40 font-semibold uppercase tracking-widest block mb-1.5">Password</label>
              <div className="relative">
                <input type={showPw ? 'text' : 'password'} required value={form.password}
                  onChange={e => setForm({...form, password: e.target.value})} placeholder="Min. 8 characters"
                  className="w-full border border-ink/10 rounded-xl px-4 py-3.5 pr-12 text-sm focus:outline-none focus:border-cobalt-500 focus:ring-2 focus:ring-cobalt-100 transition-all" />
                <button type="button" onClick={() => setShowPw(!showPw)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-ink/30 hover:text-ink/60">
                  {showPw ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>
            <p className="text-xs text-ink/35">By creating an account you agree to our <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy Policy</a>.</p>
            <motion.button type="submit" disabled={loading}
              whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
              className="btn-primary w-full justify-center py-4 rounded-xl font-bold text-sm disabled:opacity-60">
              {loading ? 'Creating account…' : <><ArrowRight size={15} /> Create Account</>}
            </motion.button>
          </motion.form>
        </motion.div>
      </AuthLayout>
    </motion.div>
  )
}
