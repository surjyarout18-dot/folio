'use client'

import { useRef } from 'react'
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { WordReveal, FadeUp } from '@/components/reveal'
import { SectionHeader } from '@/components/sections/section-header'

const facts = [
  { k: 'Education', v: 'B.E. Electronics & Communication Engineering' },
  { k: 'Focus', v: 'Data Science & Analytics' },
  { k: 'Toolkit', v: 'Python · SQL · Power BI · Excel' },
  { k: 'Practice', v: 'Machine learning & data visualization' },
]

function SignalViz() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-15% 0px' })
  const reduced = useReducedMotion()

  const points = [
    [0, 150], [40, 140], [80, 160], [120, 120], [160, 135], [200, 90], [240, 110],
    [280, 70], [320, 95], [360, 50], [400, 72], [440, 30], [480, 48], [520, 22],
  ]
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ')
  const noise = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1] + (i % 2 === 0 ? 35 : -30)}`)
    .join(' ')

  return (
    <svg
      ref={ref}
      viewBox="0 0 520 320"
      className="h-auto w-full"
      role="img"
      aria-label="Abstract visualization of a clean signal extracted from noisy data"
    >
      <defs>
        <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
          <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(245,243,239,0.06)" strokeWidth="1" />
        </pattern>
        <linearGradient id="fill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#FF5A1F" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#FF5A1F" stopOpacity="0" />
        </linearGradient>
      </defs>
      <rect width="520" height="320" fill="url(#grid)" />

      {[80, 160, 240].map((y) => (
        <line key={y} x1="0" x2="520" y1={y} y2={y} stroke="rgba(245,243,239,0.12)" strokeDasharray="2 6" />
      ))}

      <motion.path
        d={noise}
        fill="none"
        stroke="#999DA5"
        strokeWidth="1"
        strokeOpacity="0.4"
        initial={reduced ? false : { pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : undefined}
        transition={{ duration: 2.2, ease: 'easeInOut' }}
      />

      <motion.path
        d={`${path} L 520 320 L 0 320 Z`}
        fill="url(#fill)"
        initial={reduced ? false : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : undefined}
        transition={{ duration: 1.4, delay: 1.2 }}
      />

      <motion.path
        d={path}
        fill="none"
        stroke="#FF5A1F"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        initial={reduced ? false : { pathLength: 0 }}
        animate={inView ? { pathLength: 1 } : undefined}
        transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1], delay: 0.4 }}
      />

      {points.filter((_, i) => i % 3 === 0).map((p, i) => (
        <motion.g key={i}
          initial={reduced ? false : { opacity: 0, scale: 0 }}
          animate={inView ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.5, delay: 0.6 + i * 0.3 }}
          style={{ transformOrigin: `${p[0]}px ${p[1]}px` }}
        >
          <circle cx={p[0]} cy={p[1]} r="10" fill="#FF5A1F" fillOpacity="0.12" />
          <circle cx={p[0]} cy={p[1]} r="3" fill="#F5F3EF" />
        </motion.g>
      ))}

      <motion.g
        initial={reduced ? false : { opacity: 0 }}
        animate={inView ? { opacity: 1 } : undefined}
        transition={{ delay: 2.4, duration: 0.8 }}
      >
        <text x="12" y="300" fill="#999DA5" fontSize="10" letterSpacing="2" fontFamily="var(--font-grotesk)">
          NOISE
        </text>
        <text x="458" y="18" fill="#FF5A1F" fontSize="10" letterSpacing="2" fontFamily="var(--font-grotesk)">
          SIGNAL
        </text>
      </motion.g>
    </svg>
  )
}

export function About() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yViz = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [80, -80])
  const yLabel = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -140])

  return (
    <section
      id="about"
      ref={ref}
      className="relative mx-auto max-w-[1600px] px-6 py-32 md:px-10 md:py-44"
      aria-labelledby="about-heading"
    >
      <SectionHeader index="01" label="About" />

      <h2 id="about-heading" className="display mt-10 text-[clamp(2.6rem,7.5vw,8rem)] text-ivory">
        <WordReveal as="span" text={'CURIOUS BY NATURE.\nANALYTICAL BY DESIGN.'} highlight={['DESIGN']} />
      </h2>

      <div className="mt-20 grid gap-16 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <WordReveal
            className="text-lg leading-relaxed text-ivory/90 md:text-xl"
            text="I'm an engineer by training and an analyst by instinct. With a B.E. in Electronics & Communication, I learned to think in signals and systems. Data science gave that thinking a purpose: finding the pattern inside noise and turning it into a decision someone can act on."
          />
          <FadeUp delay={0.2} className="mt-8">
            <p className="text-base leading-relaxed text-silver">
              My work spans Python and SQL for analysis, Power BI and Excel for storytelling, and machine
              learning and visualization for seeing what raw numbers hide. I care about practical
              technology: solutions that run, scale, and make the next choice obvious.
            </p>
          </FadeUp>

          <FadeUp delay={0.3} className="mt-12">
            <dl className="divide-y divide-border border-y border-border">
              {facts.map((f) => (
                <div key={f.k} className="flex items-baseline justify-between gap-6 py-4">
                  <dt className="eyebrow shrink-0">{f.k}</dt>
                  <dd className="text-right font-display text-sm text-ivory">{f.v}</dd>
                </div>
              ))}
            </dl>
          </FadeUp>
        </div>

        <div className="relative lg:col-span-7 lg:pl-10">
          <motion.div style={{ y: yViz }} className="relative border border-border bg-card/60 p-4 md:p-6">
            <div className="mb-4 flex items-center justify-between">
              <span className="eyebrow">Signal extraction</span>
              <span className="flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-orange" />
                <span className="eyebrow">Live</span>
              </span>
            </div>
            <SignalViz />
          </motion.div>
          <motion.span
            style={{ y: yLabel }}
            className="display pointer-events-none absolute -right-2 -top-10 hidden select-none text-[9rem] leading-none text-ivory/[0.035] lg:block"
            aria-hidden
          >
            DATA
          </motion.span>
        </div>
      </div>
    </section>
  )
}
