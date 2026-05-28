import { motion } from 'framer-motion'
import { useReducedMotion } from 'framer-motion'

const PLATFORMS = [
  'Salesforce Marketing Cloud',
  'Adobe RT-CDP',
  'Google Analytics 4',
  'Salesforce Agentforce',
  'Adobe Experience Manager',
  'Google Tag Manager',
  'SFMC Web Personalisation',
  'Salesforce Data360',
  'Google Optimize',
]

const DOUBLED = [...PLATFORMS, ...PLATFORMS]

export default function TechMarquee() {
  const prefersReduced = useReducedMotion()

  return (
    <div
      style={{
        overflow: 'hidden',
        borderTop: '1px solid #21262D',
        borderBottom: '1px solid #21262D',
        padding: '14px 0',
        margin: '0 0 48px',
        background: '#0D1117',
        position: 'relative',
        zIndex: 1,
      }}
    >
      <motion.div
        animate={prefersReduced ? undefined : { x: ['0%', '-50%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: '48px', width: 'max-content' }}
      >
        {DOUBLED.map((platform, i) => (
          <span
            key={i}
            style={{
              fontFamily: '"JetBrains Mono", monospace',
              fontSize: '12px',
              color: '#8B949E',
              whiteSpace: 'nowrap',
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
            }}
          >
            <span style={{ color: '#F54E00', fontSize: '8px' }}>◆</span>
            {platform}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
