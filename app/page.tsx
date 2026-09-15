"use client"

import { useCallback, useEffect, useState } from "react"
import { MatrixBackground } from "@/components/matrix-background"
import { Sidebar } from "@/components/sidebar"
import { TopBar } from "@/components/top-bar"
import { Hero, About } from "@/components/hero"
import { Achievements } from "@/components/achievements"
import { Writeups } from "@/components/writeups"
import { ResearchSection } from "@/components/research-section"
import { WriteupDetail } from "@/components/writeup-detail"

const sectionIds = ["home", "achievements", "writeups", "research", "about"]

export default function Page() {
  const [openSlug, setOpenSlug] = useState<string | null>(null)
  const [active, setActive] = useState("home")
  const [query, setQuery] = useState("")

  // Scroll-spy for the sidebar on the home view.
  useEffect(() => {
    if (openSlug) return
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActive(entry.target.id)
        })
      },
      { rootMargin: "-30% 0px -60% 0px" },
    )
    sectionIds.forEach((id) => {
      const el = document.getElementById(id)
      if (el) observer.observe(el)
    })
    return () => observer.disconnect()
  }, [openSlug])

  // Focus search with "/"
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "/" && !(e.target as HTMLElement)?.closest("input,textarea")) {
        e.preventDefault()
        const input = document.querySelector<HTMLInputElement>('input[type="search"]')
        input?.focus()
      }
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [])

  const navigate = useCallback((id: string) => {
    setActive(id)
    if (id === "writeups" || id === "home") {
      setOpenSlug(null)
    }
    // wait a tick so the home view is mounted before scrolling
    requestAnimationFrame(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" })
    })
  }, [])

  const openWriteup = useCallback((slug: string) => {
    setOpenSlug(slug)
    window.scrollTo({ top: 0 })
  }, [])

  const closeWriteup = useCallback(() => {
    setOpenSlug(null)
    setActive("writeups")
    requestAnimationFrame(() => {
      document.getElementById("writeups")?.scrollIntoView({ block: "start" })
    })
  }, [])

  return (
    <div className="min-h-screen">
      <MatrixBackground />
      <Sidebar active={active} onNavigate={navigate} />

      <div className="lg:pl-72">
        <TopBar query={query} onQuery={setQuery} />

        <main className="mx-auto max-w-6xl px-4 pb-20 md:px-8">
          {openSlug ? (
            <WriteupDetail slug={openSlug} onBack={closeWriteup} />
          ) : (
            <div className="space-y-16">
              <Hero />
              <Achievements />
              <Writeups onOpen={openWriteup} query={query} />
              <ResearchSection />
              <About />
              <footer className="border-t border-border pt-6 text-center font-mono text-xs text-muted-foreground/60">
                <p>{"// built in the dark · Li9Ht7 · 2026"}</p>
              </footer>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
