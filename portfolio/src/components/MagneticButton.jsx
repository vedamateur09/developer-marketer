import { useRef, useState } from 'react'
import { motion, useReducedMotion } from 'framer-motion'

export default function MagneticButton({ children, style, className, onClick, href, target, rel, strength = 0.3 }) {
  const ref = useRef(null)
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const prefersReduced = useReducedMotion()

  const handleMouseMove = (e) => {
    if (prefersReduced) return
    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    setPosition({
      x: (e.clientX - centerX) * strength,
      y: (e.clientY - centerY) * strength,
    })
  }

  const handleMouseLeave = () => setPosition({ x: 0, y: 0 })

  const props = {
    ref,
    onMouseMove: handleMouseMove,
    onMouseLeave: handleMouseLeave,
    animate: { x: position.x, y: position.y },
    transition: { type: 'spring', stiffness: 150, damping: 15, mass: 0.1 },
    style,
    className,
    onClick,
  }

  if (href) {
    return (
      <motion.a href={href} target={target} rel={rel} {...props}>
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button {...props}>
      {children}
    </motion.button>
  )
}
