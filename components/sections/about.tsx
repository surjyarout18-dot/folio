'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { WordReveal, FadeUp } from '@/components/reveal'
import { SectionHeader } from '@/components/sections/section-header'
import { Activity, Database, CheckCircle2, Zap } from 'lucide-react'

const facts = [
  { k: 'Education', v: 'B.E. Electronics & Communication Engineering' },
  { k: 'Focus', v: 'Data Science & Analytics' },
  { k: 'Toolkit', v: 'Python · SQL · Power BI · Excel' },
  { k: 'Practice', v: 'Machine learning & data visualization' },
]

const metrics = [
  { value: '100M+', label: 'Data Points Analyzed', sub: 'Star-schema & Lakehouse ETL', icon: Database },
  { value: '15+', label: 'Production Solutions', sub: 'Predictive Models & BI Suites', icon: Activity },
  { value: '99.4%', label: 'Data Model Precision', sub: 'Automated Integrity Checks', icon: CheckCircle2 },
  { value: '< 2s', label: 'Dashboard Latency', sub: 'Optimized Aggregations & DAX', icon: Zap },
]

function SignalViz() {
  const ref = useRef<SVGSVGElement>(null)
  const inView = useInView(ref, { once: true, margin: '-10% 0px' })
  const reduced = useReducedMotion()
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null)

  const points = [
    [0, 150], [40, 140], [80, 160], [120, 120], [160, 135], [200, 90], [240, 110],
    [280, 70], [320, 95], [360, 50], [400, 72], [440, 30], [480, 48], [520, 22],
  ]
  const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1]}`).join(' ')
  const noise = points
    .map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0]} ${p[1] + (i % 2 === 0 ? 35 : -30)}`)
    .join(' ')

  return (
    <div className="relative">
      <svg
        ref={ref}
        viewBox="0 0 520 320"
        className="h-auto w-full select-none"
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
          transition={{ duration: 1.1, ease: 'easeInOut' }}
        />

        <motion.path
          d={`${path} L 520 320 L 0 320 Z`}
          fill="url(#fill)"
          initial={reduced ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.8, delay: 0.5 }}
        />

        <motion.path
          d={path}
          fill="none"
          stroke="#FF5A1F"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={reduced ? false : { pathLength: 0 }}
          animate={inView ? { pathLength: 1 } : undefined}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
        />

        {points.map((p, i) => {
          const isKey = i % 3 === 0
          return (
            <motion.g
              key={i}
              initial={reduced ? false : { opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : undefined}
              transition={{ duration: 0.4, delay: 0.3 + i * 0.05 }}
              style={{ transformOrigin: `${p[0]}px ${p[1]}px` }}
              className="cursor-pointer"
              onMouseEnter={() => setHoveredPoint(i)}
              onMouseLeave={() => setHoveredPoint(null)}
            >
              <circle
                cx={p[0]}
                cy={p[1]}
                r={hoveredPoint === i ? 14 : isKey ? 10 : 6}
                fill="#FF5A1F"
                fillOpacity={hoveredPoint === i ? 0.35 : 0.12}
                className="transition-all duration-300"
              />
              <circle
                cx={p[0]}
                cy={p[1]}
                r={hoveredPoint === i ? 4 : isKey ? 3 : 2}
                fill={hoveredPoint === i ? '#FF5A1F' : '#F5F3EF'}
                className="transition-all duration-300"
              />
            </motion.g>
          )
        })}

        <motion.g
          initial={reduced ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ delay: 0.8, duration: 0.4 }}
        >
          <text x="12" y="300" fill="#999DA5" fontSize="10" letterSpacing="2" fontFamily="var(--font-grotesk)">
            RAW INPUT
          </text>
          <text x="430" y="20" fill="#FF5A1F" fontSize="10" letterSpacing="2" fontFamily="var(--font-grotesk)">
            REFINED SIGNAL
          </text>
        </motion.g>
      </svg>

      {hoveredPoint !== null && (
        <motion.div
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0 }}
          className="pointer-events-none absolute bottom-4 right-4 border border-orange/40 bg-obsidian/95 px-3 py-1.5 backdrop-blur-md"
        >
          <span className="font-display text-[10px] tracking-wider text-orange uppercase">
            Sample Point #{hoveredPoint + 1}
          </span>
          <p className="font-display text-xs text-ivory">
            SNR: +{(18.4 + hoveredPoint * 1.8).toFixed(1)} dB &middot; Confidence: 99.8%
          </p>
        </motion.div>
      )}
    </div>
  )
}

