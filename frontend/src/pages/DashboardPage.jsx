import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { TrendingUp, TrendingDown, Plus, Trash2, RefreshCw, AlertTriangle, ShieldCheck, Zap } from 'lucide-react'
import Navbar from '../components/Navbar'
import AddAssetModal from '../components/AddAssetModal'
import { investmentApi } from '../lib/api'

const fmt = (n, digits = 2) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: digits }).format(n ?? 0)

const pctFmt = (n) => `${n >= 0 ? '+' : ''}${Number(n ?? 0).toFixed(2)}%`

const riskConfig = {
  LOW:    { color: 'text-emerald-600 dark:text-emerald-400', bg: 'bg-emerald-50 dark:bg-emerald-500/10', icon: ShieldCheck },
  MEDIUM: { color: 'text-amber-600 dark:text-amber-400',    bg: 'bg-amber-50 dark:bg-amber-500/10',    icon: Zap },
  HIGH:   { color: 'text-red-600 dark:text-red-400',        bg: 'bg-red-50 dark:bg-red-500/10',        icon: AlertTriangle },
}

function StatCard({ label, value, sub, subUp, loading, children }) {
  return (
    <div className="card p-5">
      <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">{label}</p>
      {loading
        ? <div className="h-7 w-28 bg-slate-100 dark:bg-white/5 rounded animate-pulse mb-1" />
        : <p className="text-2xl font-bold font-mono text-slate-900 dark:text-white tracking-tight">{value}</p>
      }
      {sub !== undefined && (
        loading
          ? <div className="h-4 w-16 bg-slate-100 dark:bg-white/5 rounded animate-pulse mt-1" />
          : <p className={`text-xs mt-1 font-medium ${subUp ? 'text-emerald-600 dark:text-emerald-400' : 'text-red-500 dark:text-red-400'}`}>
              {sub}
            </p>
      )}
      {children}
    </div>
  )
}

