'use client'

import { useCallback, useState } from 'react'
import dynamic from 'next/dynamic'
import { motion, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowUpRight } from 'lucide-react'
import { Loader } from '@/components/loader'
import { CharReveal } from '@/components/reveal'
import { Magnetic } from '@/components/magnetic'
import { useSmoothScroll } from '@/components/providers/smooth-scroll'
import { site } from '@/lib/data'

const HeroScene = dynamic(() => import('./scene'), { ssr: false })

const ease = [0.22, 1, 0.36, 1] as const

export function Hero() {
  const [loaded, setLoaded] = useState(false)
  const reduced = useReducedMotion()
  const { scrollTo } = useSmoothScroll()
  const onComplete = useCallback(() => setLoaded(true), [])

  const fade = (delay: number) => ({
    initial: reduced ? false : { opacity: 0, y: 20 },
    animate: loaded ? { opacity: 1, y: 0 } : undefined,
    transition: { duration: 1, ease, delay },
  })

  return (
    <section
      id="top"
      className="relative flex min-h-[100svh] flex-col overflow-hidden"
      aria-labelledby="hero-heading"
    >
      <Loader onComplete={onComplete} />

      <div className="absolute inset-0">
        <HeroScene reduced={Boolean(reduced)} />
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-48 bg-gradient-to-t from-obsidian to-transparent" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-[1600px] flex-1 flex-col justify-between px-6 pb-10 pt-28 md:px-10 md:pb-12">
        <motion.div
          className="flex items-start justify-between gap-6"
          {...fade(0.9)}
        >
          <div>
            <p className="font-display text-sm font-medium tracking-[0.08em] text-ivory md:text-base">
              {site.name.toUpperCase()}
            </p>
            <p className="mt-1 text-xs tracking-[0.18em] uppercase text-silver">
              {site.role}
            </p>
          </div>
          <div className="hidden items-center gap-2 md:flex">
            <span className="size-1.5 animate-pulse rounded-full bg-orange" />
            <span className="eyebrow">Available for opportunities</span>
          </div>
        </motion.div>

        <div className="mt-16 md:mt-0">
          <h1 id="hero-heading" className="display text-[clamp(3.2rem,11.5vw,12.5rem)] text-ivory">
            <CharReveal
              text={'I TURN DATA\nINTO DECISIONS.'}
              active={loaded}
              delay={0.25}
              stagger={0.03}
              highlight="DECISIONS."
            />
          </h1>

          <div className="mt-8 flex flex-col gap-8 md:mt-10 md:flex-row md:items-end md:justify-between">
            <motion.p
              className="max-w-md text-base leading-relaxed text-silver md:text-lg"
              {...fade(1.1)}
            >
              {site.tagline}
            </motion.p>

            <motion.div className="flex flex-wrap items-center gap-4" {...fade(1.25)}>
              <Magnetic>
                <button
                  onClick={() => scrollTo('#work')}
                  className="group relative flex items-center gap-3 overflow-hidden bg-ivory px-6 py-4 font-display text-xs font-medium uppercase tracking-[0.2em] text-obsidian"
                >
                  <span className="absolute inset-0 origin-left scale-x-0 bg-orange transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                  <span className="relative">Explore my work</span>
                  <ArrowDown className="relative size-3.5 transition-transform duration-500 group-hover:translate-y-0.5" />
                </button>
              </Magnetic>
              <Magnetic>
                <button
                  onClick={() => scrollTo('#contact')}
                  className="group flex items-center gap-3 border border-ivory/20 px-6 py-4 font-display text-xs font-medium uppercase tracking-[0.2em] text-ivory transition-colors duration-500 hover:border-orange hover:text-orange"
                >
                  Let&apos;s connect
                  <ArrowUpRight className="size-3.5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </button>
              </Magnetic>
            </motion.div>
          </div>
        </div>

        <motion.div
          className="mt-16 flex items-end justify-between md:mt-20"
          {...fade(1.5)}
        >
          <div className="flex items-center gap-4">
            <div className="relative h-14 w-px overflow-hidden bg-ivory/10">
              <span className="absolute inset-0 origin-top bg-orange animate-scroll-line" />
            </div>
            <span className="eyebrow">Scroll</span>
          </div>
          <p className="hidden font-display text-[11px] uppercase tracking-[0.2em] text-silver md:block">
            Data Science &middot; Analytics &middot; Intelligence
          </p>
        </motion.div>
      </div>
    </section>
  )
}
