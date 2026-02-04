import fs from "node:fs/promises"
import path from "node:path"
import seedGuides from "../../data/guides.json"
import { unstable_noStore as noStore } from "next/cache"

export type Guide = {
  slug: string
  title: string
  excerpt: string
  location: string
  heroImage: string
  heroAlt: string
  summary: string
  highlights: string[]
  itinerary: { title: string; detail: string }[]
  faq: { question: string; answer: string }[]
  gallery?: string[]
}

const dataPath = path.join(process.cwd(), "data", "guides.json")

export async function getGuides(): Promise<Guide[]> {
  noStore()

  try {
    const content = await fs.readFile(dataPath, "utf-8")
    const parsed = JSON.parse(content) as Guide[]

    console.log(
      "[GUIDES] READ OK",
      "count:",
      parsed.length,
      "pid:",
      process.pid,
      "path:",
      dataPath
    )

    return parsed
  } catch (err) {
    console.log(
      "[GUIDES] READ FAILED → using seed data",
      "pid:",
      process.pid,
      "path:",
      dataPath,
      "error:",
      err instanceof Error ? err.message : err
    )

    return seedGuides as Guide[]
  }
}

export async function getGuideBySlug(slug: string): Promise<Guide | undefined> {
  const all = await getGuides()

  console.log("[GUIDES] LOOKUP", "slug:", slug, "found:", !!all.find(g => g.slug === slug))

  return all.find((g) => g.slug === slug)
}
