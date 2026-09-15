"use client"

import { ArrowUpRight, Clock, FileCode2 } from "lucide-react"
import { writeups, type Writeup } from "@/lib/data"
import { SectionHeading } from "./achievements"

const difficultyStyles: Record<Writeup["difficulty"], string> = {
  Easy: "border-primary/40 text-primary",
  Medium: "border-[oklch(0.8_0.16_75)]/40 text-[oklch(0.8_0.16_75)]",
  Hard: "border-[oklch(0.65_0.2_35)]/40 text-[oklch(0.7_0.2_35)]",
  Insane: "border-destructive/40 text-destructive",
}

export function Writeups({
  onOpen,
  query,
}: {
  onOpen: (slug: string) => void
  query: string
}) {
  const q = query.trim().toLowerCase()
  const filtered = q
    ? writeups.filter(
        (w) =>
          w.title.toLowerCase().includes(q) ||
          w.summary.toLowerCase().includes(q) ||
          w.tags.some((t) => t.toLowerCase().includes(q)) ||
          w.platform.toLowerCase().includes(q),
      )
    : writeups

  return (
    <section id="writeups" className="scroll-mt-24">
      <SectionHeading eyebrow="./writeups" title="CTF Write-ups" icon={FileCode2} />

      {filtered.length === 0 ? (
        <p className="rounded-lg border border-dashed border-border bg-card/40 px-4 py-8 text-center font-mono text-sm text-muted-foreground">
          {`// no write-ups matched "${query}"`}
        </p>
      ) : (
        <div className="grid gap-4 md:grid-cols-2">
          {filtered.map((w) => (
            <button
              key={w.slug}
              onClick={() => onOpen(w.slug)}
              className="group flex flex-col rounded-lg border border-border bg-card/60 p-5 text-left backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card"
            >
              <div className="flex items-center justify-between gap-2">
                <span
                  className={`rounded border px-2 py-0.5 font-mono text-[11px] font-medium ${difficultyStyles[w.difficulty]}`}
                >
                  {w.difficulty}
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">{w.platform}</span>
              </div>

              <h3 className="mt-3 text-base font-semibold leading-snug text-foreground transition-colors group-hover:text-primary">
                {w.title}
              </h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                {w.summary}
              </p>

              <div className="mt-4 flex flex-wrap gap-1.5">
                {w.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded bg-secondary/70 px-2 py-0.5 font-mono text-[11px] text-accent"
                  >
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t border-border pt-3">
                <span className="flex items-center gap-1.5 font-mono text-[11px] text-muted-foreground">
                  <Clock className="h-3.5 w-3.5" /> {w.readTime} &middot; {w.date}
                </span>
                <span className="flex items-center gap-1 font-mono text-[11px] text-primary opacity-0 transition-opacity group-hover:opacity-100">
                  read <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </div>
            </button>
          ))}
        </div>
      )}
    </section>
  )
}
