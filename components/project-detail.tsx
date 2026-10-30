'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import type { Project } from '@/lib/data'
import { CharReveal, FadeUp, WordReveal } from '@/components/reveal'
import { Magnetic } from '@/components/magnetic'

export function ProjectDetail({ project, next }: { project: Project; next: Project }) {
  const heroRef = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['0%', '20%'])
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 1.08])

  return (
    <main>
      <article>
        <header className="relative mx-auto max-w-[1600px] px-6 pb-14 pt-28 md:px-10 md:pt-36">
          <FadeUp>
            <Link
              href="/#work"
              className="group inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.2em] text-silver transition-colors hover:text-orange"
            >
              <ArrowLeft className="size-3.5 transition-transform duration-300 group-hover:-translate-x-1.5" />
              All projects
            </Link>
          </FadeUp>

          <div className="mt-10 flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-4">
                <span className="font-display text-sm font-semibold text-orange">{project.index}</span>
                <span className="eyebrow">{project.year}</span>
              </div>
              <h1 className="display mt-4 text-[clamp(2.8rem,8vw,9rem)] text-ivory">
                <CharReveal text={project.title.toUpperCase()} delay={0.06} stagger={0.015} />
              </h1>
            </div>
            <FadeUp delay={0.12}>
              <ul className="flex max-w-md flex-wrap gap-2 lg:justify-end">
                {project.tags.map((t) => (
                  <motion.li
                    key={t}
                    whileHover={{ scale: 1.05 }}
                    className="border border-ivory/15 bg-obsidian/60 px-3 py-1.5 font-display text-[10px] uppercase tracking-[0.14em] text-ivory/90 backdrop-blur-sm"
                  >
                    {t}
                  </motion.li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </header>

        <div ref={heroRef} className="relative mx-auto max-w-[1600px] px-6 md:px-10">
          <motion.div
            className="relative aspect-[16/9] w-full overflow-hidden border border-border shadow-2xl"
            initial={reduced ? false : { clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1], delay: 0.12 }}
          >
            <motion.div style={{ y, scale }} className="absolute inset-0">
              <Image
                src={project.image}
                alt={`${project.title} visual`}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            </motion.div>
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent" />
          </motion.div>
        </div>

        <section className="mx-auto max-w-[1600px] px-6 py-20 md:px-10 md:py-28" aria-label="Overview">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="eyebrow">Strategic Overview</span>
            </div>
            <div className="lg:col-span-8">
              <WordReveal
                className="text-2xl leading-snug text-ivory md:text-4xl"
                text={project.description}
              />
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1600px] border-t border-border px-6 md:px-10" aria-label="Case study">
          <div className="grid divide-y divide-border lg:grid-cols-2 lg:divide-x lg:divide-y-0">
            <div className="py-14 lg:pr-14">
              <FadeUp>
                <motion.div
                  whileHover={{ y: -3 }}
                  className="p-6 border border-border/40 bg-card/30 backdrop-blur-sm hover:border-orange/40 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="font-display text-xs font-semibold text-orange">01</span>
                    <span className="eyebrow">Core Problem</span>
                  </span>
                  <p className="mt-5 text-lg leading-relaxed text-silver md:text-xl">{project.problem}</p>
                </motion.div>
              </FadeUp>
            </div>
            <div className="py-14 lg:pl-14">
              <FadeUp delay={0.08}>
                <motion.div
                  whileHover={{ y: -3 }}
                  className="p-6 border border-border/40 bg-card/30 backdrop-blur-sm hover:border-orange/40 transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <span className="font-display text-xs font-semibold text-orange">02</span>
                    <span className="eyebrow">Engineered Solution</span>
                  </span>
                  <p className="mt-5 text-lg leading-relaxed text-silver md:text-xl">{project.solution}</p>
                </motion.div>
              </FadeUp>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1600px] border-t border-border px-6 py-20 md:px-10 md:py-28" aria-label="Key insights">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <FadeUp>
                <span className="flex items-center gap-3">
                  <span className="font-display text-xs font-semibold text-orange">03</span>
                  <span className="eyebrow">Key Insights</span>
                </span>
                <h2 className="display mt-6 text-4xl text-ivory md:text-6xl">
                  WHAT THE
                  <br />
                  DATA <span className="text-orange">SAID.</span>
                </h2>
              </FadeUp>
            </div>
            <ol className="lg:col-span-8">
              {project.insights.map((ins, i) => (
                <li key={i} className="border-t border-border py-7 first:border-t-0 first:pt-0">
                  <FadeUp delay={i * 0.05}>
                    <motion.div
                      whileHover={{ x: 6 }}
                      transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                      className="flex gap-6 cursor-default"
                    >
                      <span className="font-display text-sm font-semibold text-orange">0{i + 1}</span>
                      <p className="text-lg leading-relaxed text-ivory md:text-2xl">{ins}</p>
                    </motion.div>
                  </FadeUp>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto max-w-[1600px] border-t border-border px-6 py-14 md:px-10" aria-label="Links">
          <FadeUp>
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <p className="max-w-md text-base text-silver">
                Explore source code, data notebooks, query schemas and live reports.
              </p>
              <Magnetic>
                <motion.a
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex items-center gap-3 overflow-hidden bg-ivory px-6 py-4 font-display text-xs font-medium uppercase tracking-[0.2em] text-obsidian shadow-lg"
                >
                  <span className="absolute inset-0 origin-left scale-x-0 bg-orange transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                  <span className="relative font-semibold">View project</span>
                  <ArrowUpRight className="relative size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </motion.a>
              </Magnetic>
            </div>
          </FadeUp>
        </section>
      </article>

      <Link
        href={`/projects/${next.slug}`}
        data-cursor="Next"
        className="group relative block overflow-hidden border-t border-border"
      >
        <div className="absolute inset-0">
          <Image
            src={next.image}
            alt={next.title}
            fill
            sizes="100vw"
            className="object-cover opacity-20 transition-[opacity,transform] duration-700 group-hover:scale-105 group-hover:opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/60 to-obsidian/30" />
        </div>
        <div className="relative mx-auto flex max-w-[1600px] flex-col gap-4 px-6 py-20 md:px-10 md:py-28">
          <span className="eyebrow">Next Project</span>
          <div className="flex items-end justify-between gap-6">
            <span className="display text-[clamp(2.4rem,7vw,7rem)] text-ivory transition-colors duration-300 group-hover:text-orange">
              {next.title}
            </span>
            <span className="font-display text-sm font-semibold text-orange">{next.index}</span>
          </div>
        </div>
      </Link>
    </main>
  )
}
