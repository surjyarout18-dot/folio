'use client'

import { useEffect, useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'

const words = ['DATA', 'SIGNAL', 'INSIGHT', 'DECISION']

export function Loader({ onComplete }: { onComplete: () => void }) {
  const reduced = useReducedMotion()
  const [progress, setProgress] = useState(0)
  const [done, setDone] = useState(false)

  useEffect(() => {
    if (reduced) {
      setDone(true)
      onComplete()
      return
    }
    const start = performance.now()
    const duration = 1900
    let raf = 0
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(Math.round(eased * 100))
      if (t < 1) raf = requestAnimationFrame(step)
      else {
        setTimeout(() => {
          setDone(true)
          onComplete()
        }, 250)
      }
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [onComplete, reduced])

  const wordIndex = Math.min(words.length - 1, Math.floor((progress / 100) * words.length))

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          className="fixed inset-0 z-[150] flex flex-col justify-between bg-obsidian px-6 py-6 md:px-10 md:py-8"
          initial={{ y: 0 }}
          exit={{ y: '-100%', transition: { duration: 1, ease: [0.76, 0, 0.24, 1] } }}
          aria-live="polite"
          aria-label="Loading"
        >
          <div className="flex items-center justify-between">
            <span className="eyebrow">Surjya Sarathi Rout</span>
            <span className="eyebrow">Portfolio</span>
          </div>

          <div className="flex items-end justify-between gap-6">
            <div className="overflow-hidden">
              <AnimatePresence mode="wait">
                <motion.span
                  key={wordIndex}
                  className="display block text-[clamp(2.5rem,8vw,7rem)] text-ivory"
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  exit={{ y: '-100%' }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  {words[wordIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
            <span className="display text-[clamp(2.5rem,8vw,7rem)] tabular-nums text-orange">
              {progress.toString().padStart(3, '0')}
            </span>
          </div>

          <div className="relative h-px w-full bg-ivory/10">
            <div
              className="absolute inset-y-0 left-0 bg-orange"
              style={{ width: `${progress}%` }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
