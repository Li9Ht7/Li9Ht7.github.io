import { GitBranch, Globe, Mail, Terminal } from "lucide-react"

export function Hero() {
  return (
    <section id="home" className="scroll-mt-24">
      <div className="relative overflow-hidden rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm md:p-8">
        <div
          className="pointer-events-none absolute inset-0 opacity-20"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.86 0.24 145 / 0.08) 1px, transparent 1px), linear-gradient(90deg, oklch(0.86 0.24 145 / 0.08) 1px, transparent 1px)",
            backgroundSize: "28px 28px",
          }}
          aria-hidden="true"
        />
        <div className="relative">
          <p className="flex items-center gap-2 font-mono text-sm text-primary">
            <Terminal className="h-4 w-4" />
            <span className="text-glow">whoami</span>
          </p>
          <h1 className="mt-4 max-w-2xl text-3xl font-bold leading-tight md:text-4xl">
            I break web applications and{" "}
            <span className="text-primary text-glow">write up exactly how</span> &mdash; step by
            step, for beginners.
          </h1>
          <p className="mt-4 max-w-2xl text-sm leading-relaxed text-muted-foreground md:text-base">
            I&apos;m <span className="font-mono text-accent">Li9Ht7</span>, an information
            security student and competitive CTF player. This is my lab notebook: annotated CTF
            write-ups, vulnerability research, and reproducible lab notes on web exploitation.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href="#writeups"
              className="rounded-md bg-primary px-4 py-2 font-mono text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90"
            >
              ./read-writeups
            </a>
            <a
              href="#achievements"
              className="rounded-md border border-border px-4 py-2 font-mono text-sm text-foreground transition-colors hover:border-accent/50 hover:text-accent"
            >
              view-achievements
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

export function About() {
  return (
    <section id="about" className="scroll-mt-24">
      <div className="rounded-xl border border-border bg-card/50 p-6 backdrop-blur-sm md:p-8">
        <h2 className="font-mono text-2xl font-bold">
          <span className="text-primary">$</span> cat about.md
        </h2>
        <div className="mt-4 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
          <p>
            I focus on the web: authentication logic, injection classes, SSRF, deserialization,
            and the messy chains that connect them. My goal with every write-up is that a reader
            with basic HTTP knowledge can reproduce the finding end to end.
          </p>
          <p>
            When I&apos;m not playing CTFs with{" "}
            <span className="font-mono text-accent">The_Null_Set</span>, I&apos;m grinding
            PortSwigger labs, reading disclosure reports, and building small tools to automate
            the boring parts of recon.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 font-mono text-sm text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          >
            <GitBranch className="h-4 w-4" /> github.com/Li9Ht7
          </a>
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 font-mono text-sm text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
          >
            <Globe className="h-4 w-4" /> in/li9ht7
          </a>
          <a
            href="mailto:hello@li9ht7.dev"
            className="inline-flex items-center gap-2 rounded-md border border-border px-3 py-2 font-mono text-sm text-muted-foreground transition-colors hover:border-foreground/50 hover:text-foreground"
          >
            <Mail className="h-4 w-4" /> hello@li9ht7.dev
          </a>
        </div>
      </div>
    </section>
  )
}
