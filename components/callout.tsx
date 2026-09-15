import { AlertTriangle, Info, Lightbulb, ShieldAlert } from "lucide-react"
import type { ReactNode } from "react"

type Variant = "info" | "warning" | "danger" | "tip"

const config: Record<
  Variant,
  { icon: typeof Info; label: string; classes: string; iconColor: string }
> = {
  info: {
    icon: Info,
    label: "Note",
    classes: "border-[oklch(0.72_0.13_230)]/40 bg-[oklch(0.72_0.13_230)]/8",
    iconColor: "text-[oklch(0.72_0.13_230)]",
  },
  warning: {
    icon: AlertTriangle,
    label: "Warning",
    classes: "border-[oklch(0.8_0.16_75)]/40 bg-[oklch(0.8_0.16_75)]/8",
    iconColor: "text-[oklch(0.8_0.16_75)]",
  },
  danger: {
    icon: ShieldAlert,
    label: "Danger",
    classes: "border-destructive/40 bg-destructive/8",
    iconColor: "text-destructive",
  },
  tip: {
    icon: Lightbulb,
    label: "Pro Tip",
    classes: "border-primary/40 bg-primary/8",
    iconColor: "text-primary",
  },
}

export function Callout({
  variant = "info",
  title,
  children,
}: {
  variant?: Variant
  title?: string
  children: ReactNode
}) {
  const { icon: Icon, label, classes, iconColor } = config[variant]
  return (
    <div className={`my-6 flex gap-3 rounded-lg border px-4 py-3.5 ${classes}`}>
      <Icon className={`mt-0.5 h-5 w-5 flex-shrink-0 ${iconColor}`} aria-hidden="true" />
      <div className="min-w-0">
        <p className={`font-mono text-xs font-semibold uppercase tracking-wider ${iconColor}`}>
          {title ?? label}
        </p>
        <div className="mt-1 text-sm leading-relaxed text-foreground/85">{children}</div>
      </div>
    </div>
  )
}
