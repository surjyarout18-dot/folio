'use client'

import { ArrowUp } from 'lucide-react'
import { site } from '@/lib/data'
import { useSmoothScroll } from '@/components/providers/smooth-scroll'

export function Footer() {
  const { scrollTo } = useSmoothScroll()
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-[1600px] flex-col gap-6 px-6 py-8 md:flex-row md:items-center md:justify-between md:px-10">
        <div className="flex items-center gap-3">
          <span className="relative flex size-7 items-center justify-center border border-ivory/20">
            <span className="font-display text-[10px] font-medium tracking-[0.1em] text-ivory">SR</span>
            <span className="absolute -right-px -top-px size-1.5 bg-orange" />
          </span>
          <span className="eyebrow">
            &copy; {new Date().getFullYear()} {site.name}
          </span>
        </div>
        <p className="eyebrow">Designed &amp; engineered with intent</p>
        <button
          onClick={() => scrollTo(0)}
          className="group flex items-center gap-2 self-start font-display text-[11px] uppercase tracking-[0.2em] text-silver transition-colors hover:text-orange md:self-auto"
        >
          Back to top
          <ArrowUp className="size-3.5 transition-transform duration-500 group-hover:-translate-y-1" />
        </button>
      </div>
    </footer>
  )
}
