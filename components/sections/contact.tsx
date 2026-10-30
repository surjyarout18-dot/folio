'use client'

import { useState } from 'react'
import { motion, useMotionValue, useSpring, useReducedMotion, AnimatePresence } from 'framer-motion'
import { ArrowUpRight, Download, Mail, Copy, Check } from 'lucide-react'
import { site } from '@/lib/data'
import { SectionHeader } from '@/components/sections/section-header'
import { WordReveal, FadeUp } from '@/components/reveal'
import { Magnetic } from '@/components/magnetic'

const channels = [
  { label: 'Email', value: site.email, href: `mailto:${site.email}`, external: false },
  { label: 'LinkedIn', value: 'in/surjya-sarathi-rout', href: site.linkedin, external: true },
  { label: 'GitHub', value: 'github.com/Surjya123', href: site.github, external: true },
]

export function Contact() {
  const [copied, setCopied] = useState(false)
  const reduced = useReducedMotion()

  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const orbX = useSpring(mx, { stiffness: 60, damping: 20 })
  const orbY = useSpring(my, { stiffness: 60, damping: 20 })

  const handleMouseMove = (e: React.MouseEvent) => {
    if (reduced) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left - rect.width / 2
    const y = e.clientY - rect.top - rect.height / 2
    mx.set(x * 0.08)
    my.set(y * 0.08)
  }

  const copyEmail = () => {
    navigator.clipboard.writeText(site.email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2400)
  }

  return (
    <section
      id="contact"
      onMouseMove={handleMouseMove}
      className="relative overflow-hidden"
      aria-labelledby="contact-heading"
    >
      {/* Interactive ambient orb */}
      <motion.div
        aria-hidden
        style={{ x: reduced ? 0 : orbX, y: reduced ? 0 : orbY }}
        className="pointer-events-none absolute inset-0"
      >
        <div className="absolute left-1/2 top-[55%] size-[70vw] max-w-[900px] -translate-x-1/2 -translate-y-1/2 animate-orb rounded-full bg-[radial-gradient(circle_at_center,rgba(255,90,31,0.28)_0%,rgba(255,90,31,0.08)_35%,transparent_65%)] blur-2xl" />
        <div className="absolute left-1/2 top-[55%] size-[26vw] max-w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-orange/20" />
        <div className="absolute left-1/2 top-[55%] size-[40vw] max-w-[560px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-ivory/[0.05]" />
      </motion.div>

      <div className="relative mx-auto max-w-[1600px] px-6 py-28 md:px-10 md:py-40">
        <SectionHeader index="05" label="Contact" right="Initiate Dialogue" />

        <h2 id="contact-heading" className="display mt-14 text-center text-[clamp(3rem,10vw,11rem)] text-ivory">
          <WordReveal as="span" text={'HAVE A PROBLEM?\nLET\u2019S FIND THE SIGNAL.'} highlight={['SIGNAL.']} />
        </h2>

        <FadeUp delay={0.2} className="mt-12 flex flex-col items-center gap-4">
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Magnetic>
              <motion.a
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                href={`mailto:${site.email}`}
                className="group relative flex items-center gap-3 overflow-hidden bg-ivory px-8 py-5 font-display text-xs font-medium uppercase tracking-[0.2em] text-obsidian shadow-[0_0_20px_rgba(255,255,255,0.1)] transition-shadow hover:shadow-[0_0_30px_rgba(255,90,31,0.4)]"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-orange transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-x-100" />
                <Mail className="relative size-4" />
                <span className="relative font-semibold">Start a conversation</span>
              </motion.a>
            </Magnetic>

            {/* Quick Copy Email Button with Animated Tooltip */}
            <Magnetic strength={0.2}>
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                onClick={copyEmail}
                className="group relative flex items-center gap-2 border border-ivory/15 bg-obsidian/70 px-6 py-5 font-display text-xs font-medium uppercase tracking-[0.2em] text-ivory backdrop-blur-md transition-all hover:border-orange hover:text-orange"
              >
                {copied ? (
                  <Check className="size-4 text-orange" />
                ) : (
                  <Copy className="size-4 text-silver group-hover:text-orange transition-colors" />
                )}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Email'}</span>
              </motion.button>
            </Magnetic>
          </div>

          <Magnetic strength={0.15}>
            <motion.a
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              href={site.resume}
              download
              className="group mt-2 flex items-center gap-2 border border-ivory/10 px-5 py-2.5 font-display text-[11px] uppercase tracking-[0.2em] text-silver transition-colors hover:border-orange hover:text-orange"
            >
              <Download className="size-3.5" />
              Download resume
            </motion.a>
          </Magnetic>
        </FadeUp>

        <FadeUp delay={0.3} className="mt-20">
          <ul className="grid divide-y divide-border border-y border-border md:grid-cols-3 md:divide-x md:divide-y-0">
            {channels.map((c) => (
              <li key={c.label}>
                <motion.a
                  whileHover={{ y: -3 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 25 }}
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
                  <motion.div
                    whileHover={{ scale: 1.15, x: 2, y: -2 }}
                    className="flex size-9 items-center justify-center border border-transparent group-hover:border-orange/30 group-hover:bg-orange/10 transition-colors"
                  >
                    <ArrowUpRight className="size-5 text-silver transition-all duration-300 group-hover:text-orange" />
                  </motion.div>
                </motion.a>
              </li>
            ))}
          </ul>
        </FadeUp>
      </div>
    </section>
  )
}
