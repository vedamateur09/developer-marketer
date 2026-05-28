import { useEffect } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'

export default function CursorTrail() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const springX = useSpring(mouseX, { stiffness: 80, damping: 20 })
  const springY = useSpring(mouseY, { stiffness: 80, damping: 20 })

  useEffect(() => {
    const move = (e) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mouseX, mouseY])

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: springX,
        top: springY,
        translateX: '-50%',
        translateY: '-50%',
        width: 12,
        height: 12,
        borderRadius: '50%',
        background: '#FFE500',
        pointerEvents: 'none',
        zIndex: 9998,
        mixBlendMode: 'multiply',
      }}
    />
  )
}
