import { motion } from 'framer-motion'

const MODES = ['marketeer', 'developer']

export default function Toggle({ mode, onToggle, disabled }) {
  return (
    <div
      role="tablist"
      aria-label="Switch between Marketeer and Developer mode"
      className="relative flex items-center rounded-full p-1 gap-0"
      style={{
        background: mode === 'marketeer' ? 'rgba(26,26,26,0.08)' : 'rgba(255,255,255,0.06)',
        border: mode === 'marketeer' ? '1.5px solid rgba(26,26,26,0.15)' : '1px solid #30363D',
        backdropFilter: 'blur(12px)',
      }}
    >
      {MODES.map((m) => {
        const isActive = mode === m
        return (
          <button
            key={m}
            role="tab"
            aria-selected={isActive}
            disabled={disabled}
            onClick={() => onToggle(m)}
            className="relative px-5 py-2 text-xs font-bold tracking-widest uppercase rounded-full
                       transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            style={{
              color: isActive
                ? (m === 'marketeer' ? '#1A1A1A' : '#0D1117')
                : (mode === 'marketeer' ? '#1A1A1A' : '#8B949E'),
              fontFamily: m === 'marketeer' ? '"Space Mono", monospace' : '"JetBrains Mono", monospace',
              zIndex: 2,
            }}
          >
            {isActive && (
              <motion.span
                layoutId="toggle-pill"
                className="absolute inset-0 rounded-full"
                style={{
                  backgroundColor: m === 'marketeer' ? '#FFE500' : '#F54E00',
                  zIndex: -1,
                }}
                transition={{ type: 'spring', stiffness: 400, damping: 35 }}
              />
            )}
            <span className="relative">{m.toUpperCase()}</span>
          </button>
        )
      })}
    </div>
  )
}
