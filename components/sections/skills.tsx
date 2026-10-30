'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { skillCategories } from '@/lib/data'
import { SectionHeader } from '@/components/sections/section-header'
import { WordReveal, FadeUp } from '@/components/reveal'
import { cn } from '@/lib/utils'

type Active = { category: string; skill: string; description: string } | null

const RADIUS = 38 // percent of container

export function Skills() {
  const [active, setActive] = useState<Active>(null)
  const [hoverCat, setHoverCat] = useState<string | null>(null)
  const reduced = useReducedMotion()

  const current = active ?? {
    category: 'System',
    skill: 'Intelligence stack',
    description: 'Hover or focus a node to see how each tool fits into the way I work.',
  }

  return (
    <section
      id="skills"
      className="relative mx-auto max-w-[1600px] px-6 py-32 md:px-10 md:py-44"
      aria-labelledby="skills-heading"
    >
      <SectionHeader index="02" label="Skills" right="Interactive intelligence system" />

      <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <h2 id="skills-heading" className="display text-[clamp(2.6rem,7vw,7rem)] text-ivory">
          <WordReveal as="span" text={'A CONNECTED\nTOOLKIT.'} highlight={['CONNECTED']} />
        </h2>
        <FadeUp delay={0.2}>
          <p className="max-w-sm text-base leading-relaxed text-silver">
            No percentages, no progress bars. Each node is a tool I use to move from raw data to a
            decision. The connections matter more than any single skill.
          </p>
        </FadeUp>
      </div>

      <div className="mt-20 grid gap-12 lg:grid-cols-12 lg:items-center">
        {/* Orbital system (desktop / tablet) */}
        <div className="hidden md:block lg:col-span-7">
          <FadeUp>
            <div className="relative mx-auto aspect-square w-full max-w-[640px]">
              <div className="absolute inset-0 rounded-full border border-ivory/[0.06]" />
              <div className="absolute inset-[18%] rounded-full border border-dashed border-ivory/[0.08]" />
              <div
                className={cn(
                  'absolute inset-[7%] rounded-full border border-ivory/[0.05]',
                  !reduced && 'animate-spin-slow'
                )}
              >
                <span className="absolute left-1/2 top-0 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange" />
              </div>

              {/* Connection lines */}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden>
                {skillCategories.map((cat, i) => {
                  const a = (i / skillCategories.length) * Math.PI * 2 - Math.PI / 2
                  const x = 50 + Math.cos(a) * RADIUS
                  const y = 50 + Math.sin(a) * RADIUS
                  const isActive = hoverCat === cat.id
                  return (
                    <motion.line
                      key={cat.id}
                      x1="50"
                      y1="50"
                      x2={x}
                      y2={y}
                      stroke={isActive ? '#FF5A1F' : 'rgba(245,243,239,0.14)'}
                      strokeWidth={isActive ? 0.35 : 0.2}
                      initial={reduced ? false : { pathLength: 0 }}
                      whileInView={{ pathLength: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 1.2, delay: 0.2 + i * 0.08, ease: 'easeOut' }}
                    />
                  )
                })}
              </svg>

              {/* Core */}
              <div className="absolute left-1/2 top-1/2 flex size-28 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-orange/40 bg-obsidian">
                <div className="absolute inset-2 rounded-full bg-orange/10 blur-md" />
                <div className="relative text-center">
                  <span className="block font-display text-[10px] uppercase tracking-[0.2em] text-silver">
                    Core
                  </span>
                  <span className="block font-display text-sm font-medium text-ivory">Data → Decision</span>
                </div>
              </div>

              {/* Category nodes */}
              {skillCategories.map((cat, i) => {
                const a = (i / skillCategories.length) * Math.PI * 2 - Math.PI / 2
                const x = 50 + Math.cos(a) * RADIUS
                const y = 50 + Math.sin(a) * RADIUS
                const isActive = hoverCat === cat.id
                return (
                  <div
                    key={cat.id}
                    className="absolute"
                    style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                    onMouseEnter={() => setHoverCat(cat.id)}
                    onMouseLeave={() => {
                      setHoverCat(null)
                      setActive(null)
                    }}
                    onFocus={() => setHoverCat(cat.id)}
                    onBlur={(e) => {
                      if (!e.currentTarget.contains(e.relatedTarget as Node)) {
                        setHoverCat(null)
                        setActive(null)
                      }
                    }}
                  >
                    <motion.div
                      initial={reduced ? false : { opacity: 0, scale: 0.6 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.7, delay: 0.4 + i * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      className="relative"
                    >
                      <button
                        className={cn(
                          'relative z-10 flex items-center gap-2 border bg-obsidian px-3 py-2 font-display text-[11px] uppercase tracking-[0.16em] transition-colors duration-300',
                          isActive ? 'border-orange text-orange' : 'border-ivory/15 text-ivory hover:border-ivory/40'
                        )}
                        aria-expanded={isActive}
                        aria-controls={`skills-${cat.id}`}
                      >
                        <span className={cn('size-1.5 rounded-full', isActive ? 'bg-orange' : 'bg-silver')} />
                        {cat.name}
                      </button>

                      <AnimatePresence>
                        {isActive && (
                          <motion.ul
                            id={`skills-${cat.id}`}
                            className={cn(
                              'absolute z-20 flex min-w-[160px] flex-col gap-1 border border-border bg-card/95 p-2 backdrop-blur-sm',
                              x > 50 ? 'left-full ml-2' : 'right-full mr-2',
                              y > 50 ? 'bottom-0' : 'top-0'
                            )}
                            initial={{ opacity: 0, x: x > 50 ? -8 : 8 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: x > 50 ? -8 : 8 }}
                            transition={{ duration: 0.25 }}
                          >
                            {cat.skills.map((s) => (
                              <li key={s.name}>
                                <button
                                  className={cn(
                                    'flex w-full items-center justify-between gap-3 px-2 py-1.5 text-left font-display text-xs text-ivory transition-colors hover:bg-ivory/5 hover:text-orange',
                                    active?.skill === s.name && 'text-orange'
                                  )}
                                  onMouseEnter={() =>
                                    setActive({ category: cat.name, skill: s.name, description: s.description })
                                  }
                                  onFocus={() =>
                                    setActive({ category: cat.name, skill: s.name, description: s.description })
                                  }
                                >
                                  {s.name}
                                  <span className="size-1 rounded-full bg-current opacity-60" />
                                </button>
                              </li>
                            ))}
                          </motion.ul>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  </div>
                )
              })}
            </div>
          </FadeUp>
        </div>

        {/* Readout panel */}
        <div className="lg:col-span-5">
          <FadeUp delay={0.15}>
            <div className="border border-border bg-card/60 p-6 md:p-8">
              <div className="flex items-center justify-between">
                <span className="eyebrow">Readout</span>
                <span className="font-display text-xs text-orange">
                  {String(skillCategories.reduce((n, c) => n + c.skills.length, 0)).padStart(2, '0')} nodes
                </span>
              </div>
              <AnimatePresence mode="wait">
                <motion.div
                  key={current.skill}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.3 }}
                  className="mt-8 min-h-[160px]"
                  aria-live="polite"
                >
                  <span className="eyebrow block text-orange">{current.category}</span>
                  <h3 className="display mt-3 text-4xl text-ivory md:text-5xl">{current.skill}</h3>
                  <p className="mt-4 text-base leading-relaxed text-silver">{current.description}</p>
                </motion.div>
              </AnimatePresence>
            </div>
          </FadeUp>

          {/* Mobile: list fallback */}
          <div className="mt-8 grid gap-3 md:hidden">
            {skillCategories.map((cat) => (
              <div key={cat.id} className="border border-border p-4">
                <span className="eyebrow block">{cat.name}</span>
                <div className="mt-3 flex flex-wrap gap-2">
                  {cat.skills.map((s) => (
                    <button
                      key={s.name}
                      onClick={() => setActive({ category: cat.name, skill: s.name, description: s.description })}
                      className={cn(
                        'border px-3 py-1.5 font-display text-xs transition-colors',
                        active?.skill === s.name ? 'border-orange text-orange' : 'border-ivory/15 text-ivory'
                      )}
                    >
                      {s.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
