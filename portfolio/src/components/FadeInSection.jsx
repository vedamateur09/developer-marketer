import { useRef } from 'react'
import { motion, useInView, useReducedMotion } from 'framer-motion'

export default function FadeInSection({ children, delay = 0, direction = 'up', className, style }) {
  const ref = useRef(null)
  const prefersReduced = useReducedMotion()
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <motion.div
      ref={ref}
      initial={prefersReduced ? {} : {
        opacity: 0,
        y: direction === 'up' ? 40 : 0,
        x: direction === 'left' ? -40 : direction === 'right' ? 40 : 0,
      }}
      animate={isInView || prefersReduced ? { opacity: 1, y: 0, x: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  )
}
