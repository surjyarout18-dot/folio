'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { navLinks, site } from '@/lib/data'
import { useSmoothScroll } from '@/components/providers/smooth-scroll'
import { Magnetic } from '@/components/magnetic'
import { cn } from '@/lib/utils'

export function Nav() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const { scrollTo } = useSmoothScroll()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const goTo = (href: string) => {
    setOpen(false)
    if (pathname === '/') {
      setTimeout(() => scrollTo(href, { offset: 0 }), open ? 500 : 0)
    } else {
      router.push('/' + href)
    }
  }

  return (
    <>
      <motion.header
        className={cn(
          'fixed inset-x-0 top-0 z-[120] transition-colors duration-300',
          scrolled && !open && 'backdrop-blur-md bg-obsidian/60 border-b border-ivory/5'
        )}
        initial={{ y: -40, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] }}
      >
        <nav
          aria-label="Primary"
          className="mx-auto flex max-w-[1600px] items-center justify-between px-6 py-5 md:px-10"
        >
          <Link
            href="/"
            className="group flex items-center gap-3"
            onClick={() => setOpen(false)}
            aria-label="Home"
          >
            <span className="relative flex size-8 items-center justify-center border border-ivory/20">
              <span className="font-display text-[11px] font-medium tracking-[0.1em] text-ivory">
                SR
              </span>
              <span className="absolute -right-px -top-px size-1.5 bg-orange" />
            </span>
            <span className="hidden text-xs tracking-[0.18em] uppercase text-silver sm:block">
              {site.name}
            </span>
          </Link>

          <div className="hidden items-center gap-8 lg:flex">
            {navLinks.map((l, i) => (
              <button
                key={l.href}
                onClick={() => goTo(l.href)}
                className="group relative font-display text-[11px] font-medium uppercase tracking-[0.2em] text-silver transition-colors hover:text-ivory"
              >
                <span className="mr-1.5 text-[9px] text-orange/80">0{i + 1}</span>
                {l.label}
                <span className="absolute -bottom-1 left-0 h-px w-0 bg-orange transition-all duration-500 group-hover:w-full" />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <Magnetic strength={0.25}>
              <button
                onClick={() => goTo('#contact')}
                className="hidden border border-ivory/15 px-4 py-2 font-display text-[11px] font-medium uppercase tracking-[0.2em] text-ivory transition-colors hover:border-orange hover:text-orange md:block"
              >
                Let&apos;s Connect
              </button>
            </Magnetic>
            <Magnetic strength={0.3}>
              <button
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="menu-overlay"
                aria-label={open ? 'Close menu' : 'Open menu'}
                className="relative flex size-11 items-center justify-center"
              >
                <span className="relative block h-3 w-6">
                  <motion.span
                    className="absolute left-0 top-0 h-px w-full bg-ivory"
                    animate={open ? { y: 6, rotate: 45 } : { y: 0, rotate: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <motion.span
                    className="absolute left-0 top-1/2 h-px w-full bg-ivory"
                    animate={open ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                  <motion.span
                    className="absolute bottom-0 left-0 h-px w-full bg-ivory"
                    animate={open ? { y: -6, rotate: -45 } : { y: 0, rotate: 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                  />
                </span>
              </button>
            </Magnetic>
          </div>
        </nav>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-overlay"
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
            className="fixed inset-0 z-[110] flex flex-col bg-obsidian"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
          >
            <div className="mx-auto flex h-full w-full max-w-[1600px] flex-col justify-end px-6 pb-10 pt-28 md:px-10 lg:flex-row lg:items-end lg:justify-between">
              <ul className="flex flex-col gap-1">
                {navLinks.map((l, i) => (
                  <li key={l.href} className="overflow-hidden">
                    <motion.button
                      onClick={() => goTo(l.href)}
                      className="group flex items-baseline gap-4 py-1 text-left"
                      initial={{ y: '110%' }}
                      animate={{ y: 0 }}
                      exit={{ y: '110%' }}
                      transition={{ duration: 0.45, delay: 0.08 + i * 0.04, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span className="font-display text-xs text-orange">0{i + 1}</span>
                      <span className="display text-[clamp(3rem,9vw,8rem)] text-ivory transition-colors duration-300 group-hover:text-orange">
                        {l.label}
                      </span>
                    </motion.button>
                  </li>
                ))}
              </ul>

              <motion.div
                className="mt-12 flex flex-col gap-6 lg:mt-0 lg:items-end"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4, delay: 0.25 }}
              >
                <div className="flex flex-col gap-2 lg:items-end">
                  <span className="eyebrow">Socials</span>
                  {[
                    { label: 'LinkedIn', href: site.linkedin },
                    { label: 'GitHub', href: site.github },
                    { label: 'Email', href: `mailto:${site.email}` },
                  ].map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target={s.href.startsWith('http') ? '_blank' : undefined}
                      rel="noreferrer"
                      className="group flex items-center gap-1 font-display text-sm text-silver transition-colors hover:text-ivory"
                    >
                      {s.label}
                      <ArrowUpRight className="size-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  ))}
                </div>
                <p className="max-w-xs text-xs leading-relaxed text-silver lg:text-right">
                  {site.role}
                  <br />
                  Based in {site.location}. Open to opportunities.
                </p>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
