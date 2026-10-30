'use client'

import { createContext, useContext, useEffect, useRef, useState } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { usePathname } from 'next/navigation'

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger)
}

type ScrollContextValue = {
  scrollTo: (target: string | number | HTMLElement, options?: { offset?: number }) => void
}

const ScrollContext = createContext<ScrollContextValue>({
  scrollTo: () => {},
})

export function useSmoothScroll() {
  return useContext(ScrollContext)
}

export function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null)
  const pathname = usePathname()
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const onChange = () => setReduced(mq.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])

  useEffect(() => {
    if (reduced) return

    const lenis = new Lenis({
      lerp: 0.09,
      wheelMultiplier: 0.9,
      smoothWheel: true,
    })
    lenisRef.current = lenis

    lenis.on('scroll', ScrollTrigger.update)
    const tick = (time: number) => lenis.raf(time * 1000)
    gsap.ticker.add(tick)
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(tick)
      lenis.destroy()
      lenisRef.current = null
    }
  }, [reduced])

  useEffect(() => {
    // Reset position on route change and let ScrollTrigger re-measure the new layout.
    lenisRef.current?.scrollTo(0, { immediate: true })
    const t = setTimeout(() => ScrollTrigger.refresh(), 100)
    return () => clearTimeout(t)
  }, [pathname])

  const scrollTo: ScrollContextValue['scrollTo'] = (target, options) => {
    if (lenisRef.current) {
      lenisRef.current.scrollTo(target, { offset: options?.offset ?? 0, duration: 1.4 })
      return
    }
    const el = typeof target === 'string' ? document.querySelector(target) : target
    if (el instanceof HTMLElement) el.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' })
    else if (typeof target === 'number') window.scrollTo({ top: target })
  }

  return <ScrollContext.Provider value={{ scrollTo }}>{children}</ScrollContext.Provider>
}
