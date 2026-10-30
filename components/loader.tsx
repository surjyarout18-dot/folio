'use client'

import { useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const words = ['DATA', 'SIGNAL', 'INSIGHT', 'DECISION']

export function Loader({ onComplete }: { onComplete: () => void }) {
  const reduced = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  const finish = useCallback(() => {
    setProgress(100)
    setDone(true)
    onComplete()
    try {
      sessionStorage.setItem('folio_visited', 'true')
    } catch {}
  }, [onComplete])

  useEffect(() => {
    if (reduced) {
      finish()
      return
    }

    const hasVisited = typeof window !== 'undefined' && sessionStorage.getItem('folio_visited') === 'true'
    // If user has already visited in this session, make it instantaneous (240ms) or snappy 650ms for first-time visitors
    const duration = hasVisited ? 240 : 650
    const start = performance.now()
    let raf = 0

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      // Fast, responsive cubic ease
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(Math.round(eased * 100))
      if (t < 1) {
        raf = requestAnimationFrame(step)
      } else {
        setTimeout(finish, 80)
      }
    }
    raf = requestAnimationFrame(step)

    const onKey = (e: KeyboardEvent) => {
      if (e.key === ' ' || e.key === 'Escape' || e.key === 'Enter') {
        finish()
      }
    }
    window.addEventListener('keydown', onKey)

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('keydown', onKey)
    }
  }, [finish, reduced])

  const wordIndex = Math.min(words.length - 1, Math.floor((progress / 100) * words.length))

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          onClick={finish}
          className="fixed inset-0 z-[150] flex cursor-pointer select-none flex-col justify-between bg-obsidian px-6 py-6 md:px-10 md:py-8"
          initial={{ y: 0, opacity: 1 }}
          exit={{
            y: '-100%',
            opacity: 0.9,
            transition: { duration: 0.5, ease: [0.76, 0, 0.24, 1] },
          }}
          aria-live="polite"
          aria-label="Loading"
        >
          <div className="flex items-center justify-between">
            <span className="eyebrow flex items-center gap-2">
              <span className="size-1.5 animate-pulse rounded-full bg-orange" />
              Surjya Sarathi Rout
            </span>
            <span className="eyebrow text-silver/60">Press space or click to skip</span>
          </div>

          <div className="flex items-end justify-between gap-6">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  className="display block text-[clamp(2.5rem,8vw,7rem)] text-ivory"
                  initial={{ y: '100%', opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: '-100%', opacity: 0 }}
                  transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                >
                  {words[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
            <motion.span
              className="display text-[clamp(2.5rem,8vw,7rem)] tabular-nums text-orange"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 0.2 }}
            >
              {progress.toString().padStart(3, '0')}
            </motion.span>
          </div>

          <div className="relative h-[2px] w-full overflow-hidden bg-ivory/10">
            <motion.div
              className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange to-[#ff8c5a]"
              style={{ width: `${progress}%` }}
              transition={{ ease: 'easeOut', duration: 0.1 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
