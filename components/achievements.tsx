import { Award, Medal, Trophy, Zap } from "lucide-react"
import { badges, stats, tracks, type Badge } from "@/lib/data"

const tierStyles: Record<Badge["tier"], string> = {
  Gold: "border-[oklch(0.8_0.16_75)]/40 text-[oklch(0.8_0.16_75)]",
  Silver: "border-foreground/30 text-foreground/80",
  Bronze: "border-[oklch(0.65_0.13_50)]/40 text-[oklch(0.7_0.13_50)]",
  Elite: "border-accent/40 text-accent",
}

const tierIcon: Record<Badge["tier"], typeof Trophy> = {
  Gold: Trophy,
  Silver: Medal,
  Bronze: Medal,
  Elite: Zap,
}

export function Achievements() {
  return (
    <section id="achievements" className="scroll-mt-24">
      <SectionHeading eyebrow="./stats" title="Achievements" icon={Award} />

      {/* Stat grid */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className="rounded-lg border border-border bg-card/60 p-4 backdrop-blur-sm transition-colors hover:border-primary/40"
          >
            <p className="font-mono text-3xl font-bold text-glow">{s.value}</p>
            <p className="mt-1 text-sm font-medium text-foreground/90">{s.label}</p>
            <p className="font-mono text-xs text-muted-foreground">{s.sub}</p>
          </div>
        ))}
      </div>

      <div className="mt-6 grid gap-6 lg:grid-cols-5">
        {/* Platform progress */}
        <div className="lg:col-span-3">
          <div className="rounded-lg border border-border bg-card/60 p-5 backdrop-blur-sm">
            <h3 className="font-mono text-sm font-semibold text-accent cyan-glow">
              Platform Progress
            </h3>
            <div className="mt-4 space-y-5">
              {tracks.map((t) => {
                const pct = Math.round((t.completed / t.total) * 100)
                return (
                  <div key={t.platform}>
                    <div className="flex items-baseline justify-between gap-2">
                      <div className="min-w-0">
                        <p className="truncate text-sm font-medium">{t.platform}</p>
                        <p className="font-mono text-[11px] text-muted-foreground">{t.label}</p>
                      </div>
                      <p className="flex-shrink-0 font-mono text-xs text-muted-foreground">
                        <span className="text-primary">{t.completed}</span>/{t.total}
                      </p>
                    </div>
                    <div className="mt-2 h-2 overflow-hidden rounded-full bg-secondary">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Badges */}
        <div className="lg:col-span-2">
          <div className="h-full rounded-lg border border-border bg-card/60 p-5 backdrop-blur-sm">
            <h3 className="font-mono text-sm font-semibold text-accent cyan-glow">Badges</h3>
            <ul className="mt-4 space-y-3">
              {badges.map((b) => {
                const Icon = tierIcon[b.tier]
                return (
                  <li
                    key={b.name}
                    className={`flex items-center gap-3 rounded-md border bg-background/40 px-3 py-2.5 ${tierStyles[b.tier]}`}
                  >
                    <Icon className="h-5 w-5 flex-shrink-0" />
                    <div className="min-w-0">
                      <p className="truncate text-sm font-medium text-foreground">{b.name}</p>
                      <p className="font-mono text-[11px] text-muted-foreground">{b.detail}</p>
                    </div>
                  </li>
                )
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}

export function SectionHeading({
  eyebrow,
  title,
  icon: Icon,
}: {
  eyebrow: string
  title: string
  icon: typeof Award
}) {
  return (
    <div className="mb-6 flex items-center gap-3">
      <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="font-mono text-xs text-muted-foreground">{eyebrow}</p>
        <h2 className="font-mono text-2xl font-bold tracking-tight">{title}</h2>
      </div>
    </div>
  )
}
