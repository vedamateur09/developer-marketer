import { useState, useEffect, useRef } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Toggle from './components/Toggle'
import MarketeerMode from './components/MarketeerMode'
import DeveloperMode from './components/DeveloperMode'

/* ─── Glitch transition overlay (Marketeer → Developer) ─── */
function GlitchTransition({ onComplete }) {
  const prefersReduced = useReducedMotion()
  const [text, setText] = useState('')
  const MSG = '> switching_to_dev_mode... ✓'

  useEffect(() => {
    if (prefersReduced) { onComplete(); return }

    let i = 0
    const t = setInterval(() => {
      setText(MSG.slice(0, i + 1))
      i++
      if (i >= MSG.length) {
        clearInterval(t)
        setTimeout(onComplete, 400)
      }
    }, 40)
    return () => clearInterval(t)
  }, [prefersReduced])

  const layers = [
    { bg: '#fff', delay: 0, duration: 0.25 },
    { bg: '#000', delay: 0.08, duration: 0.28 },
    { bg: '#0D1117', delay: 0.16, duration: 0.35 },
  ]

  return (
    <div className="fixed inset-0 z-50 overflow-hidden pointer-events-none">
      {layers.map((l, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 origin-left"
          style={{ background: l.bg }}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: [0, 1, 1, 0] }}
          transition={{
            duration: l.duration * 2,
            delay: l.delay,
            times: [0, 0.4, 0.6, 1],
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Terminal boot text */}
      <div
        className="absolute inset-0 flex items-center justify-center"
        style={{ zIndex: 10 }}
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{
            fontFamily: '"JetBrains Mono", monospace',
            fontSize: '1.1rem',
            color: '#00FF87',
            background: '#0D1117',
            padding: '12px 24px',
            borderRadius: '6px',
            border: '1px solid #30363D',
          }}
        >
          {text}
          {text.length < MSG.length && (
            <span className="animate-cursor-blink">█</span>
          )}
        </motion.div>
      </div>
    </div>
  )
}

/* ─── Ink bleed transition overlay (Developer → Marketeer) ─── */
function InkTransition({ onComplete }) {
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) { onComplete(); return }
  }, [prefersReduced])

  if (prefersReduced) return null

  return (
    <motion.div
      className="fixed inset-0 z-50 pointer-events-none"
      style={{
        background: '#FFE500',
        filter: 'url(#ink-filter)',
      }}
      initial={{ clipPath: 'circle(0% at 50% 50%)' }}
      animate={{ clipPath: 'circle(150% at 50% 50%)' }}
      exit={{ clipPath: 'circle(150% at 50% 50%)' }}
      transition={{ duration: 0.7, ease: [0.4, 0, 0.2, 1] }}
      onAnimationComplete={onComplete}
    />
  )
}

/* ─── Nav ─── */
function Nav({ mode, onToggle, disabled }) {
  return (
    <nav
      className="fixed top-0 left-0 right-0 z-40 flex items-center justify-between px-6 md:px-10 py-4"
      style={{
        background: mode === 'marketeer' ? 'rgba(245,240,232,0.85)' : 'rgba(13,17,23,0.85)',
        borderBottom: mode === 'developer' ? '1px solid #30363D' : 'none',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
      }}
    >
      <span
        className="font-bold text-sm"
        style={{
          fontFamily: mode === 'marketeer' ? '"Playfair Display", serif' : '"JetBrains Mono", monospace',
          color: mode === 'marketeer' ? '#1A1A1A' : '#E6EDF3',
        }}
      >
        [YOUR_NAME]
      </span>

      <Toggle mode={mode} onToggle={onToggle} disabled={disabled} />

      <a
        href={mode === 'marketeer' ? '#work' : undefined}
        className="text-xs font-bold tracking-wider uppercase"
        style={{
          fontFamily: mode === 'marketeer' ? '"Space Mono", monospace' : '"JetBrains Mono", monospace',
          color: mode === 'marketeer' ? '#1A1A1A' : '#8B949E',
        }}
        onClick={(e) => {
          if (mode === 'developer') {
            e.preventDefault()
            document.querySelector('footer')?.scrollIntoView({ behavior: 'smooth' })
          }
        }}
      >
        Contact
      </a>
    </nav>
  )
}

/* ─── Root App ─── */
export default function App() {
  const [mode, setMode] = useState('marketeer')
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [pendingMode, setPendingMode] = useState(null)

  function handleToggle(newMode) {
    if (newMode === mode || isTransitioning) return
    setIsTransitioning(true)
    setPendingMode(newMode)
  }

  function handleTransitionComplete() {
    if (pendingMode) setMode(pendingMode)
    setPendingMode(null)
    setIsTransitioning(false)
  }

  return (
    <>
      <Nav mode={mode} onToggle={handleToggle} disabled={isTransitioning} />

      {/* Transition overlays — outside AnimatePresence so they layer over both modes */}
      {isTransitioning && pendingMode === 'developer' && (
        <GlitchTransition onComplete={handleTransitionComplete} />
      )}
      {isTransitioning && pendingMode === 'marketeer' && (
        <InkTransition onComplete={handleTransitionComplete} />
      )}

      <AnimatePresence mode="wait">
        {mode === 'marketeer' ? (
          <MarketeerMode key="marketeer" />
        ) : (
          <DeveloperMode key="developer" />
        )}
      </AnimatePresence>
    </>
  )
}
