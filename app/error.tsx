'use client'

import { useEffect } from 'react'
import Link from 'next/link'
import { AlertTriangle, RotateCcw, Home } from 'lucide-react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    // Log unexpected runtime errors
    console.error('Unhandled application error:', error)
  }, [error])

  return (
    <main className="relative flex min-h-[100svh] flex-col items-center justify-center px-6 py-20 text-center overflow-hidden">
      {/* Background ambient glow */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div className="h-[360px] w-[360px] rounded-full bg-orange/10 blur-[100px]" />
      </div>

      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-4 inline-flex items-center gap-2 border border-orange/30 bg-orange/10 px-3.5 py-1 text-xs text-orange">
          <AlertTriangle className="size-3.5 text-orange" />
          <span className="font-display tracking-[0.2em] uppercase text-[11px] font-medium">
            500 &bull; System Anomaly
          </span>
        </div>

        <h1 className="display mt-2 text-[clamp(2.6rem,8.5vw,7.5rem)] text-ivory font-bold">
          UNEXPECTED <span className="text-orange">ERROR.</span>
        </h1>

        <p className="mt-4 max-w-md text-sm leading-relaxed text-silver md:text-base">
          An unexpected interruption occurred while computing this view. You can reload the view or return home.
        </p>

        {error.digest && (
          <p className="mt-2 font-mono text-[10px] tracking-widest uppercase text-silver/60">
            Incident Digest: {error.digest}
          </p>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => reset()}
            className="flex items-center gap-2 bg-orange px-6 py-3.5 font-display text-xs font-semibold uppercase tracking-[0.2em] text-obsidian transition-transform hover:scale-105"
          >
            <RotateCcw className="size-3.5" />
            Try Again
          </button>
          <Link
            href="/"
            className="flex items-center gap-2 border border-ivory/20 px-6 py-3.5 font-display text-xs uppercase tracking-[0.2em] text-ivory transition-all hover:border-orange hover:text-orange"
          >
            <Home className="size-3.5" />
            Back to Home
          </Link>
        </div>
      </div>
    </main>
  )
}

