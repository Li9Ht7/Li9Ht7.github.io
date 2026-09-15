import { ArrowUpRight, Terminal } from "lucide-react"
import { research } from "@/lib/data"
import { SectionHeading } from "./achievements"

export function ResearchSection() {
  return (
    <section id="research" className="scroll-mt-24">
      <SectionHeading eyebrow="./research" title="Research &amp; Labs" icon={Terminal} />

      <div className="rounded-lg border border-border bg-card/50 backdrop-blur-sm">
        <ul className="divide-y divide-border">
          {research.map((r) => (
            <li key={r.slug}>
              <a
                href={`#${r.slug}`}
                className="group flex items-start gap-4 px-5 py-5 transition-colors hover:bg-secondary/40"
              >
                <span className="mt-1 flex-shrink-0 rounded border border-accent/30 bg-accent/10 px-2 py-0.5 font-mono text-[11px] text-accent">
                  {r.category}
                </span>
                <div className="min-w-0 flex-1">
                  <h3 className="flex items-center gap-1.5 text-base font-semibold leading-snug transition-colors group-hover:text-accent">
                    {r.title}
                    <ArrowUpRight className="h-4 w-4 flex-shrink-0 opacity-0 transition-opacity group-hover:opacity-100" />
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {r.summary}
                  </p>
                  <p className="mt-2 font-mono text-[11px] text-muted-foreground/70">
                    {r.date}
                  </p>
                </div>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
