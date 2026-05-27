import { useRef } from 'react'
import { motion, useAnimation } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'
import { FileText, Laugh, ToggleLeft } from 'lucide-react'

const ITEMS = [
  {
    icon: FileText,
    title: 'The Written Word',
    body: 'Two longform essays exploring the intersection of marketing, technology, and human behaviour. [SUBSTACK_ARTICLE_1_TITLE] and [SUBSTACK_ARTICLE_2_TITLE].',
    link: '[SUBSTACK_URL]',
    linkLabel: 'Read on Substack →',
  },
  {
    icon: Laugh,
    title: 'Logo Crimes (Retired)',
    body: 'A meme page that tweaked brand logos in absurd ways. Discontinued. Canonically funny.',
    link: '[MEME_PAGE_URL]',
    linkLabel: 'View the archive →',
  },
  {
    icon: ToggleLeft,
    title: 'The Portfolio Itself',
    body: 'The toggle you\'re using right now is the brief. One person. Two modes. Built to prove a point.',
    link: null,
    linkLabel: null,
  },
]

const ALL_ITEMS = [...ITEMS, ...ITEMS]

export default function FilmStrip() {
  const prefersReduced = useReducedMotion()
  const controls = useAnimation()

  const marqueeVariants = {
    animate: {
      x: ['0%', '-50%'],
      transition: {
        duration: 22,
        ease: 'linear',
        repeat: Infinity,
        repeatType: 'loop',
      },
    },
  }

  return (
    <section className="py-16 overflow-hidden" style={{ background: '#1A1A1A' }}>
      <div className="mb-6 px-8 md:px-16">
        <span
          className="text-xs font-bold tracking-widest uppercase"
          style={{ fontFamily: '"Space Mono", monospace', color: '#FFE500' }}
        >
          The Side Projects
        </span>
      </div>

      {/* Film perforation strip top */}
      <div className="h-6 film-perforations mb-3" />

      <div
        className="overflow-hidden"
        onMouseEnter={() => !prefersReduced && controls.stop()}
        onMouseLeave={() => !prefersReduced && controls.start('animate')}
      >
        <motion.div
          className="flex gap-4 px-4"
          variants={marqueeVariants}
          animate={prefersReduced ? undefined : controls}
          initial="animate"
          onViewportEnter={() => !prefersReduced && controls.start('animate')}
          style={{ width: 'max-content' }}
        >
          {ALL_ITEMS.map((item, i) => {
            const Icon = item.icon
            return (
              <div
                key={i}
                className="flex-none w-72 bg-white rounded-lg p-6 flex flex-col gap-3"
                style={{ border: '1px solid #333' }}
              >
                <div className="flex items-center gap-3">
                  <Icon size={20} color="#1A1A1A" />
                  <span
                    className="font-bold text-sm text-mk-ink"
                    style={{ fontFamily: '"DM Sans", sans-serif' }}
                  >
                    {item.title}
                  </span>
                </div>
                <p className="text-xs text-gray-600 leading-relaxed" style={{ fontFamily: '"DM Sans", sans-serif' }}>
                  {item.body}
                </p>
                {item.link && (
                  <a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-bold"
                    style={{ fontFamily: '"Space Mono", monospace', color: '#FF4C39' }}
                    onClick={e => item.link.startsWith('[') && e.preventDefault()}
                  >
                    {item.linkLabel}
                  </a>
                )}
              </div>
            )
          })}
        </motion.div>
      </div>

      {/* Film perforation strip bottom */}
      <div className="h-6 film-perforations mt-3" />
    </section>
  )
}
