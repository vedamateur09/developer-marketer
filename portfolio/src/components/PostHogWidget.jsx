import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'lucide-react'

const EVENTS = [
  { label: 'pageview fired', done: true },
  { label: 'dev_mode_activated', done: true },
  { label: 'architecture_explored', done: true },
  { label: 'hire_button_hovered...', done: false, pulse: true },
]

export default function PostHogWidget() {
  const [open, setOpen] = useState(false)
  const [visibleCount, setVisibleCount] = useState(0)

  useEffect(() => {
    if (!open) {
      setVisibleCount(0)
      return
    }
    if (visibleCount >= EVENTS.length) return

    const t = setTimeout(() => {
      setVisibleCount(c => c + 1)
    }, 450)
    return () => clearTimeout(t)
  }, [open, visibleCount])

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-2">
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="rounded-lg overflow-hidden shadow-2xl w-72"
            style={{ background: '#161B22', border: '1px solid #30363D' }}
          >
            {/* Header */}
            <div
              className="flex items-center justify-between px-4 py-2.5"
              style={{ borderBottom: '1px solid #30363D' }}
            >
              <span
                className="text-xs font-bold"
                style={{ fontFamily: '"JetBrains Mono", monospace', color: '#F54E00' }}
              >
                🦔 posthog.capture()
              </span>
              <button
                onClick={() => setOpen(false)}
                className="text-gray-500 hover:text-gray-300 transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            {/* Events */}
            <div className="p-3 space-y-1.5">
              {EVENTS.slice(0, visibleCount).map((ev, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 px-3 py-1.5 rounded"
                  style={{ background: '#0D1117' }}
                >
                  {ev.done ? (
                    <span className="text-xs" style={{ color: '#00FF87' }}>✓</span>
                  ) : (
                    <span className="text-xs" style={{ color: '#F54E00' }}>→</span>
                  )}
                  <span
                    className={`text-xs ${ev.pulse ? 'animate-pulse-slow' : ''}`}
                    style={{
                      fontFamily: '"JetBrains Mono", monospace',
                      color: ev.pulse ? '#F54E00' : '#8B949E',
                    }}
                  >
                    {ev.label}
                  </span>
                </motion.div>
              ))}
            </div>

            {/* Footer tooltip */}
            <div
              className="px-4 py-2 text-xs italic"
              style={{
                fontFamily: '"JetBrains Mono", monospace',
                color: '#30363D',
                borderTop: '1px solid #30363D',
              }}
            >
              // hi PostHog 👋. Yes, I&apos;ve read your docs.
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle button */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setOpen(o => !o)}
        className="w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-lg"
        style={{ background: '#F54E00' }}
        aria-label="PostHog event tracker easter egg"
        title="// hi PostHog 👋"
      >
        🦔
      </motion.button>
    </div>
  )
}
