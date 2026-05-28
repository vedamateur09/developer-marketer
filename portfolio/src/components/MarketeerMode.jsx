import { useState, useEffect, useRef } from 'react'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowDown, Mail, ExternalLink } from 'lucide-react'
import FilmStrip from './FilmStrip'
import ProgressBar from './ProgressBar'
import SplitText from './SplitText'
import MagneticButton from './MagneticButton'
import FadeInSection from './FadeInSection'
import CursorTrail from './CursorTrail'
import { useCountUp } from '../hooks/useCountUp'

/* ─── Data ─── */
const WORK_CARDS = [
  {
    num: '01',
    title: 'LLM × SEO Intelligence',
    desc: 'Used large language models to extract keyword clusters and content gaps for a market research engagement. Turned unstructured data into an SEO brief a CMO could act on.',
    tags: ['LLM', 'SEO', 'Market Research', 'ZS Associates'],
    accent: '#FFE500',
  },
  {
    num: '02',
    title: 'Micro-Segment Cohorts',
    desc: 'Defined behavioural micro-segments using analytics data — moving from broad personas to actionable cohorts that campaign teams could actually target.',
    tags: ['Analytics', 'Segmentation', 'Campaign Strategy', 'ZS Associates'],
    accent: '#FF4C39',
  },
  {
    num: '03',
    title: 'Lead Management Overhaul',
    desc: 'Redesigned lead scoring and routing logic to reduce drop-off across the funnel. Part process design, part platform implementation.',
    tags: ['Lead Management', 'MarTech', 'Funnel Optimisation', 'ZS Associates'],
    accent: '#1C1CF0',
  },
]

/* E4: Rotating audiences for hero */
const AUDIENCES = ['Developers', 'Engineers', 'CTOs', 'Tech Teams', 'PostHog']
const AUDIENCE_DELAYS = [2200, 2200, 2200, 2200, 3200] // PostHog lingers

/* ─── Custom Cursor ─── */
function PaintSplatCursor() {
  const cursorRef = useRef(null)
  const [clicked, setClicked] = useState(false)

  useEffect(() => {
    const move = (e) => {
      if (cursorRef.current) {
        cursorRef.current.style.left = `${e.clientX}px`
        cursorRef.current.style.top = `${e.clientY}px`
      }
    }
    const down = () => setClicked(true)
    const up = () => setClicked(false)
    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
    }
  }, [])

  return (
    <div
      id="mk-cursor"
      ref={cursorRef}
      style={{
        transform: `translate(-50%, -50%) rotate(${clicked ? '20deg' : '0deg'}) scale(${clicked ? 1.3 : 1})`,
        transition: 'transform 0.1s ease',
      }}
    >
      <svg viewBox="0 0 36 36" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18 4C18 4 26 10 28 18C30 26 24 32 18 32C12 32 6 26 8 18C10 10 18 4 18 4Z" fill="#FF4C39" />
        <path d="M10 8C10 8 4 12 6 18C8 24 14 22 16 16C18 10 10 8 10 8Z" fill="#FFE500" opacity="0.8" />
        <path d="M26 10C26 10 32 16 30 22C28 28 24 26 22 20C20 14 26 10 26 10Z" fill="#1C1CF0" opacity="0.7" />
        <circle cx="18" cy="18" r="3" fill="#1A1A1A" />
      </svg>
    </div>
  )
}

/* ─── Blob Background ─── */
function BlobBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 0 }}>
      <div className="mk-blob animate-blob w-96 h-96" style={{ background: '#FFE500', top: '-10%', left: '-5%', animationDelay: '0s' }} />
      <div className="mk-blob animate-blob w-80 h-80" style={{ background: '#FF4C39', top: '30%', right: '-5%', animationDelay: '2.5s' }} />
      <div className="mk-blob animate-blob w-72 h-72" style={{ background: '#1C1CF0', bottom: '10%', left: '20%', animationDelay: '5s' }} />
    </div>
  )
}

