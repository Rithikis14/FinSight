import { Link, useLocation } from 'react-router-dom'
import { Moon, Sun, TrendingUp, LayoutDashboard, Bot, LogOut } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'
import { motion } from 'framer-motion'

export default function Navbar() {
  const { dark, toggle } = useTheme()
  const { user, logout } = useAuth()
  const { pathname } = useLocation()

  const links = [
    { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/ai',        label: 'AI Analyst', icon: Bot },
  ]

  return (
    <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#0a0a0f]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center gap-6">

        {/* Logo */}
        <Link to="/dashboard" className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
          <div className="w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center">
            <TrendingUp size={14} className="text-white" />
          </div>
          <span className="font-mono">FinSight</span>
        </Link>

        {/* Nav links */}
        <nav className="flex items-center gap-1 flex-1">
          {links.map(({ to, label, icon: Icon }) => {
            const active = pathname === to
            return (
              <Link key={to} to={to}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-sm font-medium transition-all
                  ${active
                    ? 'bg-brand-50 dark:bg-brand-500/10 text-brand-700 dark:text-brand-400'
                    : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}>
                <Icon size={15} />
                {label}
                {active && (
                  <motion.div layoutId="nav-indicator"
                    className="absolute inset-0 rounded-lg bg-brand-50 dark:bg-brand-500/10 -z-10"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.4 }} />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 ml-auto">
          {user && (
            <span className="hidden sm:block text-xs text-slate-500 dark:text-slate-400">
              {user.fullName}
            </span>
          )}
          <button onClick={toggle}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
            {dark ? <Sun size={16} /> : <Moon size={16} />}
          </button>
          <button onClick={logout}
            className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 dark:text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors">
            <LogOut size={16} />
          </button>
        </div>
      </div>
    </header>
  )
}
