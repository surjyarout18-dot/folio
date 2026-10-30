'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/lib/data'
import { cn } from '@/lib/utils'

export function ProjectCard({
  project,
  className,
  priority,
}: {
  project: Project
  className?: string
  priority?: boolean
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduced = useReducedMotion()
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)

  // Snappy, highly responsive spring for the 3D tilt
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 280, damping: 24 })
  const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 280, damping: 24 })
  const glowX = useTransform(mx, [0, 1], ['0%', '100%'])
  const glowY = useTransform(my, [0, 1], ['0%', '100%'])
  const glow = useMotionTemplate`radial-gradient(450px circle at ${glowX} ${glowY}, rgba(255,90,31,0.25), transparent 65%)`

  const onMove = (e: React.MouseEvent) => {
    if (reduced || !ref.current) return
    const r = ref.current.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const onLeave = () => {
    mx.set(0.5)
    my.set(0.5)
  }

  return (
    <div className={cn('perspective-1200', className)}>
      <motion.div
        style={{ rotateX: reduced ? 0 : rx, rotateY: reduced ? 0 : ry }}
        whileHover={reduced ? {} : { y: -6 }}
        transition={{ type: 'spring', stiffness: 350, damping: 25 }}
        className="preserve-3d h-full"
      >
        <Link
          ref={ref}
          href={`/projects/${project.slug}`}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          data-cursor="View Case"
          className="group relative flex h-full flex-col justify-between overflow-hidden border border-border bg-card transition-colors duration-300 hover:border-orange/60"
        >
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority={priority}
              sizes="(max-width: 1024px) 100vw, 70vw"
              className="object-cover opacity-70 transition-[transform,opacity] duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-obsidian/10" />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
              style={{ background: glow }}
            />
          </div>

          <div className="relative flex items-start justify-between p-6 md:p-8">
            <div className="flex items-center gap-3">
              <span className="font-display text-sm font-semibold text-orange">{project.index}</span>
              <span className="eyebrow">{project.year}</span>
            </div>
            <span className="border border-ivory/15 bg-obsidian/70 px-2.5 py-1 font-display text-[10px] uppercase tracking-wider text-silver backdrop-blur-md transition-colors group-hover:border-orange/60 group-hover:text-orange">
              View Case Study
            </span>
          </div>

          <div className="relative p-6 md:p-8">
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="border border-ivory/15 bg-obsidian/70 px-2.5 py-1 font-display text-[10px] uppercase tracking-[0.14em] text-ivory/90 backdrop-blur-sm transition-colors group-hover:border-orange/30"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-5 flex items-end justify-between gap-6">
              <div>
                <h3 className="display text-3xl text-ivory transition-colors duration-300 group-hover:text-ivory md:text-5xl">
                  {project.title}
                </h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-silver md:text-base">
                  {project.short}
                </p>
              </div>
              <motion.span
                whileHover={{ scale: 1.1 }}
                className="flex size-12 shrink-0 items-center justify-center border border-ivory/20 bg-obsidian/40 text-ivory backdrop-blur-sm transition-all duration-300 group-hover:border-orange group-hover:bg-orange group-hover:text-obsidian shadow-lg"
              >
                <ArrowUpRight className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </motion.span>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  )
}
