import fs from "node:fs/promises"
import path from "node:path"
import seedGuides from "../../data/guides.json"

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
  try {
    const content = await fs.readFile(dataPath, "utf-8")
    return JSON.parse(content) as Guide[]
  } catch {
    return seedGuides as Guide[]
  }
}

export async function getGuideBySlug(slug: string): Promise<Guide | undefined> {
  const all = await getGuides()
  return all.find((g) => g.slug === slug)
}