/* ─── E4: Kinetic Word-Swap Hero ─── */
function WordSwapLine() {
  const [idx, setIdx] = useState(0)
  const prefersReduced = useReducedMotion()

  useEffect(() => {
    if (prefersReduced) return
    const tick = () => {
      setIdx(prev => {
        const next = (prev + 1) % AUDIENCES.length
        return next
      })
    }
    const t = setTimeout(tick, AUDIENCE_DELAYS[idx])
    return () => clearTimeout(t)
  }, [idx, prefersReduced])

  const isPostHog = AUDIENCES[idx] === 'PostHog'
  const displayText = `${AUDIENCES[idx]} Give a Damn.`

  if (prefersReduced) {
    return (
      <span
        className="block font-bold leading-none"
        style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: 'clamp(3rem, 8vw, 7rem)',
          color: '#FFE500',
          WebkitTextStroke: '2px #1A1A1A',
        }}
      >
        {displayText}
      </span>
    )
  }

  return (
    <div
      style={{
        overflow: 'hidden',
        height: '1.12em',
        position: 'relative',
        fontSize: 'clamp(3rem, 8vw, 7rem)',
        lineHeight: 1.12,
      }}
    >
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
          style={{
            display: 'block',
            fontFamily: '"Playfair Display", serif',
            fontWeight: 900,
            color: isPostHog ? '#FF4C39' : '#FFE500',
            WebkitTextStroke: '2px #1A1A1A',
            whiteSpace: 'nowrap',
          }}
        >
          {displayText}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}