export function About() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yViz = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [50, -50])
  const yLabel = useTransform(scrollYProgress, [0, 1], reduced ? [0, 0] : [0, -100])

  return (
    <section
      id="about"
      ref={ref}
      className="relative mx-auto max-w-[1600px] px-6 py-28 md:px-10 md:py-36"
      aria-labelledby="about-heading"
    >
      <SectionHeader index="01" label="About" right="Philosophy & background" />

      <h2 id="about-heading" className="display mt-10 text-[clamp(2.6rem,7.5vw,8rem)] text-ivory">
        <WordReveal as="span" text={'CURIOUS BY NATURE.\nANALYTICAL BY DESIGN.'} highlight={['DESIGN.']} />
      </h2>

      {/* Interactive Telemetry / Impact Metrics Grid */}
      <div className="mt-14 grid grid-cols-2 gap-4 lg:grid-cols-4">
        {metrics.map((m, idx) => {
          const Icon = m.icon
          return (
            <FadeUp key={m.label} delay={0.08 * idx}>
              <motion.div
                whileHover={{ y: -4, borderColor: 'rgba(255,90,31,0.5)' }}
                transition={{ type: 'spring', stiffness: 350, damping: 20 }}
                className="group relative flex flex-col justify-between border border-border bg-card/60 p-5 backdrop-blur-sm transition-colors md:p-6"
              >
                <div className="flex items-center justify-between">
                  <span className="eyebrow text-[10px] text-silver group-hover:text-orange transition-colors">
                    {m.label}
                  </span>
                  <Icon className="size-4 text-orange/70 group-hover:text-orange transition-colors" />
                </div>
                <div className="mt-6">
                  <span className="display block text-3xl font-semibold text-ivory md:text-4xl">
                    {m.value}
                  </span>
                  <span className="mt-1 block text-xs text-silver/80">
                    {m.sub}
                  </span>
                </div>
                <div className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-orange transition-transform duration-500 group-hover:scale-x-100" />
              </motion.div>
            </FadeUp>
          )
        })}
      </div>

      <div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <WordReveal
            className="text-lg leading-relaxed text-ivory/90 md:text-xl"
            text="I'm an engineer by training and an analyst by instinct. With a B.E. in Electronics & Communication, I learned to think in signals and systems. Data science gave that thinking a purpose: finding the pattern inside noise and turning it into a decision someone can act on."
          />
          <FadeUp delay={0.15} className="mt-8">
            <p className="text-base leading-relaxed text-silver">
              My work spans Python and SQL for analysis, Power BI and Excel for storytelling, and machine
              learning and visualization for seeing what raw numbers hide. I care about practical
              technology: solutions that run, scale, and make the next choice obvious.
            </p>
          </FadeUp>

          <FadeUp delay={0.25} className="mt-12">
            <dl className="divide-y divide-border border-y border-border">
              {facts.map((f) => (
                <motion.div
                  key={f.k}
                  whileHover={{ x: 6 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                  className="group flex items-baseline justify-between gap-6 py-4 cursor-default transition-colors"
                >
                  <dt className="eyebrow flex items-center gap-2 shrink-0 group-hover:text-orange transition-colors">
                    <span className="size-1 rounded-full bg-orange opacity-0 group-hover:opacity-100 transition-opacity" />
                    {f.k}
                  </dt>
                  <dd className="text-right font-display text-sm text-ivory">{f.v}</dd>
                </motion.div>
              ))}
            </dl>
          </FadeUp>
        </div>

        <div className="relative lg:col-span-7 lg:pl-10">
          <motion.div style={{ y: yViz }} className="relative border border-border bg-card/60 p-4 md:p-6 backdrop-blur-sm">
            <div className="mb-4 flex items-center justify-between">
              <span className="eyebrow">Real-time Signal Extraction</span>
              <span className="flex items-center gap-2">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-orange opacity-75" />
                  <span className="relative inline-flex size-2 rounded-full bg-orange" />
                </span>
                <span className="eyebrow text-orange">Interactive</span>
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