export default function DashboardPage() {
  const [investments, setInvestments] = useState([])
  const [summary, setSummary]         = useState(null)
  const [loading, setLoading]         = useState(true)
  const [showModal, setShowModal]     = useState(false)
  const [deleting, setDeleting]       = useState(null)

  const fetchAll = useCallback(async () => {
    setLoading(true)
    try {
      const [invRes, sumRes] = await Promise.all([
        investmentApi.getAll(),
        investmentApi.getSummary(),
      ])
      setInvestments(invRes.data)
      setSummary(sumRes.data)
    } catch (e) {
      console.error(e)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchAll() }, [fetchAll])

  const handleDelete = async (id) => {
    if (!confirm('Remove this holding?')) return
    setDeleting(id)
    try {
      await investmentApi.remove(id)
      await fetchAll()
    } finally {
      setDeleting(null)
    }
  }

  const risk = summary?.riskLevel ?? 'LOW'
  const RiskIcon = riskConfig[risk]?.icon ?? ShieldCheck

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0f]">
      <Navbar />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 space-y-6">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-slate-900 dark:text-white">Portfolio</h1>
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-0.5">Track and manage your holdings</p>
          </div>
          <div className="flex items-center gap-2">
            <button onClick={fetchAll} disabled={loading}
              className="btn-ghost text-sm flex items-center gap-1.5">
              <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
              Refresh
            </button>
            <button onClick={() => setShowModal(true)} className="btn-primary text-sm flex items-center gap-1.5">
              <Plus size={14} /> Add asset
            </button>
          </div>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <StatCard label="Total wealth" loading={loading}
            value={fmt(summary?.totalWealth)}
            sub={pctFmt(summary?.totalProfitLossPct)}
            subUp={(summary?.totalProfitLossPct ?? 0) >= 0} />

          <StatCard label="Total P&L" loading={loading}
            value={fmt(summary?.totalProfitLoss)}
            sub={pctFmt(summary?.totalProfitLossPct)}
            subUp={(summary?.totalProfitLoss ?? 0) >= 0} />

          <div className="card p-5">
            <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2">Risk level</p>
            {loading
              ? <div className="h-7 w-20 bg-slate-100 dark:bg-white/5 rounded animate-pulse" />
              : (
                <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-lg ${riskConfig[risk]?.bg}`}>
                  <RiskIcon size={16} className={riskConfig[risk]?.color} />
                  <span className={`text-lg font-bold font-mono ${riskConfig[risk]?.color}`}>{risk}</span>
                </div>
              )
            }
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-2">
              {summary?.totalHoldings ?? 0} holding{summary?.totalHoldings !== 1 ? 's' : ''}
            </p>
          </div>
        </div>

        {/* Investment table */}
        <div className="card overflow-hidden">
          <div className="px-5 py-4 border-b border-slate-200 dark:border-white/5 flex items-center justify-between">
            <h2 className="font-semibold text-slate-900 dark:text-white text-sm">Holdings</h2>
            <span className="text-xs text-slate-400">{investments.length} asset{investments.length !== 1 ? 's' : ''}</span>
          </div>

          {loading ? (
            <div className="p-5 space-y-3">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="h-10 bg-slate-100 dark:bg-white/5 rounded animate-pulse" />
              ))}
            </div>
          ) : investments.length === 0 ? (
            <div className="py-16 text-center">
              <TrendingUp size={32} className="mx-auto text-slate-300 dark:text-slate-600 mb-3" />
              <p className="text-sm font-medium text-slate-500 dark:text-slate-400">No holdings yet</p>
              <p className="text-xs text-slate-400 dark:text-slate-500 mt-1">Click "Add asset" to get started</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-slate-200 dark:border-white/5">
                    {['Ticker', 'Name', 'Type', 'Qty', 'Avg buy', 'Current', 'Value', 'P&L', ''].map(h => (
                      <th key={h} className="text-left text-xs font-medium text-slate-500 dark:text-slate-400 px-5 py-3 first:pl-5 last:pr-5">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {investments.map((inv, i) => {
                    const up = inv.profitLoss >= 0
                    return (
                      <motion.tr key={inv.id}
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.04 }}
                        className="border-b border-slate-100 dark:border-white/5 last:border-0 hover:bg-slate-50 dark:hover:bg-white/2 transition-colors">
                        <td className="px-5 py-3.5 font-mono font-semibold text-slate-900 dark:text-white">
                          {inv.ticker}
                        </td>
                        <td className="px-5 py-3.5 text-slate-600 dark:text-slate-300 max-w-[140px] truncate">
                          {inv.assetName}
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="text-xs px-2 py-0.5 bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-400 rounded-full">
                            {inv.assetType}
                          </span>
                        </td>
                        <td className="px-5 py-3.5 font-mono text-slate-700 dark:text-slate-300">
                          {Number(inv.quantity).toLocaleString()}
                        </td>
                        <td className="px-5 py-3.5 font-mono text-slate-600 dark:text-slate-400">
                          {fmt(inv.avgBuyPrice)}
                        </td>
                        <td className="px-5 py-3.5 font-mono text-slate-900 dark:text-white">
                          {fmt(inv.currentPrice)}
                        </td>
                        <td className="px-5 py-3.5 font-mono font-medium text-slate-900 dark:text-white">
                          {fmt(inv.currentValue)}
                        </td>
                        <td className="px-5 py-3.5">
                          <span className={up ? 'badge-up' : 'badge-down'}>
                            {up ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
                            {pctFmt(inv.profitLossPct)}
                          </span>
                        </td>
                        <td className="px-5 py-3.5">
                          <button onClick={() => handleDelete(inv.id)}
                            disabled={deleting === inv.id}
                            className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 transition-colors disabled:opacity-50">
                            <Trash2 size={13} />
                          </button>
                        </td>
                      </motion.tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>

      {showModal && (
        <AddAssetModal onClose={() => setShowModal(false)} onAdded={fetchAll} />
      )}
    </div>
  )
}
