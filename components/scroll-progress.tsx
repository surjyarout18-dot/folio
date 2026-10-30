'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export function ScrollProgress() {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 400,
    damping: 40,
    restDelta: 0.001,
  })

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-x-0 top-0 z-[160] h-[2.5px] bg-transparent"
    >
      <motion.div
        className="h-full origin-left bg-gradient-to-r from-orange via-[#ff783e] to-[#ffaa70] shadow-[0_0_12px_rgba(255,90,31,0.8)]"
        style={{ scaleX }}
      />
    </div>
  )
}

