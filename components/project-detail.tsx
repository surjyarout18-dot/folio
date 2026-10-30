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
  const y = useTransform(scrollYProgress, [0, 1], reduced ? ['0%', '0%'] : ['0%', '25%'])
  const scale = useTransform(scrollYProgress, [0, 1], reduced ? [1, 1] : [1, 1.1])

  return (
    <main>
      <article>
        <header className="relative mx-auto max-w-[1600px] px-6 pb-16 pt-32 md:px-10 md:pt-40">
          <FadeUp>
            <Link
              href="/#work"
              className="group inline-flex items-center gap-2 font-display text-[11px] uppercase tracking-[0.2em] text-silver transition-colors hover:text-orange"
            >
              <ArrowLeft className="size-3.5 transition-transform duration-500 group-hover:-translate-x-1" />
              All projects
            </Link>
          </FadeUp>

          <div className="mt-12 flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className="flex items-center gap-4">
                <span className="font-display text-sm text-orange">{project.index}</span>
                <span className="eyebrow">{project.year}</span>
              </div>
              <h1 className="display mt-6 text-[clamp(2.8rem,8vw,9rem)] text-ivory">
                <CharReveal text={project.title.toUpperCase()} delay={0.4} stagger={0.02} />
              </h1>
            </div>
            <FadeUp delay={0.5}>
              <ul className="flex max-w-md flex-wrap gap-2 lg:justify-end">
                {project.tags.map((t) => (
                  <li
                    key={t}
                    className="border border-ivory/15 px-3 py-1.5 font-display text-[10px] uppercase tracking-[0.14em] text-ivory/90"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </FadeUp>
          </div>
        </header>

        <div ref={heroRef} className="relative mx-auto max-w-[1600px] px-6 md:px-10">
          <motion.div
            className="relative aspect-[16/9] w-full overflow-hidden border border-border"
            initial={reduced ? false : { clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            transition={{ duration: 1.2, ease: [0.76, 0, 0.24, 1], delay: 0.5 }}
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

        <section className="mx-auto max-w-[1600px] px-6 py-24 md:px-10 md:py-36" aria-label="Overview">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <span className="eyebrow">Overview</span>
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
            <div className="py-16 lg:pr-16">
              <FadeUp>
                <span className="flex items-center gap-3">
                  <span className="font-display text-xs text-orange">01</span>
                  <span className="eyebrow">Problem</span>
                </span>
                <p className="mt-6 text-lg leading-relaxed text-silver md:text-xl">{project.problem}</p>
              </FadeUp>
            </div>
            <div className="py-16 lg:pl-16">
              <FadeUp delay={0.1}>
                <span className="flex items-center gap-3">
                  <span className="font-display text-xs text-orange">02</span>
                  <span className="eyebrow">Solution</span>
                </span>
                <p className="mt-6 text-lg leading-relaxed text-silver md:text-xl">{project.solution}</p>
              </FadeUp>
            </div>
          </div>
        </section>

        <section className="mx-auto max-w-[1600px] border-t border-border px-6 py-24 md:px-10 md:py-36" aria-label="Key insights">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <FadeUp>
                <span className="flex items-center gap-3">
                  <span className="font-display text-xs text-orange">03</span>
                  <span className="eyebrow">Key insights</span>
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
                <li key={i} className="border-t border-border py-8 first:border-t-0 first:pt-0">
                  <FadeUp delay={i * 0.08}>
                    <div className="flex gap-6">
                      <span className="font-display text-sm text-orange">0{i + 1}</span>
                      <p className="text-lg leading-relaxed text-ivory md:text-2xl">{ins}</p>
                    </div>
                  </FadeUp>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="mx-auto max-w-[1600px] border-t border-border px-6 py-16 md:px-10" aria-label="Links">
          <FadeUp>
            <div className="flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
              <p className="max-w-md text-base text-silver">
                Source code, notebooks and dashboards for this project.
              </p>
              <Magnetic>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noreferrer"
                  className="group relative flex items-center gap-3 overflow-hidden bg-ivory px-6 py-4 font-display text-xs font-medium uppercase tracking-[0.2em] text-obsidian"
                >
                  <span className="absolute inset-0 origin-left scale-x-0 bg-orange transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                  <span className="relative">View project</span>
                  <ArrowUpRight className="relative size-3.5" />
                </a>
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
            alt=""
            fill
            sizes="100vw"
            className="object-cover opacity-20 transition-[opacity,transform] duration-1000 group-hover:scale-105 group-hover:opacity-40"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-obsidian via-obsidian/60 to-obsidian/30" />
        </div>
        <div className="relative mx-auto flex max-w-[1600px] flex-col gap-4 px-6 py-24 md:px-10 md:py-32">
          <span className="eyebrow">Next project</span>
          <div className="flex items-end justify-between gap-6">
            <span className="display text-[clamp(2.4rem,7vw,7rem)] text-ivory transition-colors duration-500 group-hover:text-orange">
              {next.title}
            </span>
            <span className="font-display text-sm text-orange">{next.index}</span>
          </div>
        </div>
      </Link>
    </main>
  )
}
