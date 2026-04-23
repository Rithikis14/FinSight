import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { TrendingUp, Shield, Brain, Lock, BarChart3, Zap, Sun, Moon, Github, Twitter } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'

const fade = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }
const stagger = { show: { transition: { staggerChildren: 0.1 } } }

const features = [
  { icon: Shield, title: 'Data sovereignty',    desc: 'Your financial data never leaves your machine. Zero telemetry, zero cloud storage — ever.' },
  { icon: Brain,  title: 'Local AI analyst',     desc: 'Powered by Ollama running entirely on your hardware. No OpenAI keys, no subscription fees.' },
  { icon: Lock,   title: 'End-to-end privacy',   desc: 'JWT-secured API, bcrypt-hashed passwords, and pgvector for private RAG — all local.' },
  { icon: BarChart3, title: 'Smart portfolio tracking', desc: 'Manual holdings with real-time P&L, risk scoring, and asset allocation breakdowns.' },
  { icon: Zap,    title: 'RAG-powered context',  desc: 'The AI reads your actual positions before answering — not generic market advice.' },
  { icon: TrendingUp, title: 'Multi-asset support', desc: 'Stocks, ETFs, crypto, bonds, mutual funds — track everything in one place.' },
]

export default function LandingPage() {
  const { dark, toggle } = useTheme()

  return (
    <div className="min-h-screen bg-white dark:bg-[#0a0a0f]">

      {/* Nav */}
      <header className="sticky top-0 z-50 bg-white/80 dark:bg-[#0a0a0f]/80 backdrop-blur-md border-b border-slate-200 dark:border-white/5">
        <div className="max-w-7xl mx-auto px-6 h-14 flex items-center">
          <div className="flex items-center gap-2 font-semibold text-slate-900 dark:text-white">
            <div className="w-7 h-7 bg-brand-600 rounded-lg flex items-center justify-center">
              <TrendingUp size={14} className="text-white" />
            </div>
            <span className="font-mono">FinSight</span>
          </div>
          <div className="ml-auto flex items-center gap-3">
            <button onClick={toggle}
              className="w-8 h-8 flex items-center justify-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
              {dark ? <Sun size={15} /> : <Moon size={15} />}
            </button>
            <Link to="/auth" className="btn-ghost text-sm">Sign in</Link>
            <Link to="/auth?mode=register" className="btn-primary text-sm">Get started</Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="max-w-7xl mx-auto px-6 pt-24 pb-20 text-center">
        <motion.div variants={stagger} initial="hidden" animate="show" className="space-y-6">

          <motion.div variants={fade}>
            <span className="inline-flex items-center gap-2 text-xs font-medium text-brand-700 dark:text-brand-400 bg-brand-50 dark:bg-brand-500/10 border border-brand-200 dark:border-brand-500/20 px-3 py-1 rounded-full">
              <span className="w-1.5 h-1.5 bg-brand-500 rounded-full animate-pulse" />
              100% local · Zero data sharing
            </span>
          </motion.div>

          <motion.h1 variants={fade}
            className="text-5xl sm:text-6xl font-bold text-slate-900 dark:text-white leading-tight tracking-tight">
            Your finances.<br />
            <span className="text-brand-600 dark:text-brand-400">Your AI. Your machine.</span>
          </motion.h1>

          <motion.p variants={fade}
            className="max-w-xl mx-auto text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
            FinSight is a privacy-first investment platform with an AI analyst
            that runs entirely on your hardware — no subscriptions, no data leaks.
          </motion.p>

          <motion.div variants={fade} className="flex items-center justify-center gap-3 pt-2">
            <Link to="/auth?mode=register" className="btn-primary px-6 py-2.5 text-sm">
              Start for free
            </Link>
            <a href="https://github.com" target="_blank" rel="noreferrer"
              className="btn-ghost text-sm flex items-center gap-2">
              <Github size={15} /> View source
            </a>
          </motion.div>
        </motion.div>

        {/* Dashboard preview */}
        <motion.div initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 relative mx-auto max-w-4xl">
          <div className="card p-4 shadow-2xl shadow-slate-200/50 dark:shadow-black/50">
            <div className="flex items-center gap-2 mb-4 pb-3 border-b border-slate-100 dark:border-white/5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
              <span className="ml-2 text-xs text-slate-400 font-mono">finsight — dashboard</span>
            </div>
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: 'Total wealth', value: '$124,850.00', sub: '+12.4%' },
                { label: 'Total P&L',    value: '+$13,720.50', sub: 'All time' },
                { label: 'Risk level',   value: 'Medium',      sub: '6 holdings' },
              ].map(({ label, value, sub }) => (
                <div key={label} className="bg-slate-50 dark:bg-white/5 rounded-lg p-3">
                  <p className="text-xs text-slate-500 dark:text-slate-400 mb-1">{label}</p>
                  <p className="text-lg font-semibold text-slate-900 dark:text-white font-mono">{value}</p>
                  <p className="text-xs text-brand-600 dark:text-brand-400">{sub}</p>
                </div>
              ))}
            </div>
            <div className="space-y-2">
              {[
                { ticker: 'AAPL', name: 'Apple Inc.',   qty: '10', price: '$182.50', pl: '+$250.00', pct: '+1.4%', up: true },
                { ticker: 'ETH',  name: 'Ethereum',     qty: '2',  price: '$2,410',  pl: '+$820.00', pct: '+4.2%', up: true },
                { ticker: 'NVDA', name: 'NVIDIA Corp.', qty: '5',  price: '$450.80', pl: '-$120.00', pct: '-1.2%', up: false },
              ].map(row => (
                <div key={row.ticker} className="flex items-center gap-3 text-xs py-1.5 border-b border-slate-100 dark:border-white/5 last:border-0">
                  <span className="font-mono font-medium w-14 text-slate-900 dark:text-white">{row.ticker}</span>
                  <span className="flex-1 text-slate-500 dark:text-slate-400">{row.name}</span>
                  <span className="font-mono text-slate-600 dark:text-slate-300">{row.price}</span>
                  <span className={`font-mono font-medium ${row.up ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
                    {row.pct}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </section>

      {/* Features */}
      <section className="bg-slate-50 dark:bg-[#080810] border-y border-slate-200 dark:border-white/5 py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-3">Everything you need. Nothing you don't.</h2>
            <p className="text-slate-500 dark:text-slate-400">Built for investors who care about privacy as much as performance.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map(({ icon: Icon, title, desc }, i) => (
              <motion.div key={title}
                initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="card p-5 hover:border-brand-300 dark:hover:border-brand-500/30 transition-colors">
                <div className="w-9 h-9 bg-brand-50 dark:bg-brand-500/10 rounded-lg flex items-center justify-center mb-3">
                  <Icon size={18} className="text-brand-600 dark:text-brand-400" />
                </div>
                <h3 className="font-semibold text-slate-900 dark:text-white mb-1">{title}</h3>
                <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">{desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid sm:grid-cols-3 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-6 h-6 bg-brand-600 rounded flex items-center justify-center">
                <TrendingUp size={12} className="text-white" />
              </div>
              <span className="font-mono font-semibold text-slate-900 dark:text-white">FinSight</span>
            </div>
            <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
              A privacy-centric investment intelligence platform. Built with Spring Boot, React, and local AI.
            </p>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Platform</p>
            <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
              <li><Link to="/auth" className="hover:text-brand-600 dark:hover:text-brand-400">Get started</Link></li>
              <li><a href="#" className="hover:text-brand-600 dark:hover:text-brand-400">Documentation</a></li>
              <li><a href="#" className="hover:text-brand-600 dark:hover:text-brand-400">Privacy policy</a></li>
            </ul>
          </div>
          <div>
            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">Connect</p>
            <div className="flex gap-3">
              {[Github, Twitter].map((Icon, i) => (
                <a key={i} href="#"
                  className="w-8 h-8 flex items-center justify-center rounded-lg bg-slate-100 dark:bg-white/5 text-slate-500 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors">
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-slate-200 dark:border-white/5 pt-6">
          <p className="text-xs text-slate-400 dark:text-slate-500 leading-relaxed">
            <strong>Financial disclaimer:</strong> FinSight and its AI analyst are for informational and educational purposes only.
            Nothing on this platform constitutes financial advice. Always consult a qualified financial advisor before making investment decisions.
            Past performance does not guarantee future results. Investing carries risk, including the potential loss of principal.
          </p>
          <p className="text-xs text-slate-400 dark:text-slate-500 mt-2">© {new Date().getFullYear()} FinSight. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}
