"use client"

import Image from "next/image"
import { useState } from "react"
import {
  Award,
  FileCode2,
  GitBranch,
  Globe,
  Home,
  Menu,
  Terminal,
  User,
  X,
} from "lucide-react"

const nav = [
  { id: "home", label: "Home", icon: Home },
  { id: "achievements", label: "Achievements", icon: Award },
  { id: "writeups", label: "CTF Write-ups", icon: FileCode2 },
  { id: "research", label: "Research", icon: Terminal },
  { id: "about", label: "About", icon: User },
]

export function Sidebar({
  active,
  onNavigate,
}: {
  active: string
  onNavigate: (id: string) => void
}) {
  const [open, setOpen] = useState(false)

  const handle = (id: string) => {
    onNavigate(id)
    setOpen(false)
  }

  return (
    <>
      {/* Mobile top bar */}
      <div className="sticky top-0 z-40 flex items-center justify-between border-b border-sidebar-border bg-sidebar/90 px-4 py-3 backdrop-blur lg:hidden">
        <div className="flex items-center gap-2 font-mono">
          <span className="text-primary">{"//"}</span>
          <span className="font-semibold">Li9Ht7</span>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-md border border-sidebar-border p-2 text-muted-foreground hover:text-primary"
          aria-label={open ? "Close navigation" : "Open navigation"}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open && (
        <div
          className="fixed inset-0 z-40 bg-background/70 backdrop-blur-sm lg:hidden"
          onClick={() => setOpen(false)}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-300 lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Profile */}
        <div className="border-b border-sidebar-border p-6">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute -inset-0.5 rounded-full bg-gradient-to-br from-primary to-accent opacity-70 blur-[3px]" />
              <Image
                src="/avatar.png"
                alt="Li9Ht7 avatar"
                width={64}
                height={64}
                className="relative h-16 w-16 rounded-full border border-sidebar-border object-cover"
              />
              <span className="absolute bottom-0 right-0 h-3.5 w-3.5 rounded-full border-2 border-sidebar bg-primary" />
            </div>
            <div className="min-w-0">
              <h1 className="truncate font-mono text-lg font-bold text-glow">Li9Ht7</h1>
              <p className="font-mono text-xs text-primary">root@ctf:~#</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            Information Security Student &amp; CTF Player. Breaking web apps, then
            writing up how &mdash; step by step.
          </p>
        </div>

        {/* Nav */}
        <nav className="scrollbar-thin flex-1 overflow-y-auto p-4">
          <p className="px-3 pb-2 font-mono text-[10px] uppercase tracking-widest text-muted-foreground/60">
            Navigation
          </p>
          <ul className="space-y-1">
            {nav.map(({ id, label, icon: Icon }) => {
              const isActive = active === id
              return (
                <li key={id}>
                  <button
                    onClick={() => handle(id)}
                    className={`group flex w-full items-center gap-3 rounded-md px-3 py-2.5 text-sm transition-colors ${
                      isActive
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:bg-secondary/60 hover:text-foreground"
                    }`}
                  >
                    <Icon
                      className={`h-4 w-4 ${isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"}`}
                    />
                    <span className="font-mono">{label}</span>
                    {isActive && (
                      <span className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
                    )}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Socials */}
        <div className="border-t border-sidebar-border p-4">
          <div className="flex items-center gap-2">
            <a
              href="https://github.com"
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-md border border-sidebar-border py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-primary/50 hover:text-primary"
            >
              <GitBranch className="h-4 w-4" /> GitHub
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noreferrer"
              className="flex flex-1 items-center justify-center gap-2 rounded-md border border-sidebar-border py-2 font-mono text-xs text-muted-foreground transition-colors hover:border-accent/50 hover:text-accent"
            >
              <Globe className="h-4 w-4" /> LinkedIn
            </a>
          </div>
          <p className="mt-3 text-center font-mono text-[10px] text-muted-foreground/50">
            PGP: 0xA1B2 C3D4 E5F6
          </p>
        </div>
      </aside>
    </>
  )
}
