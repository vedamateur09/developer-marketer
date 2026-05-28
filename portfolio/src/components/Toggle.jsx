import { motion, useReducedMotion } from 'framer-motion'

export default function Toggle({ mode, onToggle, disabled }) {
  const prefersReduced = useReducedMotion()
  const isDev = mode === 'developer'

  const labelColor = isDev ? '#8B949E' : '#1A1A1A'
  const trackBg = isDev ? '#F54E00' : 'rgba(26,26,26,0.15)'
  const knobX = isDev ? 24 : 2

  return (
    <button
      role="switch"
      aria-checked={isDev}
      aria-label="Toggle Developer mode"
      disabled={disabled}
      onClick={() => onToggle(isDev ? 'marketeer' : 'developer')}
      className="flex items-center gap-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
      style={{ background: 'none', border: 'none', padding: 0, cursor: disabled ? 'not-allowed' : 'pointer' }}
    >
      <span
        style={{
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.7rem',
          fontWeight: 700,
          letterSpacing: '0.04em',
          color: labelColor,
          transition: 'color 0.2s ease',
          userSelect: 'none',
        }}
      >
        &lt;/&gt; Dev Mode
      </span>

      {/* Track */}
      <span
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          width: '48px',
          height: '26px',
          borderRadius: '9999px',
          background: trackBg,
          border: isDev ? 'none' : '1.5px solid rgba(26,26,26,0.18)',
          transition: 'background 0.25s ease, border 0.25s ease',
          flexShrink: 0,
        }}
      >
        <motion.span
          animate={prefersReduced ? undefined : { x: knobX }}
          initial={{ x: knobX }}
          transition={{ type: 'spring', stiffness: 380, damping: 42 }}
          style={{
            position: 'absolute',
            width: '20px',
            height: '20px',
            borderRadius: '50%',
            background: '#fff',
            boxShadow: '0 1px 4px rgba(0,0,0,0.25)',
            top: '50%',
            translateY: '-50%',
          }}
        />
      </span>
    </button>
  )
}
