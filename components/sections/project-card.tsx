'use client'

import { useRef } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, useMotionTemplate, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import type { Project } from '@/lib/data'
import { cn } from '@/lib/utils'

export function ProjectCard({ project, className, priority }: { project: Project; className?: string; priority?: boolean }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const reduced = useReducedMotion()
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [6, -6]), { stiffness: 150, damping: 18 })
  const ry = useSpring(useTransform(mx, [0, 1], [-8, 8]), { stiffness: 150, damping: 18 })
  const glowX = useTransform(mx, [0, 1], ['0%', '100%'])
  const glowY = useTransform(my, [0, 1], ['0%', '100%'])
  const glow = useMotionTemplate`radial-gradient(420px circle at ${glowX} ${glowY}, rgba(255,90,31,0.2), transparent 60%)`

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
        className="preserve-3d h-full"
      >
        <Link
          ref={ref}
          href={`/projects/${project.slug}`}
          onMouseMove={onMove}
          onMouseLeave={onLeave}
          data-cursor="View"
          className="group relative flex h-full flex-col justify-between overflow-hidden border border-border bg-card"
        >
          <div className="absolute inset-0 overflow-hidden">
            <Image
              src={project.image}
              alt=""
              fill
              priority={priority}
              sizes="(max-width: 1024px) 100vw, 70vw"
              className="object-cover opacity-70 transition-[transform,opacity] duration-[1200ms] ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 group-hover:opacity-90"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-obsidian/10" />
            <motion.div
              aria-hidden
              className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-700 group-hover:opacity-100"
              style={{ background: glow }}
            />
          </div>

          <div className="relative flex items-start justify-between p-6 md:p-8">
            <span className="font-display text-sm text-orange">{project.index}</span>
            <span className="eyebrow">{project.year}</span>
          </div>

          <div className="relative p-6 md:p-8">
            <div className="flex flex-wrap gap-2">
              {project.tags.slice(0, 3).map((t) => (
                <span
                  key={t}
                  className="border border-ivory/15 bg-obsidian/60 px-2.5 py-1 font-display text-[10px] uppercase tracking-[0.14em] text-ivory/90 backdrop-blur-sm"
                >
                  {t}
                </span>
              ))}
            </div>
            <div className="mt-5 flex items-end justify-between gap-6">
              <div>
                <h3 className="display text-3xl text-ivory md:text-5xl">{project.title}</h3>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-silver md:text-base">
                  {project.short}
                </p>
              </div>
              <span className="flex size-12 shrink-0 items-center justify-center border border-ivory/20 text-ivory transition-all duration-500 group-hover:border-orange group-hover:bg-orange group-hover:text-obsidian">
                <ArrowUpRight className="size-5 transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </div>
          </div>
        </Link>
      </motion.div>
    </div>
  )
}
