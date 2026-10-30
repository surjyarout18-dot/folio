'use client'

import { ArrowUpRight, Download, Mail } from 'lucide-react'
import { site } from '@/lib/data'
import { SectionHeader } from '@/components/sections/section-header'
import { WordReveal, FadeUp } from '@/components/reveal'
import { Magnetic } from '@/components/magnetic'

const channels = [
  { label: 'Email', value: site.email, href: `mailto:${site.email}`, external: false },
  { label: 'LinkedIn', value: 'in/surjya-sarathi-rout', href: site.linkedin, external: true },
  { label: 'GitHub', value: 'github.com/surjyarout', href: site.github, external: true },
]

export function Contact() {
  return (
    <section
      id="contact"
      className="relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Ambient orb */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[55%] size-[70vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 animate-orb rounded-full bg-[radial-gradient(circle_at_center,rgba(255,90,31,0.28)_0%,rgba(255,90,31,0.08)_35%,transparent_65%)] blur-2xl" />
        <div className="absolute left-1/2 top-[55%] size-[26vw] max-w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange/20" />
        <div className="absolute left-1/2 top-[55%] size-[40vw] max-w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ivory/[0.05]" />
      </div>

      <div className="relative mx-auto max-w-[1600px] px-6 py-32 md:px-10 md:py-48">
        <SectionHeader index="05" label="Contact" right="Let's find the signal" />

        <h2 id="contact-heading" className="display mt-16 text-center text-[clamp(3rem,10vw,11rem)] text-ivory">
          <WordReveal as="span" text={'HAVE A PROBLEM?\nLET\u2019S FIND THE SIGNAL.'} highlight={['SIGNAL.']} />
        </h2>

        <FadeUp delay={0.3} className="mt-14 flex flex-col items-center gap-5">
          <Magnetic>
            <a
              href={`mailto:${site.email}`}
              className="group relative flex items-center gap-3 overflow-hidden bg-ivory px-8 py-5 font-display text-xs font-medium uppercase tracking-[0.2em] text-obsidian"
            >
              <span className="absolute inset-0 origin-left scale-x-0 bg-orange transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
              <Mail className="relative size-4" />
              <span className="relative">Start a conversation</span>
            </a>
          </Magnetic>
          <Magnetic strength={0.2}>
            <a
              href={site.resume}
              download
              className="group flex items-center gap-2 border border-ivory/15 px-5 py-3 font-display text-[11px] uppercase tracking-[0.2em] text-silver transition-colors hover:border-orange hover:text-orange"
            >
              <Download className="size-3.5" />
              Download resume
            </a>
          </Magnetic>
        </FadeUp>

        <FadeUp delay={0.4} className="mt-24">
          <ul className="grid divide-y divide-border border-y border-border md:grid-cols-3 md:divide-x md:divide-y-0">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target={c.external ? '_blank' : undefined}
                  rel={c.external ? 'noreferrer' : undefined}
                  className="group flex items-center justify-between gap-4 px-2 py-7 transition-colors hover:bg-ivory/[0.03] md:px-8"
                >
                  <div>
                    <span className="eyebrow block">{c.label}</span>
                    <span className="mt-2 block font-display text-base text-ivory transition-colors group-hover:text-orange md:text-lg">
                      {c.value}
                    </span>
                  </div>
                  <ArrowUpRight className="size-5 text-silver transition-all duration-500 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-orange" />
                </a>
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </section>
  )
}
