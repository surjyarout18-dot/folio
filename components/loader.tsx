'use client'

import { useEffect, useState, useCallback } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { Sparkles } from 'lucide-react'
import { cn } from '@/lib/utils'

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
    // 1900ms for first-time visitors, 1200ms on return visits so the welcome is always smooth and memorable
    const duration = hasVisited ? 1200 : 1900
    const start = performance.now()
    let raf = 0

    const step = (now: number) => {
      const t = Math.min(1, (now - start) / duration)
      // Custom smooth cubic ease-out
      const eased = 1 - Math.pow(1 - t, 3)
      setProgress(Math.round(eased * 100))
      if (t < 1) {
        raf = requestAnimationFrame(step)
      } else {
        setTimeout(finish, 160)
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

  const nameWords = ['SURJYA', 'SARATHI', 'ROUT']

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          onClick={finish}
          className="fixed inset-0 z-[150] flex cursor-pointer select-none flex-col justify-between overflow-hidden bg-obsidian px-6 py-6 md:px-12 md:py-10"
          initial={{ y: 0, opacity: 1 }}
          exit={{
            y: '-100%',
            opacity: 0.96,
            transition: { duration: 0.75, ease: [0.76, 0, 0.24, 1] },
          }}
          aria-live="polite"
          aria-label="Welcome to Surjya Sarathi Rout's Portfolio"
        >
          {/* Ambient center radial glow */}
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.65 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="h-[420px] w-[420px] rounded-full bg-gradient-to-tr from-orange/20 via-[#ff7842]/10 to-transparent blur-[110px]"
            />
          </div>

          {/* Top navigation row */}
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="relative flex size-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-orange shadow-[0_0_8px_#ff5a1f]" />
              </span>
              <span className="font-display text-xs tracking-[0.2em] uppercase text-silver">
                Portfolio Experience
              </span>
            </div>
            <span className="eyebrow text-[10px] text-silver/60 transition-colors hover:text-ivory">
              Click anywhere or press Space to skip
            </span>
          </div>

          {/* Center Stage: Welcome & Name */}
          <div className="relative z-10 my-auto flex flex-col items-center justify-center text-center">
            {/* Welcome pill */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
              className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-orange/30 bg-orange/10 px-4 py-1.5 backdrop-blur-md"
            >
              <Sparkles className="size-3.5 text-orange animate-pulse" />
              <span className="font-display text-[11px] tracking-[0.24em] uppercase text-orange font-medium">
                Welcome to the Portfolio of
              </span>
            </motion.div>

            {/* Giant Animated Name */}
            <h1 className="display flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-center md:gap-x-5">
              {nameWords.map((word, i) => (
                <span key={word} className="block overflow-hidden pb-1">
                  <motion.span
                    className={cn(
                      'display inline-block text-[clamp(2.6rem,8.5vw,7.8rem)] font-bold tracking-tight',
                      i === 0
                        ? 'bg-gradient-to-r from-orange via-[#ff7842] to-[#ffa366] bg-clip-text text-transparent drop-shadow-[0_0_35px_rgba(255,90,31,0.35)]'
                        : 'text-ivory'
                    )}
                    initial={{ y: '120%', opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{
                      duration: 0.75,
                      ease: [0.22, 1, 0.36, 1],
                      delay: 0.2 + i * 0.12,
                    }}
                  >
                    {word}
                  </motion.span>
                </span>
              ))}
            </h1>

            {/* Subtitle / Role */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay: 0.55 }}
              className="mt-6 font-display text-xs md:text-sm tracking-[0.22em] uppercase text-silver"
            >
              Data Scientist &bull; Analytics Engineer &bull; ML Practitioner
            </motion.p>
          </div>

          {/* Bottom Bar: Progress Indicator & Status */}
          <div className="relative z-10 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs">
              <span className="font-display text-[10px] tracking-[0.2em] uppercase text-silver/70">
                {progress < 100 ? 'Initializing Intelligence...' : 'Ready'}
              </span>
              <span className="font-display text-xs font-semibold tabular-nums tracking-widest text-orange">
                {progress.toString().padStart(3, '0')}%
              </span>
            </div>

            <div className="relative h-[2px] w-full overflow-hidden rounded-full bg-ivory/10">
              <motion.div
                className="absolute inset-y-0 left-0 bg-gradient-to-r from-orange via-[#ff8c5a] to-ivory"
                style={{ width: `${progress}%` }}
                transition={{ ease: 'easeOut', duration: 0.1 }}
              />
            </div>
          </div>

          {/* Bottom glowing curtain border */}
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-orange/60 to-transparent" />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
