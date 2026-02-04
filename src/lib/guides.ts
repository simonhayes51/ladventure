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

async function readGuidesFromS3(): Promise<Guide[] | null> {
  const bucket = process.env.S3_BUCKET
  const region = process.env.S3_REGION
  const key = process.env.GUIDES_S3_KEY

  if (!bucket || !region || !key) return null

  const host = `${bucket}.s3.${region}.amazonaws.com`
  const url = `https://${host}/${key}`

  const res = await fetch(url, { method: "GET", cache: "no-store" })

  // If the file doesn't exist yet, treat as empty list
  if (res.status === 404) return []

  if (!res.ok) {
    console.log("[GUIDES] S3 public read failed", res.status)
    return null
  }

  const text = await res.text()
  try {
    return JSON.parse(text) as Guide[]
  } catch (e) {
    console.log("[GUIDES] S3 JSON parse failed")
    return null
  }
}

export async function getGuides(): Promise<Guide[]> {
  noStore()

  // 1) S3 (production source of truth)
  const fromS3 = await readGuidesFromS3()
  if (fromS3 !== null) return fromS3

  // 2) Local file (dev fallback)
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
