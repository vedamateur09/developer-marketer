import { useState, useEffect } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import Lenis from '@studio-freight/lenis'
import Toggle from './components/Toggle'
import MarketeerMode from './components/MarketeerMode'
import DeveloperMode from './components/DeveloperMode'

/* ─── E1: Smooth scroll ─── */
function useSmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    })
    const raf = (time) => { lenis.raf(time); requestAnimationFrame(raf) }
    requestAnimationFrame(raf)
    return () => lenis.destroy()
  }, [])
}

/* ─── E3: Screen-split curtain transition ─── */
function SplitCurtain({ isClosing, destMode }) {
  const bg = destMode === 'developer' ? '#0D1117' : '#F5F0E8'
  const ease = [0.76, 0, 0.24, 1]

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 9000, display: 'flex', pointerEvents: 'none' }}>
      <motion.div
        initial={{ x: '-100%' }}
        animate={{ x: isClosing ? '0%' : '-100%' }}
        transition={{ duration: 0.55, ease }}
        style={{ width: '50%', height: '100%', background: bg }}
      />
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: isClosing ? '0%' : '100%' }}
        transition={{ duration: 0.55, ease }}
        style={{ width: '50%', height: '100%', background: bg }}
      />
    </div>
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
          transition: 'color 0.15s ease',
          textDecoration: 'none',
        }}
        onMouseEnter={e => { e.currentTarget.style.color = mode === 'marketeer' ? '#FF4C39' : '#E6EDF3' }}
        onMouseLeave={e => { e.currentTarget.style.color = mode === 'marketeer' ? '#1A1A1A' : '#8B949E' }}
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
  useSmoothScroll()
  const prefersReduced = useReducedMotion()

  const [displayedMode, setDisplayedMode] = useState('marketeer')
  const [pendingMode, setPendingMode] = useState(null)
  const [phase, setPhase] = useState('idle') // 'idle' | 'closing' | 'opening'

  function handleToggle(newMode) {
    if (newMode === displayedMode || phase !== 'idle') return

    if (prefersReduced) {
      setDisplayedMode(newMode)
      return
    }

    setPendingMode(newMode)
    setPhase('closing')

    setTimeout(() => {
      setDisplayedMode(newMode)
      setPhase('opening')
      setTimeout(() => {
        setPhase('idle')
        setPendingMode(null)
      }, 600)
    }, 600)
  }

  const isTransitioning = phase !== 'idle'

  return (
    <>
      <Nav mode={displayedMode} onToggle={handleToggle} disabled={isTransitioning} />

      {/* Screen-split curtain — shown during both closing and opening phases */}
      {isTransitioning && (
        <SplitCurtain
          isClosing={phase === 'closing'}
          destMode={pendingMode || displayedMode}
        />
      )}

      <AnimatePresence mode="wait">
        {displayedMode === 'marketeer' ? (
          <MarketeerMode key="marketeer" />
        ) : (
          <DeveloperMode key="developer" />
        )}
      </AnimatePresence>
    </>
  )
}
