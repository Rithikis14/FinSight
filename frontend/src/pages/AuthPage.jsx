import { useState, useEffect } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { TrendingUp, Eye, EyeOff, Loader2, ArrowLeft } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'

export default function AuthPage() {
  const [params]  = useSearchParams()
  const [mode, setMode]         = useState(params.get('mode') === 'register' ? 'register' : 'login')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const [showPass, setShowPass] = useState(false)
  const [form, setForm]         = useState({ fullName: '', email: '', password: '' })
  const { login, register }     = useAuth()
  const navigate                = useNavigate()
  const { dark }                = useTheme()

  useEffect(() => { setError(''); setForm({ fullName: '', email: '', password: '' }) }, [mode])

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      if (mode === 'login') {
        await login(form.email, form.password)
      } else {
        await register(form.fullName, form.email, form.password)
      }
      navigate('/dashboard')
    } catch (err) {
      setError(err.response?.data?.message || 'Something went wrong. Try again.')
    } finally {
      setLoading(false)
    }
  }

  const slideVariants = {
    enter: (dir) => ({ x: dir > 0 ? 60 : -60, opacity: 0 }),
    center: { x: 0, opacity: 1, transition: { type: 'spring', stiffness: 260, damping: 26 } },
    exit:  (dir) => ({ x: dir > 0 ? -60 : 60, opacity: 0, transition: { duration: 0.15 } }),
  }
  const dir = mode === 'register' ? 1 : -1

  return (
    <div className="min-h-screen flex bg-white dark:bg-[#0a0a0f]">

      {/* Left panel */}
      <div className="hidden lg:flex w-1/2 bg-brand-600 dark:bg-brand-700 flex-col justify-between p-12">
        <Link to="/" className="flex items-center gap-2 text-white/90">
          <TrendingUp size={20} />
          <span className="font-mono font-semibold">FinSight</span>
        </Link>
        <div className="space-y-4">
          <h2 className="text-4xl font-bold text-white leading-tight">
            Your wealth.<br />Your AI.<br />Your rules.
          </h2>
          <p className="text-brand-100 text-lg leading-relaxed max-w-sm">
            The only investment platform where the AI analyst never sees a server it shouldn't.
          </p>
        </div>
        <p className="text-brand-200 text-sm">100% local · Open source · No subscriptions</p>
      </div>

      {/* Right panel */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12 relative">
        <Link to="/" className="absolute top-6 left-6 flex items-center gap-1.5 text-sm text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
          <ArrowLeft size={15} /> Back
        </Link>

        <div className="w-full max-w-sm">
          {/* Mode toggle pills */}
          <div className="flex bg-slate-100 dark:bg-white/5 rounded-xl p-1 mb-8">
            {(['login', 'register']).map(m => (
              <button key={m} onClick={() => setMode(m)}
                className={`flex-1 py-2 text-sm font-medium rounded-lg transition-all ${
                  mode === m
                    ? 'bg-white dark:bg-white/10 text-slate-900 dark:text-white shadow-sm'
                    : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-300'
                }`}>
                {m === 'login' ? 'Sign in' : 'Create account'}
              </button>
            ))}
          </div>

          {/* Form */}
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div key={mode} custom={dir}
              variants={slideVariants} initial="enter" animate="center" exit="exit">

              <h1 className="text-2xl font-bold text-slate-900 dark:text-white mb-1">
                {mode === 'login' ? 'Welcome back' : 'Get started'}
              </h1>
              <p className="text-sm text-slate-500 dark:text-slate-400 mb-6">
                {mode === 'login'
                  ? 'Sign in to your FinSight account'
                  : 'Create your private investment workspace'}
              </p>

              {error && (
                <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
                  className="mb-4 px-3 py-2.5 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg text-sm text-red-600 dark:text-red-400">
                  {error}
                </motion.div>
              )}

              <form onSubmit={submit} className="space-y-4">
                {mode === 'register' && (
                  <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }}
                    exit={{ opacity: 0, height: 0 }}>
                    <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                      Full name
                    </label>
                    <input className="input" type="text" placeholder="John Doe" required
                      value={form.fullName} onChange={e => update('fullName', e.target.value)} />
                  </motion.div>
                )}

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Email address
                  </label>
                  <input className="input" type="email" placeholder="you@example.com" required
                    value={form.email} onChange={e => update('email', e.target.value)} />
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-700 dark:text-slate-300 mb-1.5">
                    Password
                  </label>
                  <div className="relative">
                    <input className="input pr-10" type={showPass ? 'text' : 'password'}
                      placeholder={mode === 'register' ? 'Min. 8 characters' : '••••••••'} required
                      minLength={mode === 'register' ? 8 : 1}
                      value={form.password} onChange={e => update('password', e.target.value)} />
                    <button type="button" onClick={() => setShowPass(s => !s)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300">
                      {showPass ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>

                <button type="submit" disabled={loading}
                  className="btn-primary w-full py-2.5 flex items-center justify-center gap-2">
                  {loading && <Loader2 size={15} className="animate-spin" />}
                  {mode === 'login' ? 'Sign in' : 'Create account'}
                </button>
              </form>

              <p className="mt-5 text-center text-sm text-slate-500 dark:text-slate-400">
                {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
                <button onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
                  className="text-brand-600 dark:text-brand-400 font-medium hover:underline">
                  {mode === 'login' ? 'Create one' : 'Sign in'}
                </button>
              </p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
