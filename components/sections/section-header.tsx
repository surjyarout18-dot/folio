import { FadeUp } from '@/components/reveal'

export function SectionHeader({ index, label, right }: { index: string; label: string; right?: string }) {
  return (
    <FadeUp>
      <div className="flex items-center justify-between gap-6 border-t border-border pt-5">
        <div className="flex items-center gap-4">
          <span className="font-display text-xs text-orange">{index}</span>
          <span className="eyebrow">{label}</span>
        </div>
        {right && <span className="eyebrow hidden md:block">{right}</span>}
      </div>
    </FadeUp>
  )
}
