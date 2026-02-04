import { getGuides } from "@/lib/guides"
import { S3Client, GetObjectCommand, PutObjectCommand } from "@aws-sdk/client-s3"
import { Readable } from "stream"

function isAdmin(request: Request) {
  const cookie = request.headers.get("cookie") || ""
  return cookie.includes("admin=1")
}

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

async function streamToString(stream: Readable): Promise<string> {
  return new Promise((resolve, reject) => {
    const chunks: Buffer[] = []
    stream.on("data", (chunk) => chunks.push(Buffer.from(chunk)))
    stream.on("error", reject)
    stream.on("end", () => resolve(Buffer.concat(chunks).toString("utf-8")))
  })
}

async function readGuidesJsonFromS3(): Promise<any[]> {
  if (!s3) throw new Error("S3 not configured")

  const bucket = process.env.S3_BUCKET!
  const key = (process.env.GUIDES_S3_KEY || "content/guides.json").replace(/^\/+/, "")

  try {
    const res = await s3.send(new GetObjectCommand({ Bucket: bucket, Key: key }))
    if (!res.Body) return []
    const text = await streamToString(res.Body as Readable)
    return JSON.parse(text)
  } catch (err: any) {
    // If the object doesn't exist yet, treat it as empty
    if (err?.name === "NoSuchKey") return []
    // Some SDK variants use this code for missing keys:
    if (err?.Code === "NoSuchKey") return []
    throw err
  }
}

async function writeGuidesJsonToS3(guides: any[]): Promise<void> {
  if (!s3) throw new Error("S3 not configured")

  const bucket = process.env.S3_BUCKET!
  const key = (process.env.GUIDES_S3_KEY || "content/guides.json").replace(/^\/+/, "")

  await s3.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: JSON.stringify(guides, null, 2),
      ContentType: "application/json; charset=utf-8",
      CacheControl: "no-store",
    })
  )
}

export async function GET(request: Request) {
  if (!isAdmin(request)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
  }

  try {
    // Always return the same set the site uses (S3 source of truth)
    const guides = await getGuides()
    return new Response(JSON.stringify({ guides }), { status: 200 })
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e?.name || "Failed" }), { status: 500 })
  }
}

export async function POST(request: Request) {
  if (!isAdmin(request)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
  }

  try {
    const payload = await request.json()

    if (!payload?.slug || typeof payload.slug !== "string") {
      return new Response(JSON.stringify({ error: "Missing slug" }), { status: 400 })
    }

    // Read current from S3 (NOT local filesystem)
    const guides = await readGuidesJsonFromS3()

    const idx = guides.findIndex((g: any) => g.slug === payload.slug)
    if (idx >= 0) guides[idx] = { ...guides[idx], ...payload }
    else guides.push(payload)

    await writeGuidesJsonToS3(guides)

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (e: any) {
    return new Response(
      JSON.stringify({ error: e?.name || "Failed", message: e?.message }),
      { status: 500 }
    )
  }
}

export async function DELETE(request: Request) {
  if (!isAdmin(request)) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 })
  }

  const url = new URL(request.url)
  const slug = url.searchParams.get("slug")
  if (!slug) {
    return new Response(JSON.stringify({ error: "Missing slug" }), { status: 400 })
  }

  try {
    const guides = await readGuidesJsonFromS3()
    const filtered = guides.filter((g: any) => g.slug !== slug)

    await writeGuidesJsonToS3(filtered)

    return new Response(JSON.stringify({ ok: true }), { status: 200 })
  } catch (e: any) {
    return new Response(
      JSON.stringify({ error: e?.name || "Failed", message: e?.message }),
      { status: 500 }
    )
  }
}
