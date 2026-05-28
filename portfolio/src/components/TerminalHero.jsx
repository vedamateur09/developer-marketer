import { useState, useEffect, useRef } from 'react'
import { useReducedMotion } from 'framer-motion'

const LINES = [
  { text: '$ whoami', type: 'cmd' },
  { text: '[YOUR_NAME], Marketing Technologist @ ZS Associates', type: 'out' },
  { text: '$ cat skills.txt', type: 'cmd' },
  { text: 'MarTech Architecture | Campaign Automation | CDP Integration | Analytics Engineering', type: 'out' },
  { text: '$ cat currently_applying_to.txt', type: 'cmd' },
  { text: 'Developer Marketer @ PostHog', type: 'out' },
  { text: '$ _', type: 'cmd' },
]

export default function TerminalHero() {
  const prefersReduced = useReducedMotion()
  const [displayedLines, setDisplayedLines] = useState(prefersReduced ? LINES.map(l => l.text) : [])
  const [currentLine, setCurrentLine] = useState(prefersReduced ? LINES.length : 0)
  const [currentChar, setCurrentChar] = useState(0)
  const timerRef = useRef(null)

  useEffect(() => {
    if (prefersReduced) return
    if (currentLine >= LINES.length) return

    const line = LINES[currentLine].text

    if (currentChar < line.length) {
      timerRef.current = setTimeout(() => {
        setDisplayedLines(prev => {
          const next = [...prev]
          next[currentLine] = (next[currentLine] || '') + line[currentChar]
          return next
        })
        setCurrentChar(c => c + 1)
      }, currentChar === 0 && currentLine > 0 ? 300 : 35)
    } else {
      timerRef.current = setTimeout(() => {
        setCurrentLine(l => l + 1)
        setCurrentChar(0)
      }, LINES[currentLine].type === 'out' ? 500 : 200)
    }

    return () => clearTimeout(timerRef.current)
  }, [currentLine, currentChar, prefersReduced])

  return (
    <section className="min-h-screen flex flex-col justify-center px-6 md:px-16 pt-24 pb-12" style={{ position: 'relative' }}>
      {/* E12: Vercel-style PostHog orange glow behind terminal */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '600px',
          height: '400px',
          background: 'radial-gradient(ellipse at center, rgba(245,78,0,0.08) 0%, transparent 70%)',
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
      <div
        className="rounded-lg p-6 md:p-8 max-w-2xl"
        style={{
          background: '#161B22',
          border: '1px solid #30363D',
          fontFamily: '"JetBrains Mono", monospace',
          fontSize: '0.85rem',
          lineHeight: 1.65,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Terminal header dots */}
        <div className="flex gap-2 mb-5">
          <span className="w-3 h-3 rounded-full" style={{ background: '#FF5F57' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#FFBD2E' }} />
          <span className="w-3 h-3 rounded-full" style={{ background: '#28C840' }} />
          <span className="ml-4 text-xs" style={{ color: '#8B949E' }}>terminal — zsh</span>
        </div>

        <div className="space-y-1">
          {LINES.map((line, i) => {
            const displayed = displayedLines[i]
            if (displayed === undefined) return null

            const isCurrentlyTyping = i === currentLine && currentLine < LINES.length
            const showCursor = isCurrentlyTyping

            return (
              <div key={i} style={{ color: line.type === 'cmd' ? '#00FF87' : '#E6EDF3' }}>
                {displayed || ''}
                {showCursor && (
                  <span className="animate-cursor-blink ml-0.5" style={{ color: '#00FF87' }}>█</span>
                )}
              </div>
            )
          })}
          {currentLine >= LINES.length && (
            <span className="animate-cursor-blink" style={{ color: '#00FF87' }}>█</span>
          )}
        </div>
      </div>

      <p
        className="mt-8 text-lg max-w-xl"
        style={{ fontFamily: 'Inter, sans-serif', color: '#8B949E', position: 'relative', zIndex: 1 }}
      >
        I build the systems. Then I explain why they matter.
      </p>
    </section>
  )
}
