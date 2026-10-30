'use client'

import { useRef } from 'react'
import { motion, useReducedMotion, useScroll, useSpring } from 'framer-motion'
import { timeline } from '@/lib/data'
import { SectionHeader } from '@/components/sections/section-header'
import { WordReveal, FadeUp } from '@/components/reveal'
import { Briefcase, GraduationCap } from 'lucide-react'

export function Experience() {
  const list = useRef<HTMLOListElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: list, offset: ['start 80%', 'end 65%'] })
  const scaleY = useSpring(scrollYProgress, { stiffness: 140, damping: 22, mass: 0.3 })

  return (
    <section
      id="journey"
      className="relative mx-auto max-w-[1600px] px-6 py-28 md:px-10 md:py-36"
      aria-labelledby="journey-heading"
    >
      <SectionHeader index="04" label="Journey" right="Timeline & Milestones" />

      <div className="mt-10 grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <h2 id="journey-heading" className="display text-[clamp(2.6rem,7vw,7rem)] text-ivory">
              <WordReveal as="span" text={'A LINE\nTHROUGH TIME.'} highlight={['TIME.']} />
            </h2>
            <FadeUp delay={0.15}>
              <p className="mt-6 max-w-sm text-base leading-relaxed text-silver">
                From electronics and signal processing to enterprise data pipelines. Every phase
                sharpened the same instinct: isolate the true signal, then build for decisive action.
              </p>
            </FadeUp>
          </div>
        </div>

        <ol ref={list} className="relative lg:col-span-7" aria-label="Career timeline">
          {/* Animated vertical track */}
          <div className="absolute bottom-0 left-[7px] top-0 w-px bg-ivory/10 md:left-[9px]" aria-hidden>
            <motion.div
              className="h-full w-full origin-top bg-gradient-to-b from-orange via-orange to-[#ffaa70] shadow-[0_0_8px_rgba(255,90,31,0.6)]"
              style={{ scaleY: reduced ? 1 : scaleY }}
            />
          </div>

          {timeline.map((item, i) => {
            const isEdu = item.type.toLowerCase().includes('education') || item.type.toLowerCase().includes('degree')
            const Icon = isEdu ? GraduationCap : Briefcase

            return (
              <li key={item.title} className="relative pb-16 pl-10 last:pb-0 md:pl-14">
                <motion.span
                  aria-hidden
                  className="absolute left-0 top-1.5 flex size-[15px] items-center justify-center md:size-[19px]"
                  initial={reduced ? false : { scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: '-15% 0px' }}
                  transition={{ type: 'spring', stiffness: 350, damping: 20, delay: 0.05 }}
                >
                  <span className="absolute inset-0 rounded-full border border-orange/50" />
                  <span className="size-1.5 rounded-full bg-orange shadow-[0_0_8px_#ff5a1f] md:size-2" />
                </motion.span>

                <FadeUp delay={0.05}>
                  <motion.div
                    whileHover={{ x: 6 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    className="group border border-border/80 bg-card/40 p-5 md:p-6 backdrop-blur-sm transition-colors hover:border-orange/50"
                  >
                    <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                      <span className="font-display text-xs font-semibold text-orange">0{i + 1}</span>
                      <span className="eyebrow">{item.phase}</span>
                      <span className="ml-auto flex items-center gap-1.5 border border-ivory/15 bg-obsidian/60 px-2.5 py-0.5 font-display text-[10px] uppercase tracking-[0.14em] text-silver group-hover:border-orange/40 group-hover:text-orange transition-colors">
                        <Icon className="size-3 text-orange" />
                        {item.type}
                      </span>
                    </div>

                    <h3 className="display mt-4 text-2xl text-ivory group-hover:text-ivory md:text-3xl">
                      {item.title}
                    </h3>
                    <p className="mt-1 font-display text-sm font-medium text-orange/90">{item.org}</p>
                    <p className="mt-4 max-w-xl text-base leading-relaxed text-silver">{item.description}</p>
                  </motion.div>
                </FadeUp>
              </li>
            )
          })}
        </ol>
      </div>
    </section>
  )
}
