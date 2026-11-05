import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, ShieldAlert } from 'lucide-react'

export const metadata: Metadata = {
  title: '403 — Access Restricted',
  description: 'You do not have permission to access this resource.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function Forbidden() {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-20 text-center overflow-hidden">
      {/* Background ambient blur */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[360px] w-[360px] rounded-full bg-orange/10 blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-4 inline-flex items-center gap-2 border border-orange/30 bg-orange/10 px-3.5 py-1 text-xs text-orange">
          <ShieldAlert className="size-3.5 text-orange" />
          <span className="font-display tracking-[0.2em] uppercase text-[11px] font-medium">
            403 &bull; Restricted Area
          </span>
        </div>

        <h1 className="display mt-2 text-[clamp(2.8rem,9.5vw,8.5rem)] text-ivory font-bold">
          ACCESS <span className="text-orange">RESTRICTED.</span>
        </h1>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-silver md:text-base">
          You do not have the required permissions to access this clearance level.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/"
            className="flex items-center gap-2 bg-ivory px-6 py-3.5 font-display text-xs font-semibold uppercase tracking-[0.2em] text-obsidian transition-transform hover:scale-105"
          >
            <ArrowLeft className="size-3.5" />
            Back to Home
          </Link>
          <Link
            href="/#contact"
            className="border border-ivory/20 px-6 py-3.5 font-display text-xs uppercase tracking-[0.2em] text-ivory transition-all hover:border-orange hover:text-orange"
          >
            Request Access / Contact
          </Link>
        </div>
      </div>
    </main>
  )
}
