import Link from 'next/link'

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] flex-col items-center justify-center px-6 text-center">
      <span className="eyebrow">404</span>
      <h1 className="display mt-6 text-[clamp(3rem,10vw,9rem)] text-ivory">
        NO <span className="text-orange">SIGNAL.</span>
      </h1>
      <p className="mt-6 max-w-sm text-silver">The page you&apos;re looking for doesn&apos;t exist.</p>
      <Link
        href="/"
        className="mt-10 border border-ivory/20 px-6 py-4 font-display text-xs uppercase tracking-[0.2em] text-ivory transition-colors hover:border-orange hover:text-orange"
      >
        Back home
      </Link>
    </main>
  )
}
