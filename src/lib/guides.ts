import fs from "node:fs/promises"
import path from "node:path"
import seedGuides from "../../data/guides.json"
import { unstable_noStore as noStore } from "next/cache"

import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3"
import { Readable } from "stream"

/* ---------------- Types ---------------- */

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

/* ---------------- Paths ---------------- */

const dataPath = path.join(process.cwd(), "data", "guides.json")

/* ---------------- S3 Client ---------------- */

const s3 =
  process.env.S3_BUCKET &&
  process.env.S3_REGION &&
  process.env.S3_ACCESS_KEY_ID &&
  process.env.S3_SECRET_ACCESS_KEY
    ? new S3Client({
        region: process.env.S3_REGION,
        credentials: {
          accessKeyId: process.env.S3_ACCESS_KEY_ID,
          secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
      })
    : null

/* ---------------- Helpers ---------------- */

async function streamToString(stream: Readable): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []

    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)))
    stream.on("error", reject)
    stream.on("end", () =>
      resolve(Buffer.concat(chunks).toString("utf-8"))
    )
  })
}

/* ---------------- S3 Read ---------------- */

async function readGuidesFromS3(): Promise<Guide[] | null> {
  if (!s3) return null

  const bucket = process.env.S3_BUCKET
  const key = process.env.GUIDES_S3_KEY

  if (!bucket || !key) {
    console.log("[GUIDES] Missing S3 env vars")
    return null
  }

  try {
    const res = await s3.send(
      new GetObjectCommand({
        Bucket: bucket,
        Key: key,
      })
    )

    if (!res.Body) {
      console.log("[GUIDES] S3 file empty")
      return []
    }

    const text = await streamToString(res.Body as Readable)

    const parsed = JSON.parse(text) as Guide[]

    console.log("[GUIDES] S3 read OK count:", parsed.length)

    return parsed
  } catch (err: any) {
    console.log("[GUIDES] S3 SDK read failed:", err?.name || err)
    return null
  }
}

/* ---------------- Public API ---------------- */

export async function getGuides(): Promise<Guide[]> {
  noStore()

  // 1️⃣ Try S3 first (production source of truth)
  const fromS3 = await readGuidesFromS3()
  if (fromS3) return fromS3

  // 2️⃣ Fallback: local file (dev / backup)
  try {
    const content = await fs.readFile(dataPath, "utf-8")
    const parsed = JSON.parse(content) as Guide[]

    console.log("[GUIDES] Local read OK count:", parsed.length)

    return parsed
  } catch {
    console.log("[GUIDES] Using seed data")

    return seedGuides as Guide[]
  }
}

export async function getGuideBySlug(
  slug: string
): Promise<Guide | undefined> {
  const all = await getGuides()

  const found = all.find((g) => g.slug === slug)

  console.log("[GUIDES] LOOKUP slug:", slug, "found:", !!found)

  return found
}
