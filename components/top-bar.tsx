"use client"

import { Search, Wifi } from "lucide-react"

export function TopBar({
  query,
  onQuery,
}: {
  query: string
  onQuery: (v: string) => void
}) {
  return (
    <div className="sticky top-0 z-30 -mx-4 mb-8 border-b border-border bg-background/70 px-4 py-3 backdrop-blur-md md:-mx-8 md:px-8">
      <div className="mx-auto flex max-w-6xl items-center gap-4">
        <div className="relative flex-1">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(e) => onQuery(e.target.value)}
            type="search"
            placeholder="grep write-ups, tags, platforms…"
            aria-label="Search write-ups"
            className="w-full rounded-md border border-border bg-card/60 py-2 pl-9 pr-16 font-mono text-sm text-foreground placeholder:text-muted-foreground/70 focus:border-primary/50 focus:outline-none focus:ring-1 focus:ring-primary/40"
          />
          <kbd className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 rounded border border-border bg-secondary px-1.5 py-0.5 font-mono text-[10px] text-muted-foreground">
            /
          </kbd>
        </div>
        <div className="hidden items-center gap-2 font-mono text-xs text-primary sm:flex">
          <Wifi className="h-4 w-4" />
          <span className="cyan-glow text-accent">status:</span>
          <span>online</span>
        </div>
      </div>
    </div>
  )
}
