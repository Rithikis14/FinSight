import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X, Plus, Loader2 } from 'lucide-react'
import { investmentApi } from '../lib/api'

const ASSET_TYPES = ['STOCK','ETF','CRYPTO','BOND','MUTUAL_FUND','OTHER']

const defaultForm = {
  ticker: '', assetName: '', quantity: '', avgBuyPrice: '',
  currentPrice: '', purchaseDate: '', assetType: 'STOCK',
}

export default function AddAssetModal({ onClose, onAdded }) {
  const [form, setForm]     = useState(defaultForm)
  const [loading, setLoading] = useState(false)
  const [error, setError]   = useState('')

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const submit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await investmentApi.add({
        ...form,
        quantity:     parseFloat(form.quantity),
        avgBuyPrice:  parseFloat(form.avgBuyPrice),
        currentPrice: parseFloat(form.currentPrice),
      })
      onAdded()
      onClose()
    } catch (err) {
      const fe = err.response?.data?.fieldErrors
      if (fe) setError(Object.values(fe).join(' · '))
      else    setError(err.response?.data?.message || 'Failed to add asset')
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        onClick={e => e.target === e.currentTarget && onClose()}>

        <motion.div initial={{ opacity: 0, scale: 0.95, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: 'spring', stiffness: 300, damping: 28 }}
          className="card w-full max-w-md p-6 shadow-xl">

          <div className="flex items-center justify-between mb-5">
            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Add asset</h2>
            <button onClick={onClose}
              className="w-7 h-7 flex items-center justify-center rounded-lg text-slate-400 hover:text-slate-700 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
              <X size={16} />
            </button>
          </div>

          {error && (
            <div className="mb-4 px-3 py-2 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg text-xs text-red-600 dark:text-red-400">
              {error}
            </div>
          )}

          <form onSubmit={submit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Ticker *</label>
                <input className="input uppercase" placeholder="AAPL" required
                  value={form.ticker} onChange={e => update('ticker', e.target.value.toUpperCase())} />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Type *</label>
                <select className="input" value={form.assetType} onChange={e => update('assetType', e.target.value)}>
                  {ASSET_TYPES.map(t => <option key={t} value={t}>{t}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Asset name *</label>
              <input className="input" placeholder="Apple Inc." required
                value={form.assetName} onChange={e => update('assetName', e.target.value)} />
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Quantity *</label>
                <input className="input" type="number" step="0.0001" min="0.0001" placeholder="10" required
                  value={form.quantity} onChange={e => update('quantity', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Avg buy $*</label>
                <input className="input" type="number" step="0.01" min="0.01" placeholder="150.00" required
                  value={form.avgBuyPrice} onChange={e => update('avgBuyPrice', e.target.value)} />
              </div>
              <div>
                <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Current $*</label>
                <input className="input" type="number" step="0.01" min="0.01" placeholder="182.50" required
                  value={form.currentPrice} onChange={e => update('currentPrice', e.target.value)} />
              </div>
            </div>

            <div>
              <label className="block text-xs font-medium text-slate-600 dark:text-slate-400 mb-1">Purchase date *</label>
              <input className="input" type="date" required max={new Date().toISOString().split('T')[0]}
                value={form.purchaseDate} onChange={e => update('purchaseDate', e.target.value)} />
            </div>

            <div className="flex gap-3 pt-1">
              <button type="button" onClick={onClose} className="btn-ghost flex-1 text-sm">Cancel</button>
              <button type="submit" disabled={loading} className="btn-primary flex-1 text-sm flex items-center justify-center gap-2">
                {loading ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
                Add asset
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}
