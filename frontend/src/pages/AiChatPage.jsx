import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, Send, User, Loader2, Sparkles, RotateCcw, TrendingUp } from 'lucide-react'
import Navbar from '../components/Navbar'
import { aiApi } from '../lib/api'
import { useAuth } from '../context/AuthContext'

const SUGGESTIONS = [
  'What is my best performing asset?',
  'Am I too exposed to crypto?',
  'Explain dollar-cost averaging',
  'How should I rebalance my portfolio?',
]

function TypingIndicator() {
  return (
    <div className="flex items-end gap-3">
      <div className="w-7 h-7 rounded-full bg-brand-100 dark:bg-brand-500/20 flex items-center justify-center flex-shrink-0">
        <Bot size={14} className="text-brand-600 dark:text-brand-400" />
      </div>
      <div className="card px-4 py-3 flex items-center gap-1.5">
        {[0,1,2].map(i => (
          <motion.div key={i} className="w-1.5 h-1.5 bg-slate-400 rounded-full"
            animate={{ y: [0, -4, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} />
        ))}
      </div>
    </div>
  )
}

function Message({ msg }) {
  const isUser = msg.role === 'user'
  return (
    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
      className={`flex items-end gap-3 ${isUser ? 'flex-row-reverse' : ''}`}>

      <div className={`w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0
        ${isUser
          ? 'bg-brand-600 dark:bg-brand-500'
          : 'bg-brand-100 dark:bg-brand-500/20'}`}>
        {isUser
          ? <User size={14} className="text-white" />
          : <Bot size={14} className="text-brand-600 dark:text-brand-400" />
        }
      </div>

      <div className={`max-w-[80%] ${isUser ? 'items-end' : 'items-start'} flex flex-col gap-1`}>
        <div className={`px-4 py-3 rounded-2xl text-sm leading-relaxed whitespace-pre-wrap
          ${isUser
            ? 'bg-brand-600 dark:bg-brand-500 text-white rounded-br-sm'
            : 'card text-slate-700 dark:text-slate-200 rounded-bl-sm'}`}>
          {msg.content}
        </div>
        {msg.ms && (
          <span className="text-[10px] text-slate-400 px-1">{msg.ms}ms</span>
        )}
      </div>
    </motion.div>
  )
}

export default function AiChatPage() {
  const [messages, setMessages] = useState([])
  const [input, setInput]       = useState('')
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState('')
  const endRef    = useRef(null)
  const inputRef  = useRef(null)
  const { user }  = useAuth()

  useEffect(() => { endRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [messages, loading])

  const send = async (text) => {
    const message = (text || input).trim()
    if (!message || loading) return

    setInput('')
    setError('')
    setMessages(prev => [...prev, { role: 'user', content: message }])
    setLoading(true)

    try {
      const { data } = await aiApi.chat(message)
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: data.response,
        ms: data.processingTimeMs,
      }])
    } catch (err) {
      setError(err.response?.data?.message || 'AI service unavailable. Make sure Ollama is running.')
      setMessages(prev => prev.slice(0, -1))
    } finally {
      setLoading(false)
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }

  const reset = () => { setMessages([]); setError(''); inputRef.current?.focus() }

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  const empty = messages.length === 0

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0a0a0f] flex flex-col">
      <Navbar />

      <main className="flex-1 max-w-3xl w-full mx-auto px-4 sm:px-6 py-6 flex flex-col gap-4">

        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-brand-100 dark:bg-brand-500/20 flex items-center justify-center">
              <Sparkles size={18} className="text-brand-600 dark:text-brand-400" />
            </div>
            <div>
              <h1 className="font-semibold text-slate-900 dark:text-white text-sm">FinSight AI Analyst</h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">Powered by Ollama · 100% local</p>
            </div>
          </div>
          {messages.length > 0 && (
            <button onClick={reset} className="btn-ghost text-xs flex items-center gap-1.5">
              <RotateCcw size={13} /> New chat
            </button>
          )}
        </div>

        {/* Chat area */}
        <div className="flex-1 card overflow-hidden flex flex-col" style={{ minHeight: '60vh' }}>

          <div className="flex-1 overflow-y-auto p-5 space-y-5">
            {empty ? (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="h-full flex flex-col items-center justify-center py-12 text-center gap-4">
                <div className="w-14 h-14 rounded-2xl bg-brand-50 dark:bg-brand-500/10 flex items-center justify-center">
                  <Bot size={28} className="text-brand-600 dark:text-brand-400" />
                </div>
                <div>
                  <h2 className="font-semibold text-slate-900 dark:text-white mb-1">
                    Hello{user?.fullName ? `, ${user.fullName.split(' ')[0]}` : ''}!
                  </h2>
                  <p className="text-sm text-slate-500 dark:text-slate-400 max-w-xs leading-relaxed">
                    I have access to your portfolio and local investment knowledge. Ask me anything.
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-2 w-full max-w-sm mt-2">
                  {SUGGESTIONS.map(s => (
                    <button key={s} onClick={() => send(s)}
                      className="text-left text-xs p-3 card hover:border-brand-300 dark:hover:border-brand-500/30 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white transition-colors leading-relaxed">
                      {s}
                    </button>
                  ))}
                </div>
              </motion.div>
            ) : (
              <AnimatePresence initial={false}>
                {messages.map((msg, i) => <Message key={i} msg={msg} />)}
                {loading && <TypingIndicator />}
              </AnimatePresence>
            )}
            <div ref={endRef} />
          </div>

          {/* Error */}
          {error && (
            <div className="mx-5 mb-3 px-3 py-2 bg-red-50 dark:bg-red-500/10 border border-red-200 dark:border-red-500/20 rounded-lg text-xs text-red-600 dark:text-red-400 flex items-start gap-2">
              <TrendingUp size={13} className="mt-0.5 flex-shrink-0" />
              {error}
            </div>
          )}

          {/* Input */}
          <div className="border-t border-slate-200 dark:border-white/5 p-4">
            <div className="flex items-end gap-2">
              <textarea ref={inputRef} rows={1} value={input}
                onChange={e => { setInput(e.target.value); e.target.style.height = 'auto'; e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px' }}
                onKeyDown={handleKey} placeholder="Ask about your portfolio..."
                className="input flex-1 resize-none py-2.5 leading-5 min-h-[40px]"
                disabled={loading} />
              <button onClick={() => send()} disabled={loading || !input.trim()}
                className="btn-primary px-3 py-2.5 flex-shrink-0 flex items-center gap-1.5 text-sm">
                {loading ? <Loader2 size={14} className="animate-spin" /> : <Send size={14} />}
              </button>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-500 mt-2 text-center">
              AI responses are for informational purposes only — not financial advice.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
