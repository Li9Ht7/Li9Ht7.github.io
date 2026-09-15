"use client"

import { useEffect, useRef } from "react"

export function MatrixBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches

    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const glyphs = "01アイウエオカキ<>{}[]#$%*+=".split("")
    const fontSize = 14
    let columns = Math.floor(width / fontSize)
    let drops = new Array(columns).fill(0).map(() => Math.random() * -100)

    const resize = () => {
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
      columns = Math.floor(width / fontSize)
      drops = new Array(columns).fill(0).map(() => Math.random() * -100)
    }
    window.addEventListener("resize", resize)

    let frame = 0
    let raf = 0

    const draw = () => {
      // trail fade
      ctx.fillStyle = "rgba(10, 13, 18, 0.08)"
      ctx.fillRect(0, 0, width, height)

      ctx.font = `${fontSize}px "JetBrains Mono", monospace`
      for (let i = 0; i < drops.length; i++) {
        const char = glyphs[Math.floor(Math.random() * glyphs.length)]
        const x = i * fontSize
        const y = drops[i] * fontSize

        const isHead = Math.random() > 0.985
        ctx.fillStyle = isHead ? "rgba(120, 255, 190, 0.9)" : "rgba(0, 200, 120, 0.16)"
        ctx.fillText(char, x, y)

        if (y > height && Math.random() > 0.975) {
          drops[i] = 0
        }
        drops[i] += 0.5
      }
    }

    const loop = () => {
      frame++
      if (frame % 2 === 0) draw()
      raf = requestAnimationFrame(loop)
    }

    if (prefersReduced) {
      // static faint frame only
      ctx.fillStyle = "rgba(10, 13, 18, 1)"
      ctx.fillRect(0, 0, width, height)
    } else {
      loop()
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [])

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10">
      <canvas ref={canvasRef} className="h-full w-full opacity-[0.35]" />
      <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/70 to-background" />
      <div
        className="absolute inset-0 opacity-[0.4]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 0%, oklch(0.86 0.24 145 / 0.08), transparent 40%), radial-gradient(circle at 90% 100%, oklch(0.82 0.15 200 / 0.07), transparent 45%)",
        }}
      />
    </div>
  )
}
