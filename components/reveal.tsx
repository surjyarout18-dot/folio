'use client'

import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { cn } from '@/lib/utils'

const ease = [0.22, 1, 0.36, 1] as const

type CharRevealProps = {
  text: string
  className?: string
  delay?: number
  stagger?: number
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  active?: boolean
  highlight?: string
}

/** Reveals text character by character, line by line, masked from below. */
export function CharReveal({
  text,
  className,
  delay = 0,
  stagger = 0.015,
  as: Tag = 'span',
  active = true,
  highlight,
}: CharRevealProps) {
  const reduced = useReducedMotion()
  const lines = text.split('\n')
  let index = 0

  return (
    <Tag className={cn('block', className)} aria-label={text.replace('\n', ' ')}>
      {lines.map((line, li) => (
        <span key={li} className="block overflow-hidden pb-[0.08em] -mb-[0.08em]">
          {line.split('').map((char, ci) => {
            const i = index++
            const isHighlighted =
              highlight &&
              line.includes(highlight) &&
              ci >= line.indexOf(highlight) &&
              ci < line.indexOf(highlight) + highlight.length
            return (
              <motion.span
                key={`${li}-${ci}`}
                aria-hidden
                className={cn('inline-block will-change-transform', isHighlighted && 'text-orange')}
                initial={reduced ? false : { y: '110%', rotate: 3, opacity: 0 }}
                animate={active ? { y: 0, rotate: 0, opacity: 1 } : undefined}
                transition={{ duration: 0.55, ease, delay: delay + i * stagger }}
              >
                {char === ' ' ? '\u00A0' : char}
              </motion.span>
            )
          })}
        </span>
      ))}
    </Tag>
  )
}

type WordRevealProps = {
  text: string
  className?: string
  delay?: number
  once?: boolean
  as?: 'h1' | 'h2' | 'h3' | 'p' | 'span'
  highlight?: string[]
}

/** Scroll-triggered word reveal, masked from below. */
export function WordReveal({
  text,
  className,
  delay = 0,
  once = true,
  as: Tag = 'p',
  highlight = [],
}: WordRevealProps) {
  const reduced = useReducedMotion()
  const lines = text.split('\n')
  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: 0.025, delayChildren: delay } },
  }
  const word: Variants = {
    hidden: reduced ? {} : { y: '110%', opacity: 0 },
    show: { y: 0, opacity: 1, transition: { duration: 0.5, ease } },
  }
  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once, margin: '-8% 0px' }}
    >
      <Tag className={cn('block', className)}>
        {lines.map((line, li) => (
          <span key={li} className="block">
            {line.split(' ').map((w, wi) => (
              <span key={wi} className="inline-block overflow-hidden pb-[0.1em] -mb-[0.1em] align-bottom">
                <motion.span
                  variants={word}
                  className={cn('inline-block', highlight.includes(w.replace(/[^\w]/g, '')) && 'text-orange')}
                >
                  {w}
                </motion.span>
                {wi < line.split(' ').length - 1 && <span>&nbsp;</span>}
              </span>
            ))}
          </span>
        ))}
      </Tag>
    </motion.div>
  )
}

type FadeUpProps = {
  children: React.ReactNode
  className?: string
  delay?: number
  y?: number
  once?: boolean
}

export function FadeUp({ children, className, delay = 0, y = 24, once = true }: FadeUpProps) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, margin: '-8% 0px' }}
      transition={{ duration: 0.55, ease, delay }}
    >
      {children}
    </motion.div>
  )
}

export function ScaleIn({
  children,
  className,
  delay = 0,
}: {
  children: React.ReactNode
  className?: string
  delay?: number
}) {
  const reduced = useReducedMotion()
  return (
    <motion.div
      className={className}
      initial={reduced ? false : { opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, margin: '-8% 0px' }}
      transition={{ duration: 0.5, ease, delay }}
    >
      {children}
    </motion.div>
  )
}
