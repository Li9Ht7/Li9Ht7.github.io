export type Tag = string

export type Writeup = {
  slug: string
  title: string
  summary: string
  difficulty: "Easy" | "Medium" | "Hard" | "Insane"
  date: string
  readTime: string
  platform: string
  tags: Tag[]
}

export const writeups: Writeup[] = [
  {
    slug: "path-traversal-to-rce",
    title: "Path Traversal to RCE via Log Poisoning",
    summary:
      "Chaining a classic directory traversal bug with PHP log poisoning to escalate a read primitive into full remote code execution.",
    difficulty: "Hard",
    date: "2026-08-21",
    readTime: "12 min",
    platform: "HackTheBox",
    tags: ["#Web", "#PathTraversal", "#Exploit", "#RCE"],
  },
  {
    slug: "jwt-none-algorithm",
    title: "Forging Admin Sessions with the JWT 'none' Algorithm",
    summary:
      "How an accepted 'alg: none' header let us mint arbitrary tokens and pivot straight into the admin dashboard.",
    difficulty: "Medium",
    date: "2026-07-30",
    readTime: "8 min",
    platform: "PortSwigger",
    tags: ["#Web", "#JWT", "#Auth", "#Crypto"],
  },
  {
    slug: "blind-sqli-oob",
    title: "Blind SQL Injection via Out-of-Band DNS Exfiltration",
    summary:
      "Extracting the database contents with zero visible output by smuggling data through DNS lookups.",
    difficulty: "Hard",
    date: "2026-07-11",
    readTime: "15 min",
    platform: "PortSwigger",
    tags: ["#Web", "#SQLi", "#OOB", "#Exfil"],
  },
  {
    slug: "prototype-pollution-xss",
    title: "From Prototype Pollution to Client-Side XSS",
    summary:
      "Polluting Object.prototype in a sanitizer config gadget to bypass DOMPurify and land a stored XSS.",
    difficulty: "Insane",
    date: "2026-06-19",
    readTime: "18 min",
    platform: "CTF: b01lers",
    tags: ["#Web", "#PrototypePollution", "#XSS", "#JS"],
  },
  {
    slug: "ssrf-cloud-metadata",
    title: "SSRF to Cloud Takeover via Metadata Endpoint",
    summary:
      "Abusing a PDF-render feature to reach 169.254.169.254 and steal IAM credentials from the metadata service.",
    difficulty: "Medium",
    date: "2026-05-28",
    readTime: "10 min",
    platform: "HackTheBox",
    tags: ["#Web", "#SSRF", "#Cloud", "#IAM"],
  },
  {
    slug: "insecure-deserialization",
    title: "Insecure Deserialization in a Java Gadget Chain",
    summary:
      "Building a ysoserial gadget chain against a vulnerable endpoint to achieve unauthenticated code execution.",
    difficulty: "Insane",
    date: "2026-04-14",
    readTime: "20 min",
    platform: "CTF: DiceCTF",
    tags: ["#Web", "#Deserialization", "#Java", "#RCE"],
  },
]

export type Research = {
  slug: string
  title: string
  category: string
  summary: string
  date: string
}

export const research: Research[] = [
  {
    slug: "http-request-smuggling-notes",
    title: "HTTP Request Smuggling: A Field Guide",
    category: "Protocol",
    summary:
      "Deep-dive lab notes on CL.TE, TE.CL, and TE.TE desync attacks, with detection heuristics and safe testing methodology.",
    date: "2026-08-02",
  },
  {
    slug: "oauth-misconfig-taxonomy",
    title: "A Taxonomy of OAuth 2.0 Misconfigurations",
    category: "Auth",
    summary:
      "Cataloguing redirect_uri validation flaws, state parameter omissions, and token leakage vectors observed across engagements.",
    date: "2026-06-05",
  },
  {
    slug: "cache-deception-lab",
    title: "Web Cache Deception: Lab Reproduction",
    category: "Caching",
    summary:
      "Reproducing cache deception in a controlled lab, mapping which path confusion tricks survive modern CDN normalizers.",
    date: "2026-03-22",
  },
]

export type Achievement = {
  label: string
  value: string
  sub: string
}

export const stats: Achievement[] = [
  { label: "Global CTF Rank", value: "#412", sub: "CTFtime 2026" },
  { label: "Boxes Rooted", value: "137", sub: "HackTheBox" },
  { label: "Write-ups", value: "48", sub: "Published" },
  { label: "CVEs Credited", value: "3", sub: "Disclosed" },
]

export type Badge = {
  name: string
  tier: "Gold" | "Silver" | "Bronze" | "Elite"
  detail: string
}

export const badges: Badge[] = [
  { name: "1st Place — Nightshade CTF", tier: "Gold", detail: "Web category sweep" },
  { name: "Top 5% — b01lers CTF", tier: "Silver", detail: "Team The_Null_Set" },
  { name: "Pwned: Insane Machine", tier: "Elite", detail: "HackTheBox season III" },
  { name: "100 Day Streak", tier: "Bronze", detail: "Daily lab practice" },
]

export type Track = {
  platform: string
  label: string
  completed: number
  total: number
}

export const tracks: Track[] = [
  { platform: "PortSwigger Web Security Academy", label: "All Labs", completed: 218, total: 268 },
  { platform: "PortSwigger — Server-side", label: "Category", completed: 96, total: 96 },
  { platform: "PortSwigger — Client-side", label: "Category", completed: 74, total: 101 },
  { platform: "HackTheBox Academy", label: "Modules", completed: 41, total: 60 },
]