/* ─── Sections ─── */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex flex-col justify-center px-6 md:px-16 pt-24 pb-12" style={{ zIndex: 1 }}>
      <div className="max-w-5xl">
        {/* E5: SplitText word stagger on "I Make" */}
        <div className="mb-2" style={{ fontSize: 'clamp(3rem, 8vw, 7rem)', lineHeight: 1.1 }}>
          <SplitText
            text="I Make"
            delay={0.2}
            style={{
              fontFamily: '"Playfair Display", serif',
              fontWeight: 900,
              color: '#1A1A1A',
              fontSize: 'clamp(3rem, 8vw, 7rem)',
              lineHeight: 1.1,
            }}
          />
        </div>

        {/* E4: Kinetic word-swap second line */}
        <div className="mb-8">
          <WordSwapLine />
        </div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.5 }}
          className="text-lg mb-8 max-w-xl"
          style={{ fontFamily: '"DM Sans", sans-serif', color: '#555' }}
        >
          Marketing Tech Consultant. Campaign builder. LLM tinkerer. Occasional meme artist.
        </motion.p>

        {/* E7: Magnetic CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.4 }}
        >
          <MagneticButton
            href="#work"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 700,
              padding: '16px 32px',
              borderRadius: '9999px',
              color: 'white',
              background: '#FF4C39',
              fontFamily: '"DM Sans", sans-serif',
              fontSize: '1rem',
              textDecoration: 'none',
            }}
          >
            See my work <ArrowDown size={18} />
          </MagneticButton>
        </motion.div>
      </div>
    </section>
  )
}

/* ─── E6: Animated stat item ─── */
function AnimatedStat({ target, suffix = '', label }) {
  const { count, ref } = useCountUp(target)
  return (
    <div ref={ref} className="flex items-baseline gap-4">
      <span
        className="font-bold"
        style={{
          fontFamily: '"Playfair Display", serif',
          fontSize: '3rem',
          color: '#FFE500',
          WebkitTextStroke: '2px #1A1A1A',
        }}
      >
        {count}{suffix}
      </span>
      <span className="text-lg" style={{ fontFamily: '"DM Sans", sans-serif', color: '#1A1A1A' }}>
        {label}
      </span>
    </div>
  )
}

function AboutSection() {
  return (
    <section className="relative px-6 md:px-16 py-20" style={{ zIndex: 1 }}>
      <div className="max-w-5xl mx-auto">
        <span
          className="text-xs font-bold tracking-widest uppercase block mb-6"
          style={{ fontFamily: '"Space Mono", monospace', color: '#FF4C39' }}
        >
          The Pitch
        </span>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          <p className="text-2xl leading-relaxed" style={{ fontFamily: '"DM Sans", sans-serif', color: '#1A1A1A' }}>
            I&apos;m <strong>[YOUR_NAME]</strong>, a Marketing Tech Consultant at ZS Associates. I sit at the
            intersection of campaign thinking and technical execution — building the systems that make
            marketing work, then telling the story of why it matters.
          </p>
          <div className="space-y-6">
            <AnimatedStat target={5} suffix="+" label="platforms integrated" />
            <AnimatedStat target={2} label="Substack essays published" />
            <AnimatedStat target={1} label="meme page (discontinued, iconic)" />
          </div>
        </div>
      </div>
    </section>
  )
}

function WorkHighlights() {
  return (
    <section id="work" className="relative px-6 md:px-16 py-20" style={{ zIndex: 1 }}>
      <div className="max-w-5xl mx-auto">
        <span
          className="text-xs font-bold tracking-widest uppercase block mb-10"
          style={{ fontFamily: '"Space Mono", monospace', color: '#FF4C39' }}
        >
          The Campaigns
        </span>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {WORK_CARDS.map(card => (
            <motion.div
              key={card.num}
              className="mk-card relative p-6 flex flex-col gap-4"
              whileHover={{ y: -8, rotate: 0.8, transition: { duration: 0.2 } }}
              style={{ borderLeft: `4px solid ${card.accent}` }}
            >
              <span
                className="font-bold"
                style={{ fontFamily: '"Playfair Display", serif', fontSize: '3rem', color: card.accent, lineHeight: 1 }}
              >
                {card.num}
              </span>
              <h3 className="font-bold text-xl" style={{ fontFamily: '"DM Sans", sans-serif', color: '#1A1A1A' }}>
                {card.title}
              </h3>
              <p className="text-sm leading-relaxed flex-1" style={{ fontFamily: '"DM Sans", sans-serif', color: '#555' }}>
                {card.desc}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-auto pt-2">
                {card.tags.map(tag => <span key={tag} className="mk-tag">{tag}</span>)}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

function MarketeerFooter() {
  return (
    <footer className="relative px-6 md:px-16 py-20 border-t-2 border-mk-ink" style={{ zIndex: 1 }}>
      <div className="max-w-5xl mx-auto">
        <h2
          className="font-bold mb-8"
          style={{ fontFamily: '"Playfair Display", serif', fontSize: 'clamp(2rem, 5vw, 4rem)', color: '#1A1A1A' }}
        >
          Let&apos;s make something<br />worth reading.
        </h2>
        <div className="flex flex-col md:flex-row md:items-center gap-4 mb-8">
          {/* E7: Magnetic contact buttons */}
          <MagneticButton
            href="mailto:[YOUR_EMAIL]"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 700,
              padding: '12px 24px',
              borderRadius: '9999px',
              border: '2px solid #1A1A1A',
              fontFamily: '"DM Sans", sans-serif',
              color: '#1A1A1A',
              textDecoration: 'none',
              background: 'transparent',
            }}
          >
            <Mail size={18} /> [YOUR_EMAIL]
          </MagneticButton>
          <MagneticButton
            href="[YOUR_LINKEDIN_URL]"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 700,
              padding: '12px 24px',
              borderRadius: '9999px',
              border: '2px solid #1A1A1A',
              fontFamily: '"DM Sans", sans-serif',
              color: '#1A1A1A',
              textDecoration: 'none',
              background: 'transparent',
            }}
          >
            <ExternalLink size={18} /> LinkedIn
          </MagneticButton>
        </div>
        <p style={{ fontFamily: '"Space Mono", monospace', fontSize: '0.75rem', color: '#888' }}>
          // also available in developer flavour ↑
        </p>
      </div>
    </footer>
  )
}

/* ─── Main export ─── */
const modeVariants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.2 } },
  exit: { opacity: 0, transition: { duration: 0.15 } },
}

export default function MarketeerMode() {
  return (
    <motion.div
      variants={modeVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      className="marketeer-mode relative overflow-x-hidden"
    >
      {/* E2: Reading progress bar — cobalt */}
      <ProgressBar color="#1C1CF0" />

      {/* SVG grain texture */}
      <svg className="mk-grain animate-grain" aria-hidden="true">
        <filter id="grain-filter">
          <feTurbulence type="fractalNoise" baseFrequency="0.65" numOctaves="3" stitchTiles="stitch" />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>

      {/* E11: Cursor trail */}
      <CursorTrail />
      <PaintSplatCursor />
      <BlobBackground />

      {/* E9: Scroll-reveal wrapping each section */}
      <HeroSection />
      <FadeInSection delay={0}>
        <AboutSection />
      </FadeInSection>
      <FadeInSection delay={0.1}>
        <WorkHighlights />
      </FadeInSection>
      <FadeInSection delay={0}>
        <FilmStrip />
      </FadeInSection>
      <FadeInSection delay={0}>
        <MarketeerFooter />
      </FadeInSection>
    </motion.div>
  )
}
