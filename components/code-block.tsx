"use client"

import { useState } from "react"
import { Check, Copy } from "lucide-react"

type Token = { text: string; cls: string }

// Lightweight, dependency-free syntax highlighter for demo snippets.
function highlight(line: string): Token[] {
  const patterns: { re: RegExp; cls: string }[] = [
    { re: /(#.*|\/\/.*)/, cls: "text-muted-foreground italic" },
    { re: /("[^"]*"|'[^']*'|`[^`]*`)/, cls: "text-[oklch(0.82_0.15_200)]" },
    {
      re: /\b(GET|POST|PUT|DELETE|curl|sudo|cat|import|from|def|return|if|else|for|while|const|let|var|function|await|async|class|new|null|true|false|SELECT|UNION|FROM|WHERE|AND|OR)\b/,
      cls: "text-[oklch(0.86_0.24_145)] font-medium",
    },
    { re: /\b(\d+(?:\.\d+)?)\b/, cls: "text-[oklch(0.8_0.16_75)]" },
    { re: /([{}[\]()<>;=|&+])/, cls: "text-foreground/60" },
  ]

  const tokens: Token[] = []
  let rest = line
  outer: while (rest.length) {
    for (const { re, cls } of patterns) {
      const m = rest.match(re)
      if (m && m.index !== undefined) {
        if (m.index > 0) {
          tokens.push({ text: rest.slice(0, m.index), cls: "text-foreground/85" })
        }
        tokens.push({ text: m[0], cls })
        rest = rest.slice(m.index + m[0].length)
        continue outer
      }
    }
    tokens.push({ text: rest, cls: "text-foreground/85" })
    break
  }
  return tokens
}

export function CodeBlock({
  code,
  language = "bash",
  filename,
}: {
  code: string
  language?: string
  filename?: string
}) {
  const [copied, setCopied] = useState(false)

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    } catch {
      setCopied(false)
    }
  }

  const lines = code.replace(/\n$/, "").split("\n")

  return (
    <div className="my-6 overflow-hidden rounded-lg border border-border bg-[oklch(0.12_0.006_240)] shadow-[0_0_0_1px_oklch(0.86_0.24_145/0.05)]">
      <div className="flex items-center justify-between border-b border-border bg-[oklch(0.15_0.006_240)] px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="flex gap-1.5">
            <span className="h-3 w-3 rounded-full bg-destructive/70" />
            <span className="h-3 w-3 rounded-full bg-[oklch(0.8_0.16_75)]/70" />
            <span className="h-3 w-3 rounded-full bg-primary/70" />
          </span>
          <span className="ml-2 font-mono text-xs text-muted-foreground">
            {filename ?? language}
          </span>
        </div>
        <button
          onClick={copy}
          className="flex items-center gap-1.5 rounded-md border border-border bg-secondary/50 px-2.5 py-1 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
          aria-label="Copy code to clipboard"
        >
          {copied ? (
            <>
              <Check className="h-3.5 w-3.5 text-primary" /> Copied
            </>
          ) : (
            <>
              <Copy className="h-3.5 w-3.5" /> Copy
            </>
          )}
        </button>
      </div>
      <pre className="scrollbar-thin overflow-x-auto p-4 font-mono text-[13px] leading-relaxed">
        <code>
          {lines.map((line, i) => (
            <div key={i} className="flex">
              <span className="mr-4 w-6 flex-shrink-0 select-none text-right text-muted-foreground/40">
                {i + 1}
              </span>
              <span className="flex-1 whitespace-pre">
                {line.length === 0
                  ? "\u00A0"
                  : highlight(line).map((t, j) => (
                      <span key={j} className={t.cls}>
                        {t.text}
                      </span>
                    ))}
              </span>
            </div>
          ))}
        </code>
      </pre>
    </div>
  )
}
