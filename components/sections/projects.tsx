'use client'

import { useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useGSAP } from '@gsap/react'
import { projects } from '@/lib/data'
import { ProjectCard } from '@/components/sections/project-card'
import { SectionHeader } from '@/components/sections/section-header'
import { WordReveal, FadeUp } from '@/components/reveal'

gsap.registerPlugin(ScrollTrigger, useGSAP)

export function Projects() {
  const section = useRef<HTMLElement>(null)
  const track = useRef<HTMLDivElement>(null)
  const progress = useRef<HTMLDivElement>(null)

  useGSAP(
    () => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
        const el = track.current
        if (!el) return
        const distance = () => el.scrollWidth - window.innerWidth
        gsap.to(el, {
          x: () => -distance(),
          ease: 'none',
          scrollTrigger: {
            trigger: section.current,
            start: 'top top',
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              if (progress.current) progress.current.style.transform = `scaleX(${self.progress})`
            },
          },
        })
      })
      return () => mm.revert()
    },
    { scope: section }
  )

  return (
    <section
      id="work"
      ref={section}
      className="relative overflow-hidden py-24 lg:flex lg:h-screen lg:flex-col lg:justify-center lg:py-0"
      aria-labelledby="work-heading"
    >
      <div className="mx-auto w-full max-w-[1600px] px-6 md:px-10 lg:absolute lg:left-1/2 lg:top-8 lg:-translate-x-1/2">
        <SectionHeader index="03" label="Selected Work" right="Six signatures" />
      </div>

      <div
        ref={track}
        className="mt-10 flex flex-col gap-6 px-6 md:px-10 lg:mt-0 lg:w-max lg:flex-row lg:items-stretch lg:gap-8 lg:pl-[max(2.5rem,calc((100vw-1600px)/2+2.5rem))] lg:pr-10"
      >
        <div className="flex flex-col justify-end lg:w-[34vw] lg:min-w-[380px] lg:pr-8">
          <h2 id="work-heading" className="display text-[clamp(2.6rem,7vw,7rem)] text-ivory">
            <WordReveal as="span" text={'SELECTED\nPROJECTS.'} highlight={['PROJECTS.']} />
          </h2>
          <FadeUp delay={0.2}>
            <p className="mt-6 max-w-sm text-base leading-relaxed text-silver">
              Each project starts with a real problem and ends with an insight you can act on. Scroll to
              move through the work.
            </p>
            <div className="mt-8 hidden items-center gap-4 lg:flex">
              <div className="h-px w-40 bg-ivory/10">
                <div ref={progress} className="h-full origin-left scale-x-0 bg-orange" />
              </div>
              <span className="eyebrow">Drag the scroll</span>
            </div>
          </FadeUp>
        </div>

        {projects.map((p, i) => (
          <ProjectCard
            key={p.slug}
            project={p}
            priority={i === 0}
            className="h-[70vh] min-h-[480px] w-full lg:h-[72vh] lg:w-[62vw] lg:min-w-[640px] lg:max-w-[980px]"
          />
        ))}
      </div>
    </section>
  )
}
