'use client'

import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion'

export function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hovering, setHovering] = useState(false)
  const [label, setLabel] = useState<string | null>(null)
  const reduced = useReducedMotion()

  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const ringX = useSpring(x, { stiffness: 260, damping: 28, mass: 0.6 })
  const ringY = useSpring(y, { stiffness: 260, damping: 28, mass: 0.6 })

  useEffect(() => {
    const fine = window.matchMedia('(pointer: fine)').matches
    if (!fine || reduced) return
    setEnabled(true)
    document.body.classList.add('has-cursor')

    const onMove = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
      const target = (e.target as HTMLElement | null)?.closest<HTMLElement>(
        'a, button, [data-cursor]'
      )
      setHovering(Boolean(target))
      setLabel(target?.dataset.cursor ?? null)
    }
    const onLeave = () => {
      x.set(-100)
      y.set(-100)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    document.documentElement.addEventListener('mouseleave', onLeave)
    return () => {
      window.removeEventListener('mousemove', onMove)
      document.documentElement.removeEventListener('mouseleave', onLeave)
      document.body.classList.remove('has-cursor')
    }
  }, [reduced, x, y])

  if (!enabled) return null

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[200]">
      <motion.div
        className="absolute size-1.5 rounded-full bg-ivory"
        style={{ x, y, translateX: '-50%', translateY: '-50%' }}
      />
      <motion.div
        className="absolute flex items-center justify-center rounded-full border border-ivory/60 mix-blend-difference"
        style={{ x: ringX, y: ringY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          width: label ? 88 : hovering ? 56 : 36,
          height: label ? 88 : hovering ? 56 : 36,
          backgroundColor: label ? 'rgba(245,243,239,1)' : 'rgba(245,243,239,0)',
          borderColor: hovering ? 'rgba(255,90,31,0.9)' : 'rgba(245,243,239,0.5)',
        }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      >
        {label && (
          <span className="font-display text-[10px] font-medium uppercase tracking-[0.18em] text-obsidian">
            {label}
          </span>
        )}
      </motion.div>
    </div>
  )
}
