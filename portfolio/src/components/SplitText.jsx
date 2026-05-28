import { motion, useReducedMotion } from 'framer-motion'

export default function SplitText({ text, delay = 0, className, style }) {
  const prefersReduced = useReducedMotion()

  if (prefersReduced) {
    return <span className={className} style={style}>{text}</span>
  }

  const words = text.split(' ')

  return (
    <span style={{ display: 'inline-flex', flexWrap: 'wrap', gap: '0.25em' }}>
      {words.map((word, i) => (
        <span key={i} style={{ overflow: 'hidden', display: 'inline-block' }}>
          <motion.span
            initial={{ y: '110%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: delay + i * 0.08,
              ease: [0.76, 0, 0.24, 1],
            }}
            style={{ display: 'inline-block', ...style }}
            className={className}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  )
}
