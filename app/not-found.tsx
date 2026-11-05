import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowLeft, Compass } from 'lucide-react'

export const metadata: Metadata = {
  title: '404 — Page Not Found',
  description: "The page you're looking for doesn't exist or has moved.",
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-20 text-center overflow-hidden">
      {/* Background ambient blur */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[360px] w-[360px] rounded-full bg-orange/10 blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-4 inline-flex items-center gap-2 border border-orange/30 bg-orange/10 px-3.5 py-1 text-xs text-orange">
          <Compass className="size-3.5 text-orange" />
          <span className="font-display tracking-[0.2em] uppercase text-[11px] font-medium">
            404 &bull; Missing Route
          </span>
        </div>

        <h1 className="display mt-2 text-[clamp(3.2rem,11vw,9rem)] text-ivory font-bold">
          NO <span className="text-orange">SIGNAL.</span>
        </h1>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-silver md:text-base">
          The requested coordinate does not exist or has been relocated. Return to safe ground.
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
            href="/#work"
            className="border border-ivory/20 px-6 py-3.5 font-display text-xs uppercase tracking-[0.2em] text-ivory transition-all hover:border-orange hover:text-orange"
          >
            Explore Projects
          </Link>
        </div>
      </div>
    </main>
  )
}
