'use client'

import { useState } from 'react'
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { skillCategories } from '@/lib/data'
import { SectionHeader } from '@/components/sections/section-header'
import { WordReveal, FadeUp } from '@/components/reveal'
import { cn } from '@/lib/utils'
import { Sparkles, Terminal, ChevronRight, Check } from 'lucide-react'

type Active = { category: string; skill: string; description: string } | null

const RADIUS = 38 // percent of container

export function Skills() {
  const [active, setActive] = useState<Active>(null)
  const [selectedCat, setSelectedCat] = useState<string>(skillCategories[0].id)
  const [hoverCat, setHoverCat] = useState<string | null>(null)
  const reduced = useReducedMotion()

  const currentCatId = hoverCat ?? selectedCat
  const currentCategoryObj = skillCategories.find((c) => c.id === currentCatId) ?? skillCategories[0]

  const current = active ?? {
    category: currentCategoryObj.name,
    skill: currentCategoryObj.skills[0].name,
    description: currentCategoryObj.skills[0].description,
  }

  return (
    <section
      id="skills"
      className="relative mx-auto max-w-[1600px] px-6 py-28 md:px-10 md:py-36"
      aria-labelledby="skills-heading"
    >
      <SectionHeader index="02" label="Skills" right="Connected Intelligence Toolkit" />

      <div className="mt-10 flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h2 id="skills-heading" className="display text-[clamp(2.6rem,7vw,7rem)] text-ivory">
            <WordReveal as="span" text={'A CONNECTED\nTOOLKIT.'} highlight={['CONNECTED']} />
          </h2>
        </div>
        <FadeUp delay={0.15}>
          <p className="max-w-sm text-base leading-relaxed text-silver">
            No empty percentages or progress bars. Each node is an instrument that transforms raw data
            into clear, actionable strategy.
          </p>
        </FadeUp>
      </div>

      {/* Category selector pills */}
      <FadeUp delay={0.2} className="mt-10 flex flex-wrap items-center gap-2">
        {skillCategories.map((cat) => {
          const isSelected = currentCatId === cat.id
          return (
            <button
              key={cat.id}
              onClick={() => {
                setSelectedCat(cat.id)
                setHoverCat(null)
                setActive({
                  category: cat.name,
                  skill: cat.skills[0].name,
                  description: cat.skills[0].description,
                })
              }}
              onMouseEnter={() => setHoverCat(cat.id)}
              className={cn(
                'relative px-4 py-2 font-display text-xs uppercase tracking-[0.16em] transition-colors',
                isSelected ? 'text-ivory font-medium' : 'text-silver hover:text-ivory'
              )}
            >
              {isSelected && (
                <motion.div
                  layoutId="activeCategoryPill"
                  className="absolute inset-0 border border-orange bg-orange/15 backdrop-blur-sm"
                  transition={{ type: 'spring', stiffness: 450, damping: 30 }}
                />
              )}
              <span className="relative flex items-center gap-2">
                <span
                  className={cn(
                    'size-1.5 rounded-full transition-colors',
                    isSelected ? 'bg-orange' : 'bg-silver/40'
                  )}
                />
                {cat.name}
              </span>
            </button>
          )
        })}
      </FadeUp>

      <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:items-center">
        {/* Orbital system (desktop / tablet) */}
        <div className="hidden md:block lg:col-span-7">
          <FadeUp>
            <div className="relative mx-auto aspect-square w-full max-w-[620px]">
              {/* Outer orbit rings */}
              <div className="absolute inset-0 rounded-full border border-ivory/[0.06]" />
              <div className="absolute inset-[18%] rounded-full border border-dashed border-ivory/[0.08]" />

              {/* Rotating radar ring */}
              <div
                className={cn(
                  'absolute inset-[7%] rounded-full border border-ivory/[0.06]',
                  !reduced && 'animate-spin-slow'
                )}
              >
                <span className="absolute left-1/2 top-0 size-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange shadow-[0_0_8px_#ff5a1f]" />
              </div>

              {/* Central pulse radar wave */}
              {!reduced && (
                <motion.div
                  className="absolute left-1/2 top-1/2 size-40 -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange/30 pointer-events-none"
                  animate={{ scale: [0.8, 2.2], opacity: [0.6, 0] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: 'easeOut' }}
                />
              )}

              {/* Connection lines & Signal packets */}
              <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100" aria-hidden>
                {skillCategories.map((cat, i) => {
                  const a = (i / skillCategories.length) * Math.PI * 2 - Math.PI / 2
                  const x = 50 + Math.cos(a) * RADIUS
                  const y = 50 + Math.sin(a) * RADIUS
                  const isActive = currentCatId === cat.id
                  return (
                    <g key={cat.id}>
                      <motion.line
                        x1="50"
                        y1="50"
                        x2={x}
                        y2={y}
                        stroke={isActive ? '#FF5A1F' : 'rgba(245,243,239,0.14)'}
                        strokeWidth={isActive ? 0.45 : 0.2}
                        initial={reduced ? false : { pathLength: 0 }}
                        whileInView={{ pathLength: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.1 + i * 0.05, ease: 'easeOut' }}
                      />
                      {isActive && !reduced && (
                        <motion.circle
                          r="0.8"
                          fill="#FF5A1F"
                          initial={{ cx: 50, cy: 50 }}
                          animate={{ cx: x, cy: y }}
                          transition={{
                            duration: 1.6,
                            repeat: Infinity,
                            ease: 'easeInOut',
                          }}
                        />
                      )}
                    </g>
                  )
                })}
              </svg>

              {/* Core */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="absolute left-1/2 top-1/2 flex size-32 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center rounded-full border border-orange/40 bg-obsidian shadow-[0_0_30px_rgba(255,90,31,0.2)]"
              >
                <div className="absolute inset-2 rounded-full bg-orange/10 blur-md" />
                <div className="relative text-center">
                  <span className="block font-display text-[9px] uppercase tracking-[0.22em] text-silver">
                    ENGINE
                  </span>
                  <span className="mt-0.5 block font-display text-sm font-semibold text-ivory">
                    Data → Impact
                  </span>
                  <span className="mt-1 block text-[10px] text-orange">6 Specialized Domains</span>
                </div>
              </motion.div>

              {/* Category orbital nodes */}
              {skillCategories.map((cat, i) => {
                const a = (i / skillCategories.length) * Math.PI * 2 - Math.PI / 2
                const x = 50 + Math.cos(a) * RADIUS
                const y = 50 + Math.sin(a) * RADIUS
                const isActive = currentCatId === cat.id
                return (
                  <div
                    key={cat.id}
                    className="absolute z-20"
                    style={{ left: `${x}%`, top: `${y}%`, transform: 'translate(-50%, -50%)' }}
                    onMouseEnter={() => {
                      setHoverCat(cat.id)
                      setSelectedCat(cat.id)
                    }}
                    onFocus={() => {
                      setHoverCat(cat.id)
                      setSelectedCat(cat.id)
                    }}
                  >
                    <motion.div
                      initial={reduced ? false : { opacity: 0, scale: 0.7 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5, delay: 0.2 + i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                      whileHover={{ scale: 1.06 }}
                      className="relative"
                    >
                      <button
                        onClick={() => {
                          setSelectedCat(cat.id)
                          setActive({
                            category: cat.name,
                            skill: cat.skills[0].name,
                            description: cat.skills[0].description,
                          })
                        }}
                        className={cn(
                          'relative z-10 flex items-center gap-2 border bg-obsidian/90 px-3.5 py-2 font-display text-[11px] uppercase tracking-[0.16em] backdrop-blur-md transition-all duration-300',
                          isActive
                            ? 'border-orange text-orange shadow-[0_0_16px_rgba(255,90,31,0.4)]'
                            : 'border-ivory/15 text-ivory hover:border-ivory/40'
                        )}
                        aria-expanded={isActive}
                      >
                        <span
                          className={cn(
                            'size-1.5 rounded-full transition-colors',
                            isActive ? 'bg-orange animate-ping' : 'bg-silver'
                          )}
                        />
                        {cat.name}
                      </button>
                    </motion.div>
                  </div>
                )
              })}
            </div>
          </FadeUp>
        </div>

        {/* Readout panel */}
        <div className="lg:col-span-5">
          <FadeUp delay={0.1}>
            <div className="border border-border bg-card/75 p-6 backdrop-blur-md md:p-8">
              <div className="flex items-center justify-between border-b border-border/60 pb-4">
                <span className="eyebrow flex items-center gap-2">
                  <Terminal className="size-3 text-orange" />
                  Domain Intelligence
                </span>
                <span className="font-display text-xs text-orange">
                  {currentCategoryObj.skills.length} Tools in {currentCategoryObj.name}
                </span>
              </div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={current.skill}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.25 }}
                  className="mt-6 min-h-[140px]"
                  aria-live="polite"
                >
                  <span className="eyebrow block text-orange">{current.category}</span>
                  <h3 className="display mt-2 text-3xl text-ivory md:text-4xl">{current.skill}</h3>
                  <p className="mt-4 text-base leading-relaxed text-silver">{current.description}</p>
                </motion.div>
              </AnimatePresence>

              {/* Sub-skills interactive pills list */}
              <div className="mt-8 border-t border-border/60 pt-5">
                <span className="eyebrow block text-[10px] text-silver mb-3">Tools & Techniques</span>
                <div className="flex flex-wrap gap-2">
                  {currentCategoryObj.skills.map((s) => {
                    const isSelected = current.skill === s.name
                    return (
                      <motion.button
                        key={s.name}
                        whileHover={{ scale: 1.04 }}
                        whileTap={{ scale: 0.96 }}
                        onClick={() =>
                          setActive({
                            category: currentCategoryObj.name,
                            skill: s.name,
                            description: s.description,
                          })
                        }
                        className={cn(
                          'flex items-center gap-2 border px-3 py-1.5 font-display text-xs transition-colors',
                          isSelected
                            ? 'border-orange bg-orange/15 text-orange'
                            : 'border-ivory/15 bg-obsidian/40 text-ivory hover:border-ivory/40'
                        )}
                      >
                        {isSelected && <Check className="size-3 text-orange" />}
                        {s.name}
                      </motion.button>
                    )
                  })}
                </div>
              </div>
            </div>
          </FadeUp>

          {/* Mobile expandable list */}
          <div className="mt-8 grid gap-3 md:hidden">
            {skillCategories.map((cat) => {
              const isSelected = currentCatId === cat.id
              return (
                <motion.div
                  key={cat.id}
                  whileTap={{ scale: 0.99 }}
                  className={cn(
                    'border p-4 transition-colors',
                    isSelected ? 'border-orange bg-card/90' : 'border-border bg-card/40'
                  )}
                >
                  <button
                    onClick={() => {
                      setSelectedCat(cat.id)
                      setActive({
                        category: cat.name,
                        skill: cat.skills[0].name,
                        description: cat.skills[0].description,
                      })
                    }}
                    className="flex w-full items-center justify-between"
                  >
                    <span className="eyebrow block">{cat.name}</span>
                    <ChevronRight
                      className={cn(
                        'size-4 text-silver transition-transform duration-300',
                        isSelected && 'rotate-90 text-orange'
                      )}
                    />
                  </button>

                  <AnimatePresence>
                    {isSelected && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-3 flex flex-wrap gap-2 pt-2">
                          {cat.skills.map((s) => (
                            <button
                              key={s.name}
                              onClick={(e) => {
                                e.stopPropagation()
                                setActive({
                                  category: cat.name,
                                  skill: s.name,
                                  description: s.description,
                                })
                              }}
                              className={cn(
                                'border px-3 py-1 font-display text-xs transition-colors',
                                active?.skill === s.name
                                  ? 'border-orange bg-orange/15 text-orange'
                                  : 'border-ivory/15 text-ivory'
                              )}
                            >
                              {s.name}
                            </button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
