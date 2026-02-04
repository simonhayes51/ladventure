import fs from "node:fs/promises"
import path from "node:path"
import seedGuides from "../../data/guides.json"
import { unstable_noStore as noStore } from "next/cache"
import { signS3Request } from "@/lib/aws-signature"

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
  const accessKeyId = process.env.S3_ACCESS_KEY_ID
  const secretAccessKey = process.env.S3_SECRET_ACCESS_KEY
  const key = process.env.GUIDES_S3_KEY

  if (!bucket || !region || !accessKeyId || !secretAccessKey || !key) return null

  const host = `${bucket}.s3.${region}.amazonaws.com`
  const s3Path = `/${key}`

  const { headers } = signS3Request({
    method: "GET",
    host,
    path: s3Path,
    region,
    accessKeyId,
    secretAccessKey,
  })

  const res = await fetch(`https://${host}${s3Path}`, { method: "GET", headers })

  if (res.status === 404) return []
  if (!res.ok) {
    console.log("[GUIDES] S3 read failed", res.status)
    return null
  }

  const text = await res.text()
  return JSON.parse(text) as Guide[]
}

export async function getGuides(): Promise<Guide[]> {
  noStore()

  // 1) S3 (production source of truth)
  const fromS3 = await readGuidesFromS3()
  if (fromS3) return fromS3

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
